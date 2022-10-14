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

        const result = await fetch('http://localhost:8000/api/puesto');
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

    fetchPuestos();
    fetchSueldos();
    fetchEmpleados();

  }, []);

  const empleado_format = Object.values(empleados).map((empleado) => {

    const sueldo_aux = Object.values(sueldos).filter(
      (sueldo) => {
        return (sueldo.id_puesto === empleado.id_puesto);
      }
    );

    const puesto_aux = Object.values(puestos).filter(
      (puesto) => {
        return (puesto['id_puesto'] === empleado.id_puesto);
      }
    );

    const puesto_format = puesto_aux[0];

    const percepciones =
      parseFloat(sueldo_aux[0].base) +
      parseFloat(sueldo_aux[0].gratificacion) +
      parseFloat(sueldo_aux[0].despensa);

    const deducciones = parseFloat(sueldo_aux[0].seguro);

    const sueldo_bruto = percepciones + deducciones;
    const sueldo_neto = percepciones - deducciones;

    const obj = {
      nombre: empleado.nombre,
      direccion: empleado.direccion,
      correo: empleado.correo,
      puesto: puesto_format.nombre,
      sueldo_bruto: sueldo_bruto,
      sueldo_neto: sueldo_neto
    };

    return obj;

  });

  // generatePDF(empleado_format);

  if (auth) {
    return (
      <>
        <Cabecera/>
        <h2> Reporte </h2>
        {
          Object.values(empleado_format).map(
            (empleado) => (
              <div style = { { display: 'flex', gap: 5 } }>
                <p>
                  { empleado.nombre }
                </p>
                <p>
                  { empleado.direccion }
                </p>
                <p>
                  { empleado.correo }
                </p>
                <p>
                  { empleado.puesto }
                </p>
                <p>
                  { empleado.sueldo_bruto }
                </p>
                <p>
                  { empleado.sueldo_neto }
                </p>
              </div>
            )
          )
        }
      </>
    );
  }
  else {
    return (<Error/>);
  }

}