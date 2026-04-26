import { NextRequest } from "next/server";
import { verifyAuthToken } from "./authToken";

const unauthorized = (message: string, status = 401) =>
  new Response(JSON.stringify({ message }), { status });

export const requireEmployeeAuth = (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return {
      error: unauthorized("Token requerido"),
      user: null,
    };
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const payload = verifyAuthToken(token);

  if (!payload) {
    return {
      error: unauthorized("Token invalido o expirado"),
      user: null,
    };
  }

  if (payload.permissions < 1) {
    return {
      error: unauthorized("No tienes permisos para acceder a este recurso", 403),
      user: null,
    };
  }

  return {
    error: null,
    user: payload,
  };
};
