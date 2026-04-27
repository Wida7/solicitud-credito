import { AbandonApplication } from "@/core/domain/types/abandon.types";


export const abandonApi = {
  create: async (data: AbandonApplication): Promise<AbandonApplication> => {
    const res = await fetch("/api/abandon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 🔥 importante
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error creando solicitud");
    }

    return res.json();
  },

  list: async (): Promise<AbandonApplication[]> => {
    const res = await fetch("/api/abandon");

    if (!res.ok) {
      throw new Error("Error obteniendo solicitudes");
    }

    return res.json();
  },
};
