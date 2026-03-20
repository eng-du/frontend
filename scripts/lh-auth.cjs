const API_BASE_URL = 'https://api.engdu.shop/api/v1';

/**
 * @param {import('puppeteer').Browser} browser
 * @param {{url?: string}} context
 */
module.exports = async (browser, context) => {
  const page = await browser.newPage();

  try {
    await page.goto('https://engdu.shop/', { waitUntil: 'domcontentloaded' });

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
  } finally {
    await page.close();
  }
};
