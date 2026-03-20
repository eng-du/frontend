module.exports = {
  ci: {
    collect: {
      url: [
        'https://engdu.shop',
        'https://engdu.shop/login',
        'https://engdu.shop/policy/terms',
        'https://engdu.shop/policy/privacy',
      ],
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
