/* Core */
import React from 'react';

/* Components */
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';

/* Utils */
import { useNavigate } from 'react-router-dom';

import {
  PuestoImpl, Sueldo,
  useAddPuestoMutation
} from '../../../features/puesto/puesto-api-slice';

function MoneyTextField({ name, label }: { name: string, label: string }) {

  return (
    <TextField
      name = { name }
      label = { label }
      required
      type = { 'number' }
      InputProps = { {
        startAdornment:
          <InputAdornment position = { 'start' }>$</InputAdornment>,
      } }
    />
  );

}

function AgregaPuesto() {

  const navigate = useNavigate();

  const [addPuesto, { isLoading }] = useAddPuestoMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    try {

      /* Convert form data to object */
      let formData = Object.fromEntries( new FormData( ( event.target as HTMLFormElement ) ) );

      /* Reshape data */
      let requestData = {
        puesto: {
          nombre: formData.nombre,
          descripcion: formData.descripcion,
        },
        sueldo: {
          base: formData.base,
          gratificacion: formData.gratificacion,
          despensa: formData.despensa,
        }
      };

      /* Perform request */
      let response = await addPuesto( ( requestData as { puesto: PuestoImpl, sueldo: Sueldo } ) );

      /* Redirect to main subpage */
      navigate( -1 );

    } catch (e) {
      console.log( e );
    }

  };

  return (
    <>

      <Typography variant = { 'h6' } component = { 'h2' } gutterBottom>
        Agregar puesto
      </Typography>

      {/* Seccion formulario */ }
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
            name = { 'descripcion' }
            label = { 'Descripcion' }
            required
            multiline
          />

          <MoneyTextField
            name = { 'base' }
            label = { 'Base' }
          />

          <MoneyTextField
            name = { 'gratificacion' }
            label = { 'Gratificacion' }
          />

          <MoneyTextField
            name = { 'despensa' }
            label = { 'Despensa' }
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
            Agregar
          </Button>

        </Stack>

      </form>

    </>
  );
}

export default AgregaPuesto;