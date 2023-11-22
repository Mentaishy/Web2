import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import AddMoviePage from '../Pages/AddMoviePage';
import ViewMoviePage from '../Pages/ViewMoviePage';
import AboutPage from '../Pages/AboutPage';

const routes = {
  '/': HomePage,
  '/new': NewPage,
  '/movies': ViewMoviePage,
  '/movies/add': AddMoviePage,
  '/about': AboutPage,
};

export default routes;
