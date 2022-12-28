import React, { useState } from 'react';

import { useEmployee } from '../../routes/Empleados';
import { useNavigate } from 'react-router-dom';

import { useGetEmpleadosQuery } from '../../features/employee/employ-api-slice';
import {
  Puesto,
  useGetPuestosQuery
} from '../../features/puesto/puesto-api-slice';

import { Button, Stack, Typography } from '@mui/material';

import {
  DataGrid,
  GridColDef, GridSelectionModel,
} from '@mui/x-data-grid';

function EmpleadosIndex() {

  /* Manage row selected data */
  const { setSelected } = useEmployee();

  /* Selection */
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>( [] );
  let isSelected = selectionModel.length === 1;

  /* Datos empleados */
  const {
    data: datosEmpleados = [],
    isFetching
  } = useGetEmpleadosQuery();

  /* Datos puesto */
  const {
    data: datosPuesto = [],
    isFetching: isFetchingPuestos
  } = useGetPuestosQuery();

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      editable: false,
      flex: 1,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      editable: false,
      flex: 1,
    },
    {
      field: 'direccion',
      headerName: 'Direccion',
      editable: false,
      flex: 1,
    },
    {
      field: 'correo',
      headerName: 'Correo',
      editable: false,
      flex: 1,
    },
    {
      field: 'puesto',
      headerName: 'Puesto',
      editable: false,
      flex: 1,
    },
  ];

  const rows = Object.values( datosEmpleados ).map(
    ({ id_empleado: id, id_puesto, ...rest }) => {

      let puestoAsociado = Object.values( datosPuesto ).find(
        (puesto) => puesto.id_puesto === id_puesto
      );

      let nombrepuesto;

      if (puestoAsociado === undefined) {
        nombrepuesto = 'No encontrado';
      }
      else {
        nombrepuesto = ( puestoAsociado as Puesto ).nombre;
      }

      return (
        {
          id,
          puesto: nombrepuesto,
          ...rest
        }
      );
    }
  );

  function handleSelection(selectionModel: GridSelectionModel) {

    setSelectionModel( selectionModel );

    if (selectionModel.length === 1) {

      let empleado = Object.values( datosEmpleados ).find(
        (empleado) => empleado.id_empleado === selectionModel[0]
      );

      if (empleado === undefined) {
        setSelected( {} );
      }
      else {
        setSelected( empleado );
      }

    }

  }

  return (
    <>
      <Typography variant = { 'h6' } component = { 'h2' } gutterBottom>
        Empleados registrados
      </Typography>

      <RouterButton
        variant = { 'contained' }
        to = { 'agregar' }
        primary = { 'Agregar puesto' }
      />

      {
        isFetching && isFetchingPuestos
          ?
          <p> Cargando puestos </p>
          :
          <>
            <DataGrid
              columns = { columns }
              rows = { rows }
              onSelectionModelChange = { handleSelection }
              selectionModel = { selectionModel }
            />
          </>
      }

      <Stack
        direction = { 'row' }
        spacing = { 2 }
      >

        <RouterButton
          variant = { 'contained' }
          disabled = { !isSelected }
          to = { 'modificar' }
          primary = { 'Modificar' }
        />

        <RouterButton
          variant = { 'contained' }
          disabled = { !isSelected }
          to = { 'eliminar' }
          primary = { 'Eliminar' }
        />

      </Stack>
    </>
  );
}

function RouterButton({
  variant,
  disabled,
  to,
  primary
}: {
  variant: 'text' | 'outlined' | 'contained' | undefined,
  disabled?: boolean,
  to: string,
  primary: string
}) {

  const navigate = useNavigate();

  return (
    <Button
      variant = { variant }
      disabled = { disabled ? disabled : false }
      onClick = { () => navigate( to ) }
    >
      { primary }
    </Button>
  );
}

export default EmpleadosIndex;