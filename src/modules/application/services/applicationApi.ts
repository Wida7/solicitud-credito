import { Application } from "../store/types";

let mockDB: Application[] = [];

export const applicationApi = {
  create: async (data: Application) => {
    mockDB.push(data);
    return data;
  },

  list: async () => {
    return mockDB;
  },

  simulate: async (id: string) => {
    const rand = Math.random();

    if (rand < 0.6) return { status: "APPROVED" };
    if (rand < 0.85) return { status: "REJECTED" };

    throw new Error("Error técnico");
  },
};