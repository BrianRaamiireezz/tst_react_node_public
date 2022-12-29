import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useEmployee } from '../index';
import { useNavigate } from 'react-router-dom';
import {
  Empleado,
  useDeleteEmpleadoMutation
} from '../../../features/employee/employ-api-slice';

function EliminaEmpleado() {

  const navigate = useNavigate();

  const { selected } = useEmployee();

  const [deleteEmpleado, { isLoading }] = useDeleteEmpleadoMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    try {

      let response = await deleteEmpleado( { id: ( selected as Empleado ).id_empleado.toString() } );

      navigate( -1 );

    } catch (e) {
      console.log( e );
    }

  };

  return (
    <>
      <Typography variant = { 'h6' } component = { 'h2' } gutterBottom>
        El empleado con los siguientes datos será eliminado:
      </Typography>

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
            InputProps = { {
              readOnly: true,
            } }
          />

          <TextField
            name = { 'direccion' }
            label = { 'Direccion' }
            defaultValue = { ( selected as Empleado ).direccion }
            InputProps = { {
              readOnly: true,
            } }
          />

          <TextField
            name = { 'correo' }
            label = { 'Correo' }
            defaultValue = { ( selected as Empleado ).correo }
            InputProps = { {
              readOnly: true,
            } }
          />

          <TextField
            name = { 'id_puesto' }
            label = { 'Puesto' }
            defaultValue = { ( selected as Empleado ).id_puesto }
            InputProps = { {
              readOnly: true,
            } }
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