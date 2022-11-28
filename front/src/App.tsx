import { useLoginQuery } from './features/user-api-slice';

function App() {

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
    </>
  );
}

export default App;
