// Core
import React from 'react';
import ReactDOM from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components


// Styles
import './index.css';
import Protected from './features/user/Protected';
import Root from './routes/Root';
import Login from './features/user/Login';

// Routes definition
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root/>,
      children: [
        {
          errorElement: <> <h1>Error</h1></>,
          children: [
            {
              index: true,
              element: <><h2>Main</h2></>
            },
            {
              path: 'login',
              element: <Login/>,
            }
          ],
        }
      ]
    }
  ]
);

ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
  <React.StrictMode>
    <>
      <Provider store = { store }>
        <RouterProvider router = { router }/>
      </Provider>
    </>
  </React.StrictMode>
);

/* TODO: i - routes
*
* */