import React, { useContext, useEffect, useState } from 'react';
import { Link, Switch, useRouteMatch, Route } from 'react-router-dom';

import { AuthContext } from '../utils/context';

import Error from './Error';
import Cabecera from '../components/cabecera';
import Alta from '../components/pages/empleados/altas';
import Bajas from '../components/pages/empleados/bajas';
import Modificacion from '../components/pages/empleados/modificacion';

export default function Empleados() {

  const [puestos, setPuestos] = useState({});
  const [empleados, setEmpleados] = useState({});
  const [actualizado, setActualizado] = useState(0);

  const { Auth } = useContext(AuthContext);
  const [auth] = Auth;

  let { path } = useRouteMatch();

  const actualiza = () => {
    setActualizado(actualizado + 1);
  };

  useEffect(() => {
    async function fetchEmpleados() {

      try {

        const result = await fetch(`http://localhost:8000/api/empleado`);
        const empleados = await result.json();
        setEmpleados(empleados.data);

      } catch (e) {
        console.log(e);
      }

    }

    fetchEmpleados();

  }, [actualizado]);

  useEffect(() => {

    async function fetchPuestos() {

      try {

        const result = await fetch(`http://localhost:8000/api/puesto`);
        const puestos = await result.json();
        setPuestos(puestos.data);

      } catch (e) {
        console.log(e);
      }

    }

    fetchPuestos();

  }, []);

  if (auth) {

    return (
      <>
        <Cabecera/>
        <h2> Empleados </h2>

        <nav style = { { display: 'flex', gap: 15 } }>
          <Link to = { `${ path }/altas` }>Altas</Link>
          <Link to = { `${ path }/bajas` }>Bajas</Link>
          <Link to = { `${ path }/modificaciones` }>Modificaciones</Link>
        </nav>

        <Switch>
          <Route exact path = { `${ path }/altas` }>
            <Alta puestos = { puestos } actualiza = { actualiza }/>
          </Route>
          <Route exact path = { `${ path }/bajas` }>
            <Bajas puestos = { puestos } empleados = { empleados } actualiza = { actualiza }/>
          </Route>
          <Route exact path = { `${ path }/modificaciones` }>
            <Modificacion puestos = { puestos } empleados = { empleados } actualiza = { actualiza }/>
          </Route>
        </Switch>
      </>
    );
  }
  else {
    return (<Error/>);
  }

}