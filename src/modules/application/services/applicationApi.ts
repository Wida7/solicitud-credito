import { Application } from "../store/types";

let mockDB: Application[] = [];

export const applicationApi = {
  create: async (data: Partial<Application>) => {
    const newApp: Application = {
      id: crypto.randomUUID(),
      name: data.name || "",
      email: data.email || "",
      amount: data.amount || 0,
      status: "DRAFT",
      createdAt: new Date().toISOString(),
    };

    mockDB.push(newApp);
    return newApp;
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