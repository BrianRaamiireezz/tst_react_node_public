import { useContext } from 'react';
import { AuthContext } from '../utils/context';
import Login from '../components/login';
import Cabecera from '../components/cabecera';

export default function Home() {

  const { Auth, IdUsuario } = useContext(AuthContext);
  const [auth] = Auth;
  const [idUsuario] = IdUsuario;

  if (auth) {
    return (
      <>
        <Cabecera/>
        <h2> Dashboard </h2>
        <p> Bienvenido { idUsuario }</p>
      </>
    );
  }
  else {

    return (
      <Login/>
    );

  }
}