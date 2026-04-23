import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

//Creación del store de Redux
export const store = configureStore({
  // Aquí combinamos los reducers de cada slice
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;