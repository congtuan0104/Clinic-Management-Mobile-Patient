import { combineReducers } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

const { commonReducer } = reducers;
const { authReducer } = reducers;

export const rootReducer = combineReducers({
  commonReducer,
  authReducer,
});
