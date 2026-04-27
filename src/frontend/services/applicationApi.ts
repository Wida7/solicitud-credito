import {
  Application, CreateApplicationInput,
} from "@/core/domain/types/application.types";

import { getClientAuthHeaders } from "@/frontend/utils/clientSession";

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
    //console.log("[applicationApi.create] Iniciando petición a /api/applications con data:", data);
    console.log("[applicationApi.create] Iniciando petición a /api/applications");

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(`[applicationApi.create] Respuesta HTTP recibida con status: ${res.status} ${res.statusText}`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[applicationApi.create] Fetch falló:", res.status, errorText);
      throw new Error(`Error creando solicitud: ${res.status} - ${errorText}`);
    }

    const responseData = await res.json();
    //console.log("[applicationApi.create] Petición exitosa, parseada a JSON:", responseData);
    console.log("[applicationApi.create] Petición exitosa");

    return responseData;
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

  getByIdentification: async (identification: string): Promise<Application[]> => {
    const res = await fetch(`/api/applications/consult/${identification}`);

    if (!res.ok) {
      throw new Error(await getErrorMessage(res, "Error obteniendo solicitudes"));
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
