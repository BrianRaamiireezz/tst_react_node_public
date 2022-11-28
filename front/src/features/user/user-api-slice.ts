import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Session {
  'correo': string,
  'token': string,
}

interface User {
  'correo': string,
  'password': string,
}

export const userApiSlice = createApi(
  {
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://127.0.0.1:8000/api/user',
    }),
    endpoints(builder) {
      return {

        login: builder.query<Session, User>({
          query(user: User) {
            return {
              url: '/login',
              method: 'POST',
              body: user
            };
          }
        })

      };
    },
  },
);

export const {
  useLoginQuery
} = userApiSlice;