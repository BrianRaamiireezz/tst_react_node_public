import { coreApiSlice } from '../api/core-api-slice';

interface Session {
  'correo': string,
  'token': string,
}

interface User {
  'correo': string,
  'password': string,
}

export const userApiSlice = coreApiSlice.injectEndpoints(
  {
    endpoints(builder) {
      return {

        login: builder.mutation<Session, User>({
          query(user: User) {
            return {
              url: '/user/login',
              method: 'POST',
              body: user
            };
          }
        })

      };
    },
    overrideExisting: false,
  }
);

export const {
  useLoginMutation
} = userApiSlice;