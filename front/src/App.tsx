import { useLoginQuery } from './features/user/user-api-slice';
import { useGetEmpleadosQuery } from './features/employee/employ-api-slice';

function App() {

  const {
    data: employData,
    isFetching: isFetchingEmploy
  } = useGetEmpleadosQuery();

  const {data, isFetching} = useLoginQuery({
    correo: 'admin@admin',
    password: 'mysql'
  });

  return (
    <>

      <h2>
        {
          isFetching
            ? 'cargando'
            : JSON.stringify(data)
        }
      </h2>

      <br/>

      <h2>
        {
          isFetchingEmploy
            ? 'cargando'
            : JSON.stringify(employData)
        }
      </h2>
    </>
  );
}

export default App;
