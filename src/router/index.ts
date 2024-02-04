import MainPage from '../components/Pages/MainPage';
import FavoritePage from '../components/Pages/FavoritePage';
import NotFound from '../components/Pages/NotFound';
import paths from './paths';

const routes = [
  {
    path: paths.mainPath(),
    Component: MainPage,
  },
  {
    path: paths.favoritesPath(),
    Component: FavoritePage,
  },
  {
    path: paths.notFoundPath(),
    Component: NotFound,
  },
];

export default routes;
