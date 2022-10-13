import React, { useContext } from 'react';
import { AuthContext } from '../utils/context';
import { Link } from 'react-router-dom';

export default function Cabecera() {

  const { Auth } = useContext(AuthContext);
  const [auth] = Auth;

  if (auth) {
    return (
      <>
        <header>
          <h1> Nomina </h1>
        </header>

        <nav style = { { display: 'flex', gap: 15 } }>
          <Link to = "/">Home</Link>
          <Link to = "/puestos">Puestos</Link>
          <Link to = "/empleados">Empleados</Link>
          <Link to = "/nomina">Nomina</Link>
          <Link to = "/reportes">Reportes</Link>
        </nav>

      </>
    );
  }
  else {
    return (
      <>
        <h2>
          <Link to = "/">Home</Link>
        </h2>
      </>
    );
  }
}