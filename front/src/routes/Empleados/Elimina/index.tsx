import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useEmployee } from '../index';
import { useNavigate } from 'react-router-dom';
import { Empleado } from '../../../features/employee/employ-api-slice';

function EliminaEmpleado() {

  const navigate = useNavigate();
  const { selected } = useEmployee();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

  };

  return (
    <>
      <Typography variant = { 'h6' } component = { 'h2' } gutterBottom>
        Eliminar empleado
      </Typography>

      <p>
        { JSON.stringify( selected ) }
      </p>

      <form
        onSubmit = { (event) => handleSubmit( event ) }
      >

        {/* Campos */ }
        <Stack
          direction = { 'column' }
          spacing = { 2 }
          sx = { {
            py: 2
          } }
        >
          
          <TextField
            name = { 'nombre' }
            label = { 'Nombre' }
            defaultValue = { ( selected as Empleado ).nombre }
            required
          />

          <TextField
            name = { 'direccion' }
            label = { 'Direccion' }
            defaultValue = { ( selected as Empleado ).direccion }
            required
          />

          <TextField
            name = { 'correo' }
            label = { 'Correo' }
            defaultValue = { ( selected as Empleado ).correo }
            required
          />

          <TextField
            name = { 'id_puesto' }
            label = { 'Puesto' }
            defaultValue = { ( selected as Empleado ).id_puesto }
            required
          />

        </Stack>

        {/* Acciones */ }
        <Stack
          spacing = { 0 }
          direction = { 'row' }
          justifyContent = { 'space-evenly' }
        >

          <Button
            variant = { 'outlined' }
            type = { 'button' }
            onClick = { () => navigate( -1 ) }
          >
            Cancelar
          </Button>

          <Button
            variant = { 'contained' }
            type = { 'submit' }
          >
            Eliminar
          </Button>

        </Stack>
      </form>

    </>
  );
}

export default EliminaEmpleado;