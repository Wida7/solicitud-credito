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
    console.log("[API /api/applications POST] Petición iniciada.");

    const body = (await req.json()) as CreateApplicationInput;
    console.log("[API /api/applications POST] Body parseado:", body);

    const { ingresos, egresos, cuotaAprox } = body;

    if (
      ingresos == null ||
      egresos == null ||
      cuotaAprox == null
    ) {
      console.warn("[API /api/applications POST] Falló validación: ingresos, egresos o cuotaAprox son null.");
      return new Response(
        JSON.stringify({ message: "Datos incompletos" }),
        { status: 400 }
      );
    }

    console.log("[API /api/applications POST] Calculando estado de aprobación...");
    const status = calcularProbabilidadAprobacion({
      ingresos,
      egresos,
      cuotaAprox,
    });    
    console.log("[API /api/applications POST] Estado calculado:", status);
    
    console.log("[API /api/applications POST] Llamando a applicationRepository.create...");
    const created = await applicationRepository.create({
      ...body,
      status,
    });
    console.log("[API /api/applications POST] Creación exitosa en repositorio. Resultado:", created);

    return Response.json(created, { status: 201 });

  } catch (error) {

    console.error("❌ [API /api/applications POST] ERROR capturado en catch:", error);
    return new Response(
      JSON.stringify({ 
        message: "Error creando solicitud", 
        error: error instanceof Error ? error.message : String(error) 
      }),
      { status: 500 }
    );
  }
}
