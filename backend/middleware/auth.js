const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try {

    // Obtener token de cabecera
    const token = req.headers.authorization.split(' ')[1];
    // Decodificar token
    const decodedToken = jwt.verify(token, `${ process.env.TOKEN_SECRET }`);
    // Obtener correo de token
    const correo = decodedToken.correo;

    if (req.body.correo && req.body.correo !== correo) {
      throw 'Invalid user ID';
    }
    else {
      next();
    }

  } catch {
    res.status(401).json({ error: 'Invalid request' });
  }

};