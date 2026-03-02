import { Outlet } from 'react-router';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';

export const policyRoute = {
  path: 'policy',
  element: <Outlet />,
  children: [
    {
      path: 'terms',
      element: <TermsOfService />,
    },
    {
      path: 'privacy',
      element: <PrivacyPolicy />,
    },
  ],
};
