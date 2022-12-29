import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useGetPuestosQuery } from '../../../features/puesto/puesto-api-slice';

import {
  Empleado, EmpleadoImp,
  useAddEmpleadoMutation
} from '../../../features/employee/employ-api-slice';

import {
  Button, FormControl, InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

function AgregaEmpleado() {

  const navigate = useNavigate();

  const {
    data: datosPuestos = [],
    isFetching: isFetchingPuestos
  } = useGetPuestosQuery();

  const [addEmpleado, { isLoading }] = useAddEmpleadoMutation();

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
      };

      let response = await addEmpleado( ( requestData as { empleado: EmpleadoImp } ) );

      navigate( -1 );

    } catch (e) {
      console.log( e );
    }

  };

  return (
    <>
      <Typography variant = { 'h6' } component = { 'h2' } gutterBottom>
        Agrega empleado
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
            required
          />

          <TextField
            name = { 'direccion' }
            label = { 'Direccion' }
            required
          />

          <TextField
            name = { 'correo' }
            label = { 'Correo' }
            required
          />

          <FormControl>

            <InputLabel id = { 'employee-add-puesto-select-label' }>
              Puesto
            </InputLabel>

            <Select
              labelId = { 'employee-add-puesto-select-label' }
              name = { 'id_puesto' }
              label = { 'Puesto' }
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
            Agregar
          </Button>

        </Stack>

      </form>
    </>
  );
}

export default AgregaEmpleado;