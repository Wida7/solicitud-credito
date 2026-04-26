import {
  Application, CreateApplicationInput,
} from "../domain/types/application.types";

import { getClientAuthHeaders } from "@/modules/auth/utils/clientSession";

const getErrorMessage = async (res: Response, fallbackMessage: string) => {
  try {
    const payload = await res.json();
    return payload.message || payload.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

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
    const res = await fetch("/api/applications", {
      headers: {
        ...getClientAuthHeaders(),
      },
    });

    if (!res.ok) {
      const error = await getErrorMessage(res, "Error obteniendo solicitudes");
      console.error("API ERROR:", res.status, error);
      throw new Error(`(${res.status}) ${error}`);
    }

    return res.json();
  },

  getById: async (id: string): Promise<Application> => {
    const res = await fetch(`/api/applications/${id}`, {
      headers: {
        ...getClientAuthHeaders(),
      },
    });

    if (!res.ok) {
      throw new Error(await getErrorMessage(res, "Error obteniendo solicitud"));
    }

    return res.json();
  },

  update: async (id: string, data: Partial<Application>) => {
    const res = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getClientAuthHeaders(),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(await getErrorMessage(res, "Error actualizando solicitud"));
    }

    return res.json();
  },

  delete: async (id: string) => {
    const res = await fetch(`/api/applications/${id}`, {
      method: "DELETE",
      headers: {
        ...getClientAuthHeaders(),
      },
    });

    if (!res.ok) {
      throw new Error(await getErrorMessage(res, "Error eliminando"));
    }
  },
};
