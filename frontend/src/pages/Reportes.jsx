import Cabecera from '../components/cabecera';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context';
import Error from './Error';

export default function Reportes() {

  const [puestos, setPuestos] = useState({});
  const [empleados, setEmpleados] = useState({});
  const [sueldos, setSueldos] = useState({});

  const { Auth } = useContext(AuthContext);
  const [auth] = Auth;

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

    async function fetchEmpleados() {

      try {

        const result = await fetch(`http://localhost:8000/api/empleado`);
        const empleados = await result.json();
        setEmpleados(empleados.data);

      } catch (e) {
        console.log(e);
      }

    }

    async function fetchSueldos() {

      try {

        const result = await fetch('http://localhost:8000/api/sueldo');
        const sueldos = await result.json();
        setSueldos(sueldos.data);

      } catch (e) {
        console.log(e);
      }
    }

    fetchSueldos();
    fetchEmpleados();
    fetchPuestos();

  }, []);

  if (auth) {
    return (
      <>
        <Cabecera/>
        <h2> Reportes </h2>
        {
          Object.values(empleados).map(
            (empleado) => (<p>{ empleado.nombre }</p>)
          )
        }
        {
          Object.values(puestos).map(
            (puesto) => (<p>{ puesto.nombre }</p>)
          )
        }
        {
          Object.values(sueldos).map(
            (sueldo) => (<p>{ sueldo.base }</p>)
          )
        }

      </>
    );
  }
  else {
    return (<Error/>);
  }

}