import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Navigation';
import routes from '../router/index';

const App = () => {
  const pages = useRoutes(routes);

  return (
    <>
      <Navigation />
      {pages}
      <ToastContainer />
    </>
  );
};

export default App;
