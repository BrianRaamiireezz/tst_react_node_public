import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApiSlice } from './user-api-slice';

// State shape
interface AuthState {
  'correo': string,
  'token': string,
  'autorizado': boolean,
}

// Initial state
const initialState: AuthState = {
  'correo': '',
  'token': '',
  'autorizado': false,
};

// Create slice
const authSlice = createSlice(
  {
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // Update credentials once user has succesfully logged
      builder.addMatcher(
        userApiSlice.endpoints.login.matchFulfilled,
        (state, action) => {
          state.correo = action.payload.correo;
          state.token = action.payload.token;
          state.autorizado = true;
        }
      );
    },
  }
);

// Export actions - In this case there's no actions to export

// Export reducer
export default authSlice.reducer;