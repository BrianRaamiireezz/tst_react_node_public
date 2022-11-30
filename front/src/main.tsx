// Core
import React from 'react';
import ReactDOM from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import App from './App';

// Styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <Provider store = { store }>
        <App/>
      </Provider>
    </>
  </React.StrictMode>
);

/* TODO: i - slice empleado
*        i - slice puesto
*        i - slice sueldo
*        i - slice auth
*        i - routes
*/