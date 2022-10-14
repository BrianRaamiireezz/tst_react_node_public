import React, { useContext } from 'react';
import { AuthContext } from '../utils/context';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';

export default function Cabecera() {

  const { Auth } = useContext(AuthContext);
  const [auth] = Auth;

  const styleCabecera = {
    backgroundColor: '#1975d1',
    color: '#E5E3E4',
    width: '100%',
    textAlign: 'center',
    padding: '15px 0px'
  };

  if (auth) {
    return (
      <>
        <header style = { styleCabecera }>
          <h1> Nomina </h1>
        </header>

        <nav style = { { display: 'flex', gap: 30 } }>
          <ButtonGroup variant = "outlined" aria-label = "outlined button group">
            <Button>
              <Link to = "/">
                Home
              </Link>
            </Button>

            <Button>
              <Link to = "/puestos">
                Puestos
              </Link>
            </Button>

            <Button>
              <Link to = "/empleados">
                Empleados
              </Link>
            </Button>

            <Button>
              <Link to = "/nomina">
                Nomina
              </Link>
            </Button>

            <Button>
              <Link to = "/reportes">
                Reportes
              </Link>
            </Button>
          </ButtonGroup>

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