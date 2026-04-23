import { createAsyncThunk } from "@reduxjs/toolkit";
import { applicationApi } from "../services/applicationApi";

export const createApplication = createAsyncThunk(
  "application/create",
  async (data: any) => {
    return await applicationApi.create(data);
  }
);

export const fetchApplications = createAsyncThunk(
  "application/list",
  async () => {
    return await applicationApi.list();
  }
);

export const simulateApplication = createAsyncThunk(
  "application/simulate",
  async (id: string) => {
    return await applicationApi.simulate(id);
  }
);