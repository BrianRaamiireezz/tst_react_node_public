import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../utils/context';
import { Button, MenuItem, Stack, TextField } from '@mui/material';

export default function Alta({ puestos }) {

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');

  const [puesto, setPuesto] = useState('');
  const [puestoNombre, setPuestoNombre] = useState('');
  const [puestoDescripcion, setPuestoDescripcion] = useState('');

  const { Auth, Token, IdUsuario } = useContext(AuthContext);
  const [token] = Token;
  const [idUsuario] = IdUsuario;

  const ClicHandler = async () => {

    const host = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const url = `http://localhost:8000/api/empleado`;
    const autorizacion = `bearer ${ token }`;

    const datos = {
      correo: idUsuario,
      empleado: {
        nombre: nombre,
        direccion: direccion,
        correo: correo
      },
      puesto: {
        id_puesto: puesto
      }
    };

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': autorizacion
      },
      body: JSON.stringify(datos)
    });

    if (result.ok) {
      const response = await result.json();

      console.log(response);

      // Reset campos
      setNombre('');
      setCorreo('');
      setDireccion('');

      // Agregar alert con mensaje
    }
    else {
      console.log('Error');
    }

  };

  const handleSelect = (e) => {
    setPuestoNombre(e.target.value);
    setPuesto(e.target.value);
  };

  return (

    <Stack
      spacing = { 2 }
      alignItems = { 'center' }
      justifyContent = { 'center' }
    >

      <TextField
        required
        label = "Nombre"
        value = { nombre }
        onChange = { (e) => setNombre(e.target.value) }
      />

      <TextField
        required
        label = "Direccion"
        value = { direccion }
        onChange = { (e) => setDireccion(e.target.value) }
      />

      <TextField
        required
        label = "Correo"
        value = { correo }
        onChange = { (e) => setCorreo(e.target.value) }
      />

      <TextField
        required
        select
        label = "Puesto"
        value = { puestoNombre }
        onChange = { (e) => handleSelect(e) }
        helperText = "Selecciona un puesto"
      >
        { puestos.map((puesto) => (
          <MenuItem key = { puesto.id_puesto } value = { puesto.id_puesto }>
            { puesto.nombre }
          </MenuItem>
        )) }
      </TextField>

      <Button
        variant = "contained"
        onClick = { ClicHandler }
      >
        Crear
      </Button>
    </Stack>
  );
}