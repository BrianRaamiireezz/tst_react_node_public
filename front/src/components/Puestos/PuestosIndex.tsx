import {
  Button,
  Paper,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Typography
} from '@mui/material';

import { useGetPuestosQuery } from '../../features/puesto/puesto-api-slice';
import { useGetSueldosQuery } from '../../features/sueldo/sueldo-api-slice';

import { useNavigate } from 'react-router-dom';

function PuestosIndex() {

  const navigate = useNavigate();

  /* Datos puestos */
  const {
    data: datosPuestos = [],
    isFetching: isFetchingPuestos
  } = useGetPuestosQuery();

  /* Datos sueldos */
  const {
    data: datosSueldos = [],
    isFetching: isFetchingSueldos
  } = useGetSueldosQuery();

  /* Cabecera tabla */
  const tableHeader = [
    { name: 'Id', key: 'puestos-index-id' },
    { name: 'Nombre', key: 'puestos-index-nombre' },
    { name: 'Descripcion', key: 'puestos-index-descripcion' },
    { name: 'Base', key: 'puestos-index-base' },
    { name: 'Gratificación', key: 'puestos-index-gratificacion' },
    { name: 'Despensa', key: 'puestos-index-despensa' },
  ];

  return (

    <>

      <Typography variant = { 'h6' } component = { 'h2' } gutterBottom>
        Puestos registrados
      </Typography>

      <Button
        variant = { 'outlined' }
        onClick = { () => navigate( 'agregar' ) }
      >
        Agregar puesto
      </Button>

      {
        isFetchingPuestos && isFetchingSueldos
          ?
          <p> Cargando puestos </p>
          :
          <TableContainer component = { Paper } sx = { { width: '100%' } }>
            <Table>

              <TableHead
                sx = { {
                  backgroundColor: 'primary.dark',
                  color: 'primary.contrastText',
                } }
              >

                <TableRow>
                  {
                    tableHeader.map(
                      (campo) => (
                        <TableCell
                          sx = { { color: 'inherit' } }
                          key = { campo.key }
                        >
                          { campo.name }
                        </TableCell>
                      )
                    )
                  }
                </TableRow>

              </TableHead>

              <TableBody>
                {
                  Object.values( datosPuestos ).map(
                    (puesto, index) => {

                      const sueldoAsociado = datosSueldos.find(
                        (sueldo) => {
                          return sueldo.id_puesto === puesto.id_puesto;
                        }
                      );

                      let keyRow = `puestoindex-index-${ index }`;

                      return (
                        <TableRow
                          key = { keyRow }
                        >

                          {/* Datos puesto */ }
                          {
                            Object.values( puesto ).map(
                              (campo, index) => (
                                <TableCell
                                  key = { `${ keyRow }-campo-${ index }` }
                                >
                                  { campo }
                                </TableCell>
                              )
                            )
                          }

                          {/* Datos sueldo asociado */ }
                          <TableCell> { sueldoAsociado?.base ?? 'No definido' }</TableCell>
                          <TableCell> { sueldoAsociado?.gratificacion ?? 'No definido' }</TableCell>
                          <TableCell> { sueldoAsociado?.despensa ?? 'No definido' }</TableCell>

                        </TableRow>
                      );
                    }
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
      }
    </>
  );
}

export default PuestosIndex;