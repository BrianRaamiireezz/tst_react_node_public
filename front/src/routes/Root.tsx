import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

function Root() {
  return (
    <>
      <CssBaseline/>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default Root;