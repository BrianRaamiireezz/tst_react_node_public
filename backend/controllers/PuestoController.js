exports.create = (req, res) => {

  // Crear puesto
  let sql = `INSERT INTO PUESTO(nombre, descripcion) VALUES(?)`;
  let valores = [
    req.body.puesto.nombre,
    req.body.puesto.descripcion
  ];

  db.query(sql, [valores], function (error, data) {
    if (error) {
      res.status(400).json({ error: error });
    }
    else {

      // Calcular seguro
      let seguro = parseFloat(req.body.sueldo.base) + parseFloat(req.body.sueldo.gratificacion) + parseFloat(req.body.sueldo.despensa);
      seguro = seguro * (0.16);

      let sql = `INSERT INTO SUELDO (id_puesto, base, gratificacion, despensa, seguro) VALUES(?)`;
      let valores = [
        data.insertId,
        req.body.sueldo.base,
        req.body.sueldo.gratificacion,
        req.body.sueldo.despensa,
        seguro
      ];

      // Crear tabulador sueldo
      db.query(sql, [valores], function (error) {
        if (error) {
          res.status(400).json({ error: error });
        }
        else {
          res.status(200).json({ message: 'Puesto creado exitosamente' });
        }
      });
    }
  });

};

exports.findAll = (req, res) => {

  let sql = 'SELECT * FROM puesto';

  db.query(sql, function (error, data) {
    if (error) {
      res.status(400).json({ error: error });
    }
    else {
      res.status(200).json({ data });
    }
  });
};