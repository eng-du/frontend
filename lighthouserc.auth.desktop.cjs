module.exports = {
  ci: {
    collect: {
      url: ['https://engdu.shop', 'https://engdu.shop/learning/2', 'https://engdu.shop/mypage'],
      puppeteerScript: './scripts/lh-auth.cjs',
      puppeteerLaunchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
      },
    },
  },
};
