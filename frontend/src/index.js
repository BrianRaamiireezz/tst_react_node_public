import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';

// Proveedores
import { AuthProvider } from './utils/context';
import { Stack } from '@mui/material';
import Home from './pages/Home';
import Puestos from './pages/Puestos';
import Empleados from './pages/Empleados';
import Nomina from './pages/Nomina';
import Reportes from './pages/Reportes';

// Paginas

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Stack
      justifyContent = { 'center' }
      alignItems = { 'center' }
      spacing = { 5 }
      paddingX = { 10 }
      paddingY = { 5 }
    >
      <Router>
        <AuthProvider>

          <Switch>

            {/*Pagina principal*/ }
            <Route exact path = "/">
              <Home/>
            </Route>

            {/*Pagina puestos*/ }
            <Route path = "/puestos">
              <Puestos/>
            </Route>

            {/*Pagina empleados*/ }
            <Route path = "/empleados">
              <Empleados/>
            </Route>

            {/*Pagina nomina*/ }
            <Route path = "/nomina">
              <Nomina/>
            </Route>

            {/*Pagina reportes*/ }
            <Route path = "/reportes">
              <Reportes/>
            </Route>

            {/*Pagina error*/ }
            <Route>
              <p> Error </p>
            </Route>

          </Switch>

        </AuthProvider>
      </Router>
    </Stack>
  </React.StrictMode>
);
