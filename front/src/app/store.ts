import {configureStore} from '@reduxjs/toolkit';
import {userApiSlice} from '../features/user-api-slice';

// Configure store
export const store = configureStore(
  {
    reducer: {
      [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(userApiSlice.middleware);
    }
  },
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;