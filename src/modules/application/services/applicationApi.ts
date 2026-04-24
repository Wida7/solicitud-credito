import { Application } from "../store/types";

const mockDB: Application[] = [];

export const applicationApi = {
  create: async (data: any) => {
    const res = await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return res.json();
  },

  list: async () => {
    const res = await fetch("/api/applications");
    return res.json();
  },
};
