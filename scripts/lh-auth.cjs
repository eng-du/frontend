const API_BASE_URL = 'https://api.engdu.shop/api/v1';
const APP_ORIGIN = 'https://engdu.shop/';

/**
 * @param {import('puppeteer').Browser} browser
 * @param {{url?: string}} context
 */
module.exports = async (browser, context) => {
  const page = await browser.newPage();

  try {
    await page.goto(APP_ORIGIN, {
      waitUntil: 'networkidle2',
    });

    const result = await page.evaluate(async (apiBaseUrl) => {
      try {
        const res = await fetch(`${apiBaseUrl}/auth/fake/signup/oauth`, {
          method: 'GET',
          credentials: 'include',
        });

        return {
          ok: res.ok,
          status: res.status,
        };
      } catch (e) {
        return {
          ok: false,
          error: String(e),
        };
      }
    }, API_BASE_URL);

    if (!result.ok) {
      throw new Error(
        `[lh-auth] Fake login failed. status=${
          result.status ?? 'unknown'
        } error=${result.error ?? 'none'}`,
      );
    }

    const client = await page.target().createCDPSession();

    const { cookies } = await client.send('Network.getAllCookies');

    const hasRefreshToken = cookies.some(
      (c) => c.name === 'refresh-token' && c.domain.includes('api.engdu.shop'),
    );

    if (!hasRefreshToken) {
      throw new Error('[lh-auth] refresh-token cookie not found on api.engdu.shop');
    }

    await page.reload({
      waitUntil: 'networkidle2',
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const currentUrl = page.url();

    if (currentUrl.includes('/login')) {
      throw new Error('[lh-auth] redirected to login after auth — accessToken not ready');
    }
  } finally {
    await page.close();
  }
};
