exports.create = (req, res) => {

  let sql = `INSERT INTO EMPLEADO (nombre, direccion, correo, id_puesto) VALUES(?)`;
  let valores = [
    req.body.data.nombre,
    req.body.data.direccion,
    req.body.data.correo,
    req.body.data.id_puesto
  ];

  db.query(sql, [valores], function (error) {
    if (error) {
      res.status(400).json({ error: error });
    }
    else {
      res.status(200).json({ message: 'Empleados creado exitosamente' });
    }
  });

};

exports.updateOne = (req, res) => {

  let sql = `UPDATE EMPLEADO SET nombre=?, direccion=?, correo=?, id_puesto=? WHERE id_empleado=?`;
  let valores = [
    req.body.data.nombre,
    req.body.data.direccion,
    req.body.data.correo,
    req.body.data.id_puesto,
    req.params.id
  ];

  db.query(sql, valores, function (error) {
    if (error) {
      res.status(400).json({ error: error });
    }
    else {
      res.status(200).json({ message: 'Empleados actualizado exitosamente' });
    }
  });

};

exports.deleteOne = (req, res) => {

  let sql = `DELETE FROM EMPLEADO WHERE id_empleado=${req.params.id}`;

  db.query(sql, function (error) {
    if (error) {
      res.status(400).json({ error: error });
    }
    else {
      res.status(200).json({ message: 'Empleados eliminado exitosamente' });
    }
  });

};

exports.findAll = (req, res) => {

  let sql = 'SELECT * FROM EMPLEADO';

  db.query(sql, function (error, data) {
    if (error) {
      res.status(400).json({ error: error });
    }
    else {
      res.status(200).json([...data]);
    }
  });

};