import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../utils/context';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';

export default function Modificacion({ puestos, empleados, actualiza }) {

  const { Auth, Token, IdUsuario } = useContext(AuthContext);
  const [token] = Token;
  const [idUsuario] = IdUsuario;

  const [seleccion, setSeleccion] = useState({});
  const [open, setOpen] = useState(false);

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');

  const [puesto, setPuesto] = useState('');
  const [puestoNombre, setPuestoNombre] = useState('');

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

      // Set valores anteriores a modificacion
      Object.values(rows).map((row, index) => {
        if (row.id === seleccion[0]) {
          setNombre(row.nombre);
          setCorreo(row.correo);
          setDireccion(row.direccion);
          setPuesto(empleados[index].id_puesto);
          setPuestoNombre(empleados[index].id_puesto);
        }
      });

      setOpen(true);

    }
    else {
      // Agregar alert
      console.log('No puede modificar');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelHandler = () => {
    setOpen(false);
  };

  const handleSelect = (e) => {
    setPuestoNombre(e.target.value);
    setPuesto(e.target.value);
  };

  const modificarHandler = async () => {

    const url = `http://localhost:8000/api/empleado/${ seleccion[0] }`;
    const autorizacion = `bearer ${ token }`;

    const datos = {
      correo: idUsuario,
      empleado: {
        nombre: nombre,
        direccion: direccion,
        correo: correo
      },
      puesto: {
        id_puesto: puesto
      }
    };

    const result = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': autorizacion
      },
      body: JSON.stringify(datos)
    });

    if (result.ok) {
      const response = await result.json();

      actualiza();

      // Cerrar modal
      setOpen(false);
    }
    else {
      console.log('Error');
    }

  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  };

  return (
    <div
      style = { {
        height: 400,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 15
      } }
    >

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
        Modificar
      </Button>

      <Modal
        open = { open }
        onClose = { handleClose }
        aria-labelledby = "modal-modal-title"
        aria-describedby = "modal-modal-description"
      >
        <Box sx = { style }>
          <Typography id = "modal-modal-title" variant = "h6" component = "h2">
            Modificar
          </Typography>
          <div
            id = "modal-modal-description"
            sx = { { mt: 2 } }
            style = { { display: 'flex', flexDirection: 'column', gap: 15 } }
          >

            <Stack
              spacing = { 2 }
              alignItems = { 'center' }
              justifyContent = { 'center' }
            >

              <TextField
                required
                label = "Nombre"
                value = { nombre }
                onChange = { (e) => setNombre(e.target.value) }
              />

              <TextField
                required
                label = "Direccion"
                value = { direccion }
                onChange = { (e) => setDireccion(e.target.value) }
              />

              <TextField
                required
                label = "Correo"
                value = { correo }
                onChange = { (e) => setCorreo(e.target.value) }
              />

              <TextField
                required
                select
                label = "Puestos"
                value = { puestoNombre }
                onChange = { (e) => handleSelect(e) }
                helperText = "Selecciona un puesto"
              >
                {
                  Object.values(puestos).map(
                    (puesto) => (
                      <MenuItem
                        key = { puesto.id_puesto }
                        value = { puesto.id_puesto }
                      >
                        { puesto.nombre }
                      </MenuItem>
                    )
                  )
                }
              </TextField>
            </Stack>

            <div
              style = { {
                display: 'flex',
                gap: 15,
                justifyContent: 'space-around'
              } }
            >

              <Button
                variant = "contained"
                onClick = { cancelHandler }
              >
                Cancelar
              </Button>

              <Button
                variant = "contained"
                onClick = { modificarHandler }
              >
                Modificar
              </Button>

            </div>

          </div>
        </Box>
      </Modal>

    </div>
  );

}