import EngduLearning from './EngduLeaning';
import { loader } from './loader';

export const engduLearningRoute = {
  path: '/learning/:engduId',
  element: <EngduLearning />,
  loader: loader,
};
