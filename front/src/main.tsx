// Core
import React from 'react';
import ReactDOM from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import Error from './components/Error';
import Protected from './features/user/Protected';

// Styles
import './index.css';

// Routes
import Root from './routes/Root';
import HomePage from './routes/HomePage';
import Dashboard from './routes/Dashboard';
import Puestos from './routes/Puestos';
import Empleados from './routes/Empleados';
import Nomina from './routes/Nomina';
import Reportes from './routes/Reportes';

// Routes definition
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root/>,
      children: [
        {
          errorElement: <Error/>,
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
                  errorElement: <Error/>,
                  children: [
                    {
                      index: true,
                      element: <> <h3> Bienvenido a tu dashboard </h3></>,
                    },
                    {
                      path: 'puestos',
                      element: <Puestos/>,
                    },
                    {
                      path: 'empleados',
                      element: <Empleados/>,
                    },
                    {
                      path: 'nomina',
                      element: <Nomina/>,
                    },
                    {
                      path: 'reportes',
                      element: <Reportes/>,
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

/* TODO:  */