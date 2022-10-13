const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {

  // Crear hash para password
  bcrypt.hash(req.body.password, 10)
    .then(
      (hash) => {

        // Add user to table
        let sql = `INSERT INTO USUARIO(correo, password) VALUES(?)`;
        let valores = [req.body.correo, hash];

        db.query(sql, [valores], function (error) {
          if (error) {
            res.status(400).json({ error: error });
          }
          else {
            res.status(200).json({ message: 'Usuario creado exitosamente' });
          }
        });

      }
    );

};

exports.login = (req, res) => {

  // Revisar si usuario existe
  db.query(
    `SELECT * FROM USUARIO WHERE correo = '${req.body.correo}'`,
    function (error, data) {
      if (error) {
        res.status(400).json({ error: error });
      }
      else {

        if (data.length === 1) {
          bcrypt.compare(req.body.password, data[0].password)
            .then(
              (valid) => {

                // Si password no concuerda
                if (!valid) {
                  res.status(401).json({ error: 'Incorrect password' });
                }
                else {

                  // Crear token de sesion
                  const token = jwt.sign(
                    { correo: data[0].correo },
                    `${ process.env.TOKEN_SECRET }`,
                    { expiresIn: '24h' }
                  );

                  // Return token
                  res.status(200).json({
                    correo: data[0].correo,
                    token: token
                  });

                }

              }
            )
            .catch(
              (error) => {
                res.status(500).json({ error: error });
              }
            );
        }
        else {
          res.status(400).json({ error: 'Usuario no encontrado' });
        }
      }
    }
  );
};