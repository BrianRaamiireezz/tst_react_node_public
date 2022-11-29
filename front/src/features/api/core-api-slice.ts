import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

export const coreApiSlice = createApi(
  {
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
      {
        baseUrl: 'http://127.0.0.1:8000/api',
        prepareHeaders(headers, api) {
          const token = (api.getState() as RootState).auth.token;
          headers.set('Authorization', `bearer ${ token }`);
        }
      }
    ),
    endpoints: () => ({}),
  }
);