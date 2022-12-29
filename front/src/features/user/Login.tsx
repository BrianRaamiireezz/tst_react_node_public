import React, { useState } from 'react';

// Utils
import { useLoginMutation } from './user-api-slice';
import { useNavigate } from 'react-router-dom';

// Components
import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Login() {

  // Query
  const [login, { isLoading }] = useLoginMutation();

  // Navigator
  const navigate = useNavigate();

  // Inputs state
  const [correo, setCorreo] = useState( '' );
  const [password, setPassword] = useState( '' );

  // Feedback state
  const [open, setOpen] = useState( false );

  // Input change handler
  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    stateAction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    stateAction( event.target.value );
  };

  // Form submission handler
  const handleSend = async () => {

    try {

      await login( { correo, password } ).unwrap();
      navigate( '/dashboard' );

    } catch (e) {
      setOpen( true );
    }

  };

  // Alert close handler
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {

    if (reason !== 'clickaway') {
      setOpen( false );
    }

  };

  return (
    <>
      <Typography
        variant = { 'h4' }
        component = { 'h2' }
      >
        Login
      </Typography>

      <TextField
        required
        disabled = { isLoading }
        label = { 'Correo' }
        name = { 'correo' }
        value = { correo }
        onChange = { (e) => handleInput( e, setCorreo ) }
      />

      <TextField
        required
        disabled = { isLoading }
        label = { 'Password' }
        type = { 'password' }
        name = { 'password' }
        value = { password }
        onChange = { (e) => handleInput( e, setPassword ) }
      />

      <Button
        disabled = { isLoading }
        variant = { 'contained' }
        endIcon = { <SendIcon/> }
        onClick = { handleSend }
      >
        Enviar
      </Button>

      {/* Feedback alert */ }
      <Snackbar
        anchorOrigin = { { vertical: 'bottom', horizontal: 'right' } }
        open = { open }
        autoHideDuration = { 3000 }
        onClose = { handleClose }
      >
        <Alert
          onClose = { handleClose }
          severity = { 'error' }
          sx = { { width: '100%' } }
        >
          Error: Correo o contraseña no validos
        </Alert>
      </Snackbar>

    </>
  );
}

/* TODO: Update response Login endpoint */

export default Login;