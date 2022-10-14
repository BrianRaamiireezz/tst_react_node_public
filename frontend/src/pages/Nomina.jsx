import Cabecera from '../components/cabecera';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context';
import Error from './Error';

export default function Nomina() {

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

  const puestos_formated = Object.values(puestos).map((puesto) => {

    const cantidad = Object.values(empleados).reduce(
      (anterior, empleado) => {

        if (empleado.id_puesto === puesto.id_puesto) {
          anterior = anterior + 1;
        }

        return anterior;

      }, 0
    );

    // Sueldo asociado
    const sueldo_aux = Object.values(sueldos).filter(
      (sueldo) => {
        return (sueldo.id_puesto === puesto.id_puesto);
      }
    );

    // Formatear sueldo
    const sueldo_formated = {
      base: parseFloat(sueldo_aux[0].base),
      gratificacion: parseFloat(sueldo_aux[0].gratificacion),
      despensa: parseFloat(sueldo_aux[0].despensa),
      seguro: parseFloat(sueldo_aux[0].seguro)
    };

    const obj = {
      [puesto.id_puesto]: {
        nombre: puesto.nombre,
        cantidad: cantidad,
        base: sueldo_formated.base,
        gratificacion: sueldo_formated.gratificacion,
        despensa: sueldo_formated.despensa,
        seguro: sueldo_formated.seguro
      }
    };

    return obj[puesto.id_puesto];

  });

  if (auth) {
    return (
      <>
        <Cabecera/>
        <h2> Nomina </h2>
        <h3> Puestos </h3>
        {
          Object.values(puestos_formated).map((puesto, index) => (
            <div key = { `puesto-${ index }` }>

              <h4> { puesto.nombre } - { puesto.cantidad } Empleado(s) </h4>
              <p style = { { textAlign: 'center' } }>
                Percepciones : { (puesto.base + puesto.gratificacion + puesto.despensa) * puesto.cantidad }
              </p>
              <p style = { { textAlign: 'center' } }>
                Deducciones: { (puesto.seguro) * puesto.cantidad }
              </p>
            </div>
          ))
        }
        <h3> Totales </h3>
        <p>
          Percepciones : {
          Object.values(puestos_formated).reduce(
            (anterior, puesto) => {
              anterior += (puesto.base + puesto.gratificacion + puesto.despensa) * puesto.cantidad;
              return anterior;
            }
            , 0
          )
        }
        </p>
        <p>
          Deducciones : {
          Object.values(puestos_formated).reduce(
            (anterior, puesto) => {
              anterior += (puesto.seguro) * puesto.cantidad;
              return anterior;
            }
            , 0
          )
        }
        </p>

      </>
    );
  }
  else {
    return (<Error/>);
  }
}