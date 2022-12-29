import React, { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import { Divider, Stack, Typography } from '@mui/material';
import { Empleado } from '../../features/employee/employ-api-slice';

function Empleados() {

  const [selected, setSelected] = useState<Empleado | {}>( {} );

  return (
    <>
      <Stack
        direction = { 'column' }
        spacing = { 1 }
        sx = { {
          height: '100%',
        } }
      >

        <Typography variant = { 'h6' } component = { 'h2' }>
          Seccion empleados
        </Typography>

        <Divider sx = { { marginBottom: 1 } }/>

        <Stack
          direction = { 'column' }
          spacing = { 2 }
          sx = { {
            paddingY: 2,
            flex: '1',
          } }
        >
          <Outlet context = { { selected, setSelected } }/>
        </Stack>

      </Stack>
    </>
  );
}

type ContextType = { selected: Empleado | {}, setSelected: React.Dispatch<React.SetStateAction<{} | Empleado>> }

export function useEmployee() {
  return useOutletContext<ContextType>();
}

export default Empleados;