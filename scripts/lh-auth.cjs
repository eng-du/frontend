const API_BASE_URL = 'https://api.engdu.shop/api/v1';
const APP_ORIGIN = 'https://engdu.shop/';

/**
 * @param {import('puppeteer').Browser} browser
 * @param {{url?: string}} context
 */
module.exports = async (browser, context) => {
  const page = await browser.newPage();

  try {
    await page.goto(APP_ORIGIN, { waitUntil: 'domcontentloaded' });

    const result = await page.evaluate(async (apiBaseUrl) => {
      try {
        const res = await fetch(`${apiBaseUrl}/auth/fake/signup/oauth`, {
          method: 'GET',
          credentials: 'include',
        });
        return { ok: res.ok, status: res.status };
      } catch (e) {
        return { ok: false, error: String(e) };
      }
    }, API_BASE_URL);

    if (!result.ok) {
      throw new Error(
        `[lh-auth] Fake login failed. status=${result.status ?? 'unknown'} error=${result.error ?? 'none'}`,
      );
    }

    const cookies = await page.cookies('https://api.engdu.shop');
    const hasRefreshToken = cookies.some(
      (c) => c.name === 'refresh-token' && c.domain.includes('api.engdu.shop'),
    );
    if (!hasRefreshToken) {
      throw new Error('[lh-auth] refresh-token cookie not found on api.engdu.shop — auth may have failed silently.');
    }
  } finally {
    await page.close();
  }
};
