import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ILoginResponse, IUserInfo } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: IUserInfo | null;
  token: string | null;
}

// define initial state
const initialState: AuthState = {
  user: null,
  token: null,
};

const fetchDataFromStorage = async (): Promise<AuthState> => {
  try {
    const user = await AsyncStorage.getItem("user");
    const token = await AsyncStorage.getItem("token");

    // Xử lý dữ liệu và trả về AuthState
    return {
      user: user ? JSON.parse(user) : null,
      token: token ? JSON.parse(token) : null,
    };
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching data from AsyncStorage:", error);
    // Trả về initialState nếu không thể lấy dữ liệu từ AsyncStorage
    return initialState;
  }
};

// Khởi tạo initialState bằng cách lấy dữ liệu từ AsyncStorage
export const initializeState = async () => {
  const dataFromStorage = await fetchDataFromStorage();
  // Sử dụng dữ liệu từ AsyncStorage nếu có, nếu không sử dụng initialState
  const finalInitialState: AuthState = dataFromStorage || initialState;

  // Sử dụng finalInitialState ở đây
  console.log("Final Initial State:", finalInitialState);
};

// Gọi initializeState() để bắt đầu quá trình khởi tạo
// initializeState();

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action: PayloadAction<ILoginResponse>) => {
      (state.user = action.payload.user), (state.token = action.payload.token);
    },
    restoreUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, restoreUserInfo, logout } = AuthSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.

export const authReducer = AuthSlice.reducer;
export const userInfoSelector = (state: RootState) => state?.authReducer?.user;
export const tokenInfoSelector = (state: RootState) =>
  state?.authReducer?.token;
