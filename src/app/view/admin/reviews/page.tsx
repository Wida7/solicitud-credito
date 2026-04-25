"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/molecules/DataTable";
import { Application } from "@/modules/application/domain/types/application.types";
import { applicationApi } from "@/modules/application/services/applicationApi";
import { columns } from "./columns";

export default function ReviewsPage() {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await applicationApi.list();

        if (isMounted) {
          setApplications(data);
        }
      } catch (error) {
        console.error("Error obteniendo solicitudes:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchApplications();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen px-4 pt-28 pb-8 md:px-6 md:pt-32">
      <div className="mx-auto w-full max-w-6xl space-y-4 rounded-4xl border p-8">
        {/* todo implementar skeleton o implementar dynamic() */}
        <h1 className="text-center text-xl font-bold">Procesos de solicitud</h1>
        {loading ? (
          <p className="text-center text-sm text-muted-foreground">
            Cargando solicitudes...
          </p>
        ) : (
          <DataTable data={applications} columns={columns} />
        )}
      </div>
    </div>
  );
}
