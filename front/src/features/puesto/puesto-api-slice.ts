import { coreApiSlice } from '../api/core-api-slice';

const segment = '/puesto';

interface Puesto {
  id_puesto: number;
  nombre: string;
  descripcion: string;
}

interface PuestoImpl {
  nombre: string;
  descripcion: string;
}

interface Sueldo {
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
            }
          }
        ),
        addPuesto: builder.mutation<Response, { puesto: PuestoImpl, sueldo: Sueldo }>(
          {
            query(args) {
              return {
                url: `/`,
                method: `POST`,
                body: args
              };
            }
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