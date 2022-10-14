import Cabecera from '../components/cabecera';
import { useContext, useState } from 'react';
import { AuthContext } from '../utils/context';
import { Button, FormControl, Input, InputAdornment, InputLabel, Stack, TextField } from '@mui/material';
import Error from './Error';

export default function Puestos() {

  // Estados puesto
  const [descripcion, setDescripcion] = useState('');
  const [nombre, setNombre] = useState('');

  // Estados sueldo
  const [base, setBase] = useState('');
  const [gratificacion, setGratificacion] = useState('');
  const [despensa, setDespensa] = useState('');

  const { Auth, Token, IdUsuario } = useContext(AuthContext);
  const [auth] = Auth;
  const [token] = Token;
  const [idUsuario] = IdUsuario;

  const ClicHandler = async () => {

    const url = `http://localhost:8000/api/puesto`;
    const autorizacion = `bearer ${ token }`;

    const datos = {
      correo: idUsuario,
      puesto: {
        nombre: nombre,
        descripcion: descripcion
      },
      sueldo: {
        base: base,
        gratificacion: gratificacion,
        despensa: despensa
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
      setDescripcion('');
      setBase('');
      setGratificacion('');
      setDespensa('');

      // Agregar alert con mensaje
    }
    else {
      console.log('Error');
    }

  };

  if (auth) {
    return (
      <>
        <Cabecera/>
        <h2> Crear puesto </h2>
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
            label = "Descripción"
            multiline
            maxRows = { 3 }
            value = { descripcion }
            onChange = { (e) => setDescripcion(e.target.value) }
          />
        </Stack>

        <h2> Sueldo</h2>
        <Stack
          spacing = { 2 }
          alignItems = { 'center' }
          justifyContent = { 'center' }
        >
          <FormControl fullWidth sx = { { m: 1 } } variant = "standard">
            <InputLabel htmlFor = "base">Base</InputLabel>

            <Input
              id = "base"
              value = { base }
              onChange = { (e) => setBase(e.target.value) }
              startAdornment = { <InputAdornment position = "start">$</InputAdornment> }
            />
          </FormControl>

          <FormControl fullWidth sx = { { m: 1 } } variant = "standard">
            <InputLabel htmlFor = "gratificacion">Gratificacion</InputLabel>

            <Input
              id = "gratificacion"
              value = { gratificacion }
              onChange = { (e) => setGratificacion(e.target.value) }
              startAdornment = { <InputAdornment position = "start">$</InputAdornment> }
            />
          </FormControl>

          <FormControl fullWidth sx = { { m: 1 } } variant = "standard">
            <InputLabel htmlFor = "despensa">Despensa</InputLabel>

            <Input
              id = "despensa"
              value = { despensa }
              onChange = { (e) => setDespensa(e.target.value) }
              startAdornment = { <InputAdornment position = "start">$</InputAdornment> }
            />
          </FormControl>

          <Button
            variant = "contained"
            onClick = { ClicHandler }
          >
            Crear
          </Button>

        </Stack>

      </>
    );
  }
  else {
    return (<Error/>);
  }

}