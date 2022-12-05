import { useAppSelector } from '../app/hooks';

import { Box, Button, Stack } from '@mui/material';
import Login from '../features/user/Login';
import { Link } from 'react-router-dom';

function HomePage() {

  const session = useAppSelector( (state) => state.auth );

  let content;

  if (session.autorizado === true) {
    content =
      <Button
        variant = { 'contained' }
        component = { Link }
        to = { '/dashboard' }
      >
        Ir al Dashboard
      </Button>;
  }
  else {
    content = <Login/>;
  }

  return (
    <>
      <Box
        sx = { {
          height: '100vh',
          display: 'flex',
        } }
      >

        {/* Banner section */ }
        <Box
          sx = { {
            backgroundColor: 'primary.dark',
            flex: '1',
          } }
        >

        </Box>

        {/* Content section */ }
        <Box
          sx = { {
            flex: '2'
          } }
        >
          <Stack
            direction = { 'column' }
            justifyContent = { 'center' }
            alignItems = { 'center' }
            spacing = { 2 }
            sx = { {
              height: '100%',
            } }
          >
            {
              content
            }
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;