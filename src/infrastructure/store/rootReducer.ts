import { combineReducers } from "@reduxjs/toolkit";
import applicationReducer from "@/modules/application/store/applicationSlice";

export const rootReducer = combineReducers({
  application: applicationReducer,
});