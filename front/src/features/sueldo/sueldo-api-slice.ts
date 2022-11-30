import { coreApiSlice } from '../api/core-api-slice';

interface Sueldo {
  id_puesto: number;
  base: string;
  gratificacion: string;
  despensa: string;
  seguro: string;
}

export const sueldoApiSlice = coreApiSlice.injectEndpoints(
  {
    endpoints(builder) {
      return {
        getSueldos: builder.query<Sueldo[], void>(
          {
            query() {
              return `/sueldo/`;
            },
            providesTags: ['Sueldo'],
          }
        ),
      };
    }
  }
);

export const { useGetSueldosQuery } = sueldoApiSlice;