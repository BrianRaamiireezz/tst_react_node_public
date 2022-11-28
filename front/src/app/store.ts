import { configureStore } from '@reduxjs/toolkit';
import { userApiSlice } from '../features/user/user-api-slice';
import { employApiSlice } from '../features/employee/employ-api-slice';

// Configure store
export const store = configureStore(
  {
    reducer: {
      [userApiSlice.reducerPath]: userApiSlice.reducer,
      [employApiSlice.reducerPath]: employApiSlice.reducer,
    },
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(
        userApiSlice.middleware,
        employApiSlice.middleware
      );
    }
  },
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;