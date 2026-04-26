import { NextRequest } from "next/server";
import { applicationRepository } from "@/modules/application/repository/applicationRepository";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ identification: string }> }
) {
  try {
    const { identification } = await context.params;

    if (!identification) {
      return new Response(
        JSON.stringify({ message: "Identificación requerida" }),
        { status: 400 }
      );
    }

    await new Promise((res) => setTimeout(res, 2000));
    const applications = await applicationRepository.findByIdentification(identification);

    return Response.json(applications);

  } catch (error) {
    console.error("API ERROR:", error);

    return new Response(
      JSON.stringify({ message: "Error obteniendo solicitudes por identificación" }),
      { status: 500 }
    );
  }
}
