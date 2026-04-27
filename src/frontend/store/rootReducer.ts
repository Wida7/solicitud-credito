import { combineReducers } from "@reduxjs/toolkit";
import applicationReducer from "@/frontend/store/applicationSlice";
import authReducer from "@/frontend/store/authSlice";

export const rootReducer = combineReducers({
  application: applicationReducer,
  auth: authReducer,
});
