import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice.js";
import adminSlice from "./features/adminSlice.js";

const rootReducer = combineReducers({
  login: loginSlice,
  admin: adminSlice,
});

export default rootReducer;
