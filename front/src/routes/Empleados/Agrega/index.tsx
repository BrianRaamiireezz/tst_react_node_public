import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AgregaEmpleado() {

  const navigate = useNavigate();

  return (
    <>
      <Typography variant = { 'h6' } component = { 'h2' } gutterBottom>
        Agrega empleado
      </Typography>

      <Button onClick = { () => navigate( -1 ) }>
        Cancelar
      </Button>
    </>
  );
}

export default AgregaEmpleado;