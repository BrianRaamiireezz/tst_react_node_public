import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

export const coreApiSlice = createApi(
  {
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
      {
        baseUrl: `${ import.meta.env.VITE_API_URL }`,
        prepareHeaders(headers, api) {
          const token = ( api.getState() as RootState ).auth.token;
          headers.set( 'Authorization', `bearer ${ token }` );
        }
      }
    ),
    tagTypes: ['Employee', 'Puesto', 'Sueldo'],
    endpoints: () => ( {} ),
  }
);