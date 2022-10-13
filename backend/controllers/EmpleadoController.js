exports.create = (req, res) => {

  let sql = `INSERT INTO EMPLEADO (nombre, direccion, correo, id_puesto) VALUES(?)`;
  let valores = [
    req.body.empleado.nombre,
    req.body.empleado.direccion,
    req.body.empleado.correo,
    req.body.puesto.id_puesto
  ];

  db.query(sql, [valores], function (error) {
    if (error) {
      res.status(400).json({ error: error });
    }
    else {
      res.status(200).json({ message: 'Empleado creado exitosamente' });
    }
  });

};

exports.updateOne = (req, res) => {

  let sql = `UPDATE EMPLEADO SET nombre=?, direccion=?, correo=?, id_puesto=? WHERE id_empleado=?`;
  let valores = [
    req.body.empleado.nombre,
    req.body.empleado.direccion,
    req.body.empleado.correo,
    req.body.puesto.id_puesto,
    req.params.id
  ];

  db.query(sql, valores, function (error) {
    if (error) {
      res.status(400).json({ error: error });
    }
    else {
      res.status(200).json({ message: 'Empleado actualizado exitosamente' });
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
      res.status(200).json({ message: 'Empleado eliminado exitosamente' });
    }
  });

};