import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const rand = Math.random();

    let status = "DRAFT";

    // Simulación simple: 60% aprobado, 25% rechazado, 15% pendiente
    if (rand < 0.6) status = "APPROVED";
    else if (rand < 0.85) status = "REJECTED";

    //***todo Actualizar el estado en la base de datos

    return Response.json({ id, status });

  } catch (error) {
    console.error("ERROR simulate:", error);

    return new Response("Error simulando", { status: 500 });
  }
}