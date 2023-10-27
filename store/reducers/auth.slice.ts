import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for slice state
// In this case, test with token
interface AuthState {
  token: string | null;
  // Can add more user info
}

// define initial state
const initialState: AuthState = {
  token: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loginAction: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
    },
    restoreToken: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { loginAction, restoreToken, logout } = AuthSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.

export const authReducer = AuthSlice.reducer;
