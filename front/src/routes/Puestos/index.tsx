import {
  Divider,
  Stack,
  Typography
} from '@mui/material';
import { Outlet } from 'react-router-dom';

function Puestos() {

  return (
    <>

      <Typography variant = { 'h6' } component = { 'h2' } gutterBottom>
        Seccion puestos
      </Typography>

      <Divider sx = { { marginBottom: 1 } }/>

      <Stack
        direction = { 'column' }
        spacing = { 2 }
        sx = { {
          paddingY: 2
        } }
      >
        <Outlet/>
      </Stack>

    </>
  );
}

export default Puestos;