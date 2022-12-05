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

/* TODO:  i - navigation */
export default Root;