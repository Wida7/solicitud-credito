import { NextRequest } from "next/server";
import { applicationRepository } from "@/modules/application/repository/applicationRepository";
import { CreateApplicationInput } from "@/modules/application/domain/types/application.types";
import { calcularProbabilidadAprobacion } from "./services/calcularProbabilidadAprobacion";
import { requireEmployeeAuth } from "@/modules/auth/utils/requireEmployeeAuth";

export async function GET(req: NextRequest) {
  console.log("api/GET");
  try {
    const { error } = requireEmployeeAuth(req);

    if (error) {
      return error;
    }

    const data = await applicationRepository.findAll();

    return Response.json(data);
  } catch (error) {
    
    console.error("❌ API ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Error obteniendo solicitudes" }),
      { status: 500 }
    );
  }
}

//Crear aplicacion
export async function POST(req: Request) {
  try {

    const body = (await req.json()) as CreateApplicationInput;
    console.log("Body - api/POST" , body);

    const { ingresos, egresos, cuotaAprox } = body;

    if (
      ingresos == null ||
      egresos == null ||
      cuotaAprox == null
    ) {
      return new Response(
        JSON.stringify({ message: "Datos incompletos" }),
        { status: 400 }
      );
    }

    const status = calcularProbabilidadAprobacion({
      ingresos,
      egresos,
      cuotaAprox,
    });    
    
    const created = await applicationRepository.create({
      ...body,
      status,
    });

    return Response.json(created, { status: 201 });

  } catch (error) {

    console.error("❌ API ERROR:", error);
    return new Response(
      JSON.stringify({ message: "Error creando solicitud" }),
      { status: 500 }
    );
  }
}
