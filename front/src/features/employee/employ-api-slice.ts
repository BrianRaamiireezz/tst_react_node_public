import { coreApiSlice } from '../api/core-api-slice';

interface Empleado {

  'id_empleado': number,
  'nombre': string,
  'direccion': string,
  'correo': string,
  'id_puesto': number,

}

/* Empleado implicito - sin id
*  @interface EmpleadoImp
* */
interface EmpleadoImp {
  // Nombre del empleado
  nombre: string;
  // Direccion del empleado
  direccion: string;
  // Correo del empleado
  correo: string;
  // Id del puesto - Mayor que 0
  id_puesto: number;
}

interface Response {
  [id: string]: string;
}

const segment = '/empleado';

export const employApiSlice = coreApiSlice.injectEndpoints(
  {
    endpoints(builder) {
      return {

        getEmpleados: builder.query<Empleado[], void>(
          {
            query() {
              return `${ segment }/`;
            },
            providesTags: ['Employee'],
          }
        ),
        addEmpleado: builder.mutation<Response, { empleado: EmpleadoImp, auth: string }>(
          {
            query(args) {
              return {
                url: `${ segment }/`,
                method: 'POST',
                body: {
                  data: args.empleado,
                  correo: args.auth
                }
              };
            },
            invalidatesTags: ['Employee'],
          }
        ),
        updateEmpleado: builder.mutation<Response, { empleado: EmpleadoImp, auth: string, id: string }>(
          {
            query(args) {
              return {
                url: `${ segment }/${ args.id }`,
                method: 'PUT',
                body: {
                  data: args.empleado,
                  correo: args.auth
                }
              };
            },
            invalidatesTags: ['Employee'],
          }
        ),
        deleteEmpleado: builder.mutation<Response, { auth: string, id: string }>(
          {
            query(args) {
              return {
                url: `${ segment }/${ args.id }`,
                method: 'DELETE',
                body: {
                  correo: args.auth
                }
              };
            },
            invalidatesTags: ['Employee'],
          }
        )

      };
    },
  }
);

export const {
  useGetEmpleadosQuery,
  useAddEmpleadoMutation,
  useUpdateEmpleadoMutation,
  useDeleteEmpleadoMutation
} = employApiSlice;