// Core
const http = require('http');
const app = require('./app');

// Util
const dotenv = require('dotenv');
dotenv.config();

function normalizePort(value) {

  let retorno;

  // Convertir valor a entero decimal
  const port = parseInt(value, 10);

  // Si el valor de port no es un numero
  if (isNaN(port)) {
    retorno = value;
  }
  // Si no si el puerto es mayor que 0
  else if (port >= 0) {
    retorno = port;
  }
  // Cualquier otro caso
  else {
    return false;
  }

  return retorno;

}

function getBind() {

  const address = server.address();
  let bind;

  if (typeof address === 'string') {
    bind = 'pipe ' + address;
  }
  else {
    bind = 'port ' + port;
  }

  return bind;

}

function errorhandler(error) {

  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = getBind();

  switch (error.code) {
    case 'EACCES':
      console.error(bind + 'requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }

}

function listenHandler() {
  const bind = getBind();
  console.log('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || 8000);

app.set('port', port);

const server = http.createServer(app);

server.on('error', errorhandler);
server.on('listening', listenHandler);

server.listen(port);