import { Application, CreateApplicationInput,
 } from "../domain/types/application.types";

export const applicationApi = {
  create: async (data: CreateApplicationInput): Promise<Application> => {
    const res = await fetch("/api/applications", {
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

  list: async (): Promise<Application[]> => {
    const res = await fetch("/api/applications");

    if (!res.ok) {
      throw new Error("Error obteniendo solicitudes");
    }

    return res.json();
  },

  simulate: async (id: string): Promise<{ status: string }> => {
    const res = await fetch(`/api/applications/${id}/simulate`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Error simulando");
    }

    return res.json();
  },
};