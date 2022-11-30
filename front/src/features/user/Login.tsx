import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Login() {
  return (
    <>
      <h1>Login</h1>
      <Button variant = { 'contained' } endIcon = { <SendIcon/> }>
        Enviar
      </Button>
    </>
  );
}

export default Login;