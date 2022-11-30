import { useLoginMutation } from './features/user/user-api-slice';

import {
  employApiSlice,
  useGetEmpleadosQuery,
  useUpdateEmpleadoMutation
} from './features/employee/employ-api-slice';

import { useAppSelector } from './app/hooks';


function App() {
  return (
    <>
      <h1>APP</h1>
    </>
  );
}


function OldApp() {
  const session = useAppSelector((state) => state.auth);
  const [updateEmploy, { isLoading }] = useUpdateEmpleadoMutation();

  interface upType {
    'empleado': {
      'nombre': string,
      'direccion': string,
      'correo': string,
      'id_puesto': number,
    },
    'auth': string,
    'id': string,
  }

  const params = {
    empleado: {
      nombre: 'NuevoNombreWn',
      direccion: 'misma',
      correo: 'mismo',
      id_puesto: 2,
    },
    auth: 'admin@admin',
    id: '8'
  };

  const {
    data: employData,
    isFetching: isFetchingEmploy
  } = useGetEmpleadosQuery();

  async function actualiza(params: upType) {
    try {
      const result = await updateEmploy(params).unwrap();

      console.log(result);

    } catch (e) {

      console.log('Error update');

    }
  }

  return (
    <>

      <h2>
        {
          isFetchingEmploy
            ? 'cargando'
            : JSON.stringify(employData)
        }
      </h2>

      <br/>

      <h2>
        {
          session.correo ? session.correo : 'Cargando correo'
        }
      </h2>

      <h2>
        {
          session.token ? session.token : 'Cargando token'
        }
      </h2>

      <h2>
        Autorizado: { session.autorizado ? 'si' : 'no' }
      </h2>

      <button
        onClick = { async () => actualiza(params) }
      >
        Press { isLoading ? 'Cargando' : '' }
      </button>
    </>
  );
}


export default App;
