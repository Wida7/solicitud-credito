import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSession } from "@/core/domain/types/auth.types";

type AuthState = {
  session: AuthSession | null;
};

const initialState: AuthState = {
  session: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<AuthSession>) {
      state.session = action.payload;
    },
    clearSession(state) {
      state.session = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
