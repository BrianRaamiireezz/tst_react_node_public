import React from 'react';

import { useEmployee } from '../index';
import { useNavigate } from 'react-router-dom';

import {
  Empleado, EmpleadoImp,
  useUpdateEmpleadoMutation
} from '../../../features/employee/employ-api-slice';

import { useGetPuestosQuery } from '../../../features/puesto/puesto-api-slice';

import {
  Button, FormControl, InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

function ModificaEmpleado() {

  const navigate = useNavigate();

  const { selected } = useEmployee();

  const {
    data: datosPuestos = [],
    isFetching: isFetchingPuestos
  } = useGetPuestosQuery();

  const [updateEmpleado, { isLoading }] = useUpdateEmpleadoMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    try {

      let formData = Object.fromEntries( new FormData( ( event.target as HTMLFormElement ) ) );

      let requestData = {
        empleado: {
          nombre: formData.nombre,
          direccion: formData.direccion,
          correo: formData.correo,
          id_puesto: parseInt( ( formData.id_puesto as string ), 10 ),
        },
        id: ( selected as Empleado ).id_empleado.toString(),

      };

      let response = await updateEmpleado( ( requestData as { empleado: EmpleadoImp, id: string } ) );

      /* Redirect to main subpage */
      navigate( -1 );

    } catch (e) {
      console.log( e );
    }
  };

  return (
    <>
      <Typography variant = { 'h6' } component = { 'h2' } gutterBottom>
        Modificar empleado
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

          <FormControl>

            <InputLabel id = { 'employee-add-puesto-select-label' }>
              Puesto
            </InputLabel>

            <Select
              name = { 'id_puesto' }
              label = { 'Puesto' }
              defaultValue = { ( selected as Empleado ).id_puesto }
            >
              {
                Object.values( datosPuestos ).map(
                  (puesto) => (
                    <MenuItem
                      value = { puesto.id_puesto }
                      key = { `puesto-id-${ puesto.id_puesto }` }
                    >
                      { puesto.nombre }
                    </MenuItem>
                  )
                )
              }
            </Select>

          </FormControl>

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
            disabled = { isFetchingPuestos }
          >
            Modificar
          </Button>

        </Stack>

      </form>


    </>
  );
}

export default ModificaEmpleado;