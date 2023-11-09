import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import AddMoviePage from '../Pages/AddMoviePage';
import ViewMoviePage from '../Pages/ViewMoviePage';

const routes = {
  '/': HomePage,
  '/new': NewPage,
  '/movies': ViewMoviePage,
  '/movies/add': AddMoviePage,
};

export default routes;
