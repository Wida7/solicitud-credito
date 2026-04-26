import { combineReducers } from "@reduxjs/toolkit";
import applicationReducer from "@/modules/application/store/applicationSlice";
import authReducer from "@/modules/auth/store/authSlice";

export const rootReducer = combineReducers({
  application: applicationReducer,
  auth: authReducer,
});
