import { applicationApi } from "@/modules/application/services/applicationApi";
import { maskEmail } from "@/lib/utils/mask";

export const dynamic = "force-dynamic"; // evita cache

type ApplicationView = {
  id: string;
  name: string;
  email: string;
  monto: number;
  status: string;
};

export default async function ReviewsPage() {
  const applications = await applicationApi.list();

  // 🔐 Transformación segura (DTO)
  const safeData: ApplicationView[] = applications.map((app) => ({
    id: app.id,
    name: app.name,
    email: maskEmail(app.email), // 🔥 protegido
    monto: app.monto,
    status: app.status,
  }));

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Solicitudes</h1>

      {safeData.length === 0 ? (
        <p className="text-gray-400">No hay solicitudes aún</p>
      ) : (
        <div className="space-y-3">
          {safeData.map((app) => (
            <div
              key={app.id}
              className="border border-neutral-700 p-4 rounded-md bg-neutral-900"
            >
              <p><strong>Nombre:</strong> {app.name}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Monto:</strong> ${app.monto.toLocaleString()}</p>
              <p><strong>Estado:</strong> {app.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}