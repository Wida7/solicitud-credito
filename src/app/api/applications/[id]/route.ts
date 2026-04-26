import { NextRequest } from "next/server";
import { applicationRepository } from "@/modules/application/repository/applicationRepository";
import { requireEmployeeAuth } from "@/modules/auth/utils/requireEmployeeAuth";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = requireEmployeeAuth(req);

    if (error) {
      return error;
    }

    const { id } = await context.params;

    if (!id) {
      return new Response(
        JSON.stringify({ message: "ID requerido" }),
        { status: 400 }
      );
    }

    const application = await applicationRepository.findById(id);

    if (!application) {
      return new Response(
        JSON.stringify({ message: "Solicitud no encontrada" }),
        { status: 404 }
      );
    }

    return Response.json(application);

  } catch (error) {
    console.error("API ERROR:", error);

    return new Response(
      JSON.stringify({ message: "Error obteniendo solicitud" }),
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = requireEmployeeAuth(req);

    if (error) {
      return error;
    }

    const { id } = await context.params;
    const body = await req.json();

    const updated = await applicationRepository.update(id, body);

    return Response.json(updated);

  } catch (error) {
    console.error("API ERROR:", error);

    return new Response(
      JSON.stringify({ message: "Error actualizando solicitud" }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { error } = requireEmployeeAuth(req);

    if (error) {
      return error;
    }

    const { id } = await context.params;

    await applicationRepository.delete(id);

    return Response.json({ success: true });

  } catch (error) {
    console.error("API ERROR:", error);

    return new Response(
      JSON.stringify({ message: "Error eliminando solicitud" }),
      { status: 500 }
    );
  }
}
