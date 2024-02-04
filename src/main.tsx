import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App.tsx';
import './index.css';
import store from './slices/store.ts';
import WrapperTheme from './components/WrapperTheme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WrapperTheme>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </WrapperTheme>,
);
