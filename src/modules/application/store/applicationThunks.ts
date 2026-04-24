import { createAsyncThunk } from "@reduxjs/toolkit";
import { applicationApi } from "../services/applicationApi";
import { FormItems } from "../domain/types/form.types";
import { mapFormToApplication } from "../domain/mappers/application.mapper";

export const createApplication = createAsyncThunk(
  "application/create",
  async (data: FormItems) => {
    const application = mapFormToApplication(data);

    // aquí podrías llamar API después
    return application;
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