import { configureStore } from '@reduxjs/toolkit';
import { coreApiSlice } from '../features/api/core-api-slice';
import authReducer from '../features/user/auth-slice';

// Configure store
export const store = configureStore(
  {
    reducer: {
      [coreApiSlice.reducerPath]: coreApiSlice.reducer,
      auth: authReducer,
    },
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(
        coreApiSlice.middleware
      );
    }
  },
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;