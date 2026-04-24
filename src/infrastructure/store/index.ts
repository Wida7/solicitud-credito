import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// 🔐 Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["application"], // 👈 solo este slice se persiste
};

// 🔁 Reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🏗️ Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necesario para redux-persist
    }),
});

// 💾 Persistor
export const persistor = persistStore(store);

// 📦 Tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;