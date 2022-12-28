import { coreApiSlice } from '../api/core-api-slice';

const segment = '/puesto';

export interface Puesto {
  id_puesto: number;
  nombre: string;
  descripcion: string;
}

export interface PuestoImpl {
  nombre: string;
  descripcion: string;
}

export interface Sueldo {
  base: string;
  gratificacion: string;
  despensa: string;
}

interface Response {
  message: string;
}

export const puestoApiSlice = coreApiSlice.injectEndpoints(
  {
    endpoints(builder) {
      return {
        getPuestos: builder.query<Puesto[], void>(
          {
            query() {
              return `${ segment }/`;
            },
            providesTags: ['Puesto'],
          }
        ),
        addPuesto: builder.mutation<Response, { puesto: PuestoImpl, sueldo: Sueldo }>(
          {
            query(args) {
              return {
                url: `${ segment }/`,
                method: `POST`,
                body: args
              };
            },
            invalidatesTags: ['Puesto', 'Sueldo'],
          }
        ),
      };
    }
  }
);

export const {
  useAddPuestoMutation,
  useGetPuestosQuery
} = puestoApiSlice;