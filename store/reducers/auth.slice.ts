import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUserInfo } from "../../types";

// Define a type for slice state
// In this case, test with token
interface AuthState {
  user: IUserInfo | null;
}

// define initial state
const initialState: AuthState = {
  user: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action: PayloadAction<IUserInfo>) => {
      state.user = action.payload;
    },
    restoreUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, restoreUserInfo, logout } = AuthSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.

export const authReducer = AuthSlice.reducer;
export const userInfoSelector = (state: RootState) => state?.authReducer?.user;
