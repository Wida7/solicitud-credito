import { abandonRepository } from "@/modules/abandon/repository/abandonRepository";

export async function GET() {
  try {
    const data = await abandonRepository.findAll();

    return Response.json(data);
  } catch (error) {
    
    console.error("API ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Error obteniendo solicitudes" }),
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {

    const body = await req.json();
    const created = await abandonRepository.create(body);
    return Response.json(created, { status: 201 });

  } catch (error) {

    console.error("API ERROR:", error);
    return new Response(
      JSON.stringify({ message: "Error creando solicitud" }),
      { status: 500 }
    );
  }
}
