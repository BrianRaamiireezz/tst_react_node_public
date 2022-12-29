// Utils
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

// Components
import { Container, Typography } from '@mui/material';

function Error() {

  // Get error data
  const error = useRouteError();

  let content;

  if (isRouteErrorResponse( error )) {

    content = <>
      <Typography
        variant = { 'h6' }
        component = { 'h3' }
        gutterBottom
      >
        { error.status }
      </Typography>

      <Typography variant = { 'body1' } gutterBottom>
        { error.statusText }
      </Typography>

      {
        error.data?.message &&
        <Typography variant = { 'body1' } gutterBottom>
          { error.data?.message }
        </Typography>
      }
    </>;
    
  }
  else {
    content = <></>;
  }

  return (
    <>

      <Container

        sx = { {
          height: '100vh'
        } }
      >

        <Typography
          variant = { 'h2' }
          component = { 'h2' }
        >
          An error has occurred
        </Typography>

        {
          content
        }

      </Container>

    </>
  );
}

export default Error;