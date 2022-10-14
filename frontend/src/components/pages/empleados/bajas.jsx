import React, { useContext, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { AuthContext } from '../../../utils/context';

export default function Bajas({ puestos, empleados, actualiza }) {

  const { Auth, Token, IdUsuario } = useContext(AuthContext);
  const [token] = Token;
  const [idUsuario] = IdUsuario;

  const [seleccion, setSeleccion] = useState({});

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nombre', headerName: 'Nombre', width: 100 },
    { field: 'direccion', headerName: 'Dirección', width: 100 },
    { field: 'correo', headerName: 'Correo', width: 150 },
    { field: 'puesto', headerName: 'Puesto', width: 150 },
  ];

  let rows = [];

  empleados.map((empleado) => {
    rows.push({
      id: empleado.id_empleado,
      nombre: empleado.nombre,
      direccion: empleado.direccion,
      correo: empleado.correo,
      puesto: puestos[empleado.id_puesto - 1].nombre,
    });
  });

  const selectionHandler = (selection) => {
    setSeleccion(selection);
  };

  const clicHandler = async () => {
    if (seleccion.length === 1) {

      const url = `http://localhost:8000/api/empleado/${ seleccion[0] }`;
      const autorizacion = `bearer ${ token }`;

      const datos = {
        correo: idUsuario,
      };

      const result = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': autorizacion
        },
        body: JSON.stringify(datos)
      });

      if (result.ok) {
        const response = await result.json();

        // Determinar que se realizo una actualizacion
        actualiza();

      }
      else {
        console.log('Error');
      }

    }
    else {
      // Agregar alert
      console.log('No puede eliminar');
    }
  };

  return (
    <div style = { { height: 400, width: '100%' } }>

      <DataGrid
        rows = { rows }
        columns = { columns }
        pageSize = { 5 }
        rowsPerPageOptions = { [5] }
        checkboxSelection
        onSelectionModelChange = { (selection) => selectionHandler(selection) }
      />

      <Button
        variant = "contained"
        onClick = { clicHandler }
      >
        Eliminar
      </Button>

    </div>
  );
}