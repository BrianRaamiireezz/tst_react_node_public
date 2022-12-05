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
import HomePage from './routes/HomePage';
import Dashboard from './features/user/Dashboard';

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
              element: <HomePage/>,
            },
            {
              path: 'dashboard',
              element: <Protected element = { <Dashboard/> }/>,
              children: [
                {
                  errorElement: <> <h2>Error</h2> </>,
                  children: [
                    {
                      index: true,
                      element: <> <h2> Bienvenido a tu dashboard </h2> </>
                    },
                    {
                      path: 'puestos',
                      element: <> <h2> Seccion puestos </h2> </>
                    },
                    {
                      path: 'empleados',
                      element: <> <h2> Seccion empleados </h2> </>
                    },
                    {
                      path: 'nomina',
                      element: <> <h2> Seccion nomina </h2> </>
                    },
                    {
                      path: 'reportes',
                      element: <> <h2> Seccion reportes </h2> </>
                    },
                  ]
                }
              ]
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

/* TODO: i - routes */