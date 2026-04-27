import { createSlice } from "@reduxjs/toolkit";
import {
  createApplication,
  fetchApplications,
} from "./applicationThunks";
import { Application } from "./types";

interface State {
  items: Application[];
  loading: boolean;
  error?: string;
}

const initialState: State = {
  items: [],
  loading: false,
};



const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // LIST
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.items = action.payload;
      })
  },
});

export default applicationSlice.reducer;