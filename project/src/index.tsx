import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import {fetchProductsAction, fetchPromoAction} from './store/api-actions';

store.dispatch(fetchProductsAction());
store.dispatch(fetchPromoAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>,
);
