import { applicationApi } from "@/modules/application/services/applicationApi";

export default async function ReviewsPage() {
  const applications = await applicationApi.list();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Solicitudes</h1>

      {applications.length === 0 ? (
        <p>No hay solicitudes aún</p>
      ) : (
        applications.map((app) => (
          <div key={app.id} className="border p-3 rounded mb-2">
            <p><strong>Nombre:</strong> {app.name}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Monto:</strong> {app.monto}</p>
            <p><strong>Estado:</strong> {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
}