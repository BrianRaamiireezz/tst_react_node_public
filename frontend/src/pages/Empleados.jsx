import React, { useContext, useEffect, useState } from 'react';
import { Link, Switch, useRouteMatch, Route } from 'react-router-dom';

import { AuthContext } from '../utils/context';

import Error from '../pages/Error';
import Cabecera from '../components/cabecera';
import Alta from '../components/pages/empleados/altas';

export default function Empleados() {

  const [puestos, setPuestos] = useState({});

  const { Auth, Token, IdUsuario } = useContext(AuthContext);
  const [auth] = Auth;
  const [token] = Token;
  const [idUsuario] = IdUsuario;

  let { path } = useRouteMatch();

  useEffect(() => {

    async function fetchPuestos() {

      let host = process.env.REACT_APP_API_URL || 'http://localhost:8000';

      try {

        const result = await fetch(`${ host }/api/puesto`);
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
            <Alta puestos = { puestos }/>
          </Route>
          <Route exact path = { `${ path }/bajas` }>
            <h3> Eliminar empleado </h3>
          </Route>
          <Route exact path = { `${ path }/modificaciones` }>
            <h3> Modificar empleado </h3>
          </Route>
        </Switch>
      </>
    );
  }
  else {
    return (<Error/>);
  }

}