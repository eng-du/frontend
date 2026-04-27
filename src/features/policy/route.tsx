import { Outlet } from 'react-router';

export const policyRoute = {
  path: 'policy',
  element: <Outlet />,
  children: [
    {
      path: 'terms',
      lazy: async () => {
        const TermsOfService = (await import('./components/TermsOfService')).default;
        return { Component: TermsOfService };
      },
    },
    {
      path: 'privacy',
      lazy: async () => {
        const PrivacyPolicy = (await import('./components/PrivacyPolicy')).default;
        return { Component: PrivacyPolicy };
      },
    },
  ],
};
