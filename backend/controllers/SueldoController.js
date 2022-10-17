exports.findAll = (req, res) => {

  let sql = 'SELECT * FROM SUELDO';

  db.query(sql, function (error, data) {
    if (error) {
      res.status(400).json({ error: error });
    }
    else {
      res.status(200).json({ data });
    }
  });

};