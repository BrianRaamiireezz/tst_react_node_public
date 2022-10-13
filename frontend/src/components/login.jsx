import { useContext, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { AuthContext } from '../utils/context';

export default function Login() {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const { Auth, Token, IdUsuario } = useContext(AuthContext);
  const [auth, toggleAuth] = Auth;
  const [token, handlerToken] = Token;
  const [idUsuario, handlerIdUsuario] = IdUsuario;

  const ClicHandler = async () => {

    const host = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const url = `http://localhost:8000/api/user/login`;
    const datos = {
      correo: correo,
      password: password
    };

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(datos)
    });

    if (result.ok) {

      const response = await result.json();

      // Guardar datos autorizacion
      toggleAuth();
      handlerToken(response.token);
      handlerIdUsuario(response.correo);

    }
    else {
      console.log('Error');
    }

  };

  return (
    <>
      <Stack
        spacing = { 2 }
        alignItems = { 'center' }
        justifyContent = { 'center' }
      >
        <h2> Login </h2>

        <TextField
          required
          label = "Correo"
          value = { correo }
          onChange = { (e) => setCorreo(e.target.value) }
        />

        <TextField
          required
          label = "Password"
          type = "password"
          value = { password }
          onChange = { (e) => setPassword(e.target.value) }
        />

        <Button
          variant = "contained"
          onClick = { ClicHandler }
        >
          Login
        </Button>

      </Stack>
    </>
  );
}