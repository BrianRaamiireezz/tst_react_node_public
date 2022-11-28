import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Empleado {

  'id_empleado': number,
  'nombre': string,
  'direccion': string,
  'correo': string,
  'id_puesto': number,

}

// Empleado implicito - sin id
interface EmpleadoImp {
  'nombre': string,
  'direccion': string,
  'correo': string,
  'id_puesto': number,
}

interface Response {
  [id: string]: string;
}

export const employApiSlice = createApi(
  {
    reducerPath: 'employApi',
    baseQuery: fetchBaseQuery(
      {
        baseUrl: 'http://127.0.0.1:8000/api/empleado',
      }
    ),
    endpoints(builder) {
      return {

        getEmpleados: builder.query<Empleado[], void>(
          {
            query() {
              return '/';
            }
          }
        ),
        addEmpleado: builder.query<Response, { empleado: EmpleadoImp, auth: string }>(
          {
            query(args) {
              return {
                url: '/',
                method: 'POST',
                body: {
                  data: args.empleado,
                  correo: args.auth
                }
              };
            }
          }
        ),
        updateEmpleado: builder.query<Response, { empleado: EmpleadoImp, auth: string, id: string }>(
          {
            query(args) {
              return {
                url: `/${ args.id }`,
                method: 'PUT',
                body: {
                  data: args.empleado,
                  correo: args.auth
                }
              };
            }
          }
        ),
        deleteEmpleado: builder.query<Response, { auth: string, id: string }>(
          {
            query(args) {
              return {
                url: `/${ args.id }`,
                method: 'DELETE',
                body: {
                  correo: args.auth
                }
              };
            }
          }
        )

      };
    },
  }
);

export const {
  useGetEmpleadosQuery,
  useAddEmpleadoQuery,
  useUpdateEmpleadoQuery,
  useDeleteEmpleadoQuery
} = employApiSlice;