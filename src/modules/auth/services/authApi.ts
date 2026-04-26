import {
  AuthSession,
  LoginCredentials,
} from "../domain/types/auth.types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthSession> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const payload = await res.json();

    if (!res.ok) {
      throw new Error(payload.message || "Error iniciando sesion");
    }

    return payload;
  },
};
