import { compare } from "bcryptjs";
import bcrypt from "bcryptjs";
import { authRepository } from "@/backend/repository/authRepository";
import {
  AuthSession,
  LoginCredentials,
} from "@/core/domain/types/auth.types";
import { createAuthToken } from "@/backend/services/authToken";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginCredentials;
    const { username, password } = body;

    if (!username?.trim() || !password?.trim()) {
      return new Response(
        JSON.stringify({ message: "Usuario y contrasena son requeridos" }),
        { status: 400 }
      );
    }

    const user = await authRepository.findByUsername(username.trim());

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Credenciales invalidas" }),
        { status: 401 }
      );
    }

    const hash = await bcrypt.hash("admin", 10);
    console.log(hash);

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ message: "Credenciales invalidas" }),
        { status: 401 }
      );
    }

    const session: AuthSession = {
      token: createAuthToken({
        username: user.username,
        permissions: user.permissions,
        id_user: user.id_user,
      }),
      user: {
        username: user.username,
        permissions: user.permissions,
        id_user: user.id_user,
      },
    };

    return Response.json(session);
  } catch (error) {
    console.error("API ERROR:", error);
    return new Response(
      JSON.stringify({ message: "Error iniciando sesion" }),
      { status: 500 }
    );
  }
}
