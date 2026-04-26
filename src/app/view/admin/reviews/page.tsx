"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/molecules/DataTable";
import { Application } from "@/modules/application/domain/types/application.types";
import { applicationApi } from "@/modules/application/services/applicationApi";
import { getColumns } from "./columns";
import FormViewApplication from "@/components/formViewApplication/FormViewApplication";
import { SkeletonTable } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useAppSelector } from "@/infrastructure/store/hooks";

export default function ReviewsPage() {
  const router = useRouter();
  const session = useAppSelector((state) => state.auth.session);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleView = (id: string) => {
    setOpenModal(true);
    setSelectedApplication(null);
    setSelectedApplicationId(id);
  };

  useEffect(() => {
    if (!openModal || !selectedApplicationId || !session?.token) {
      return;
    }

    let isMounted = true;

    const fetchApplicationDetail = async () => {
      try {
        await new Promise((res) => setTimeout(res, 2000));
        const data = await applicationApi.getById(selectedApplicationId);

        if (isMounted) {
          setSelectedApplication(data);
        }
      } catch (error) {
        console.error("Error obteniendo detalle:", error);
        toast.error("No fue posible cargar el detalle", {
          position: "top-center",
          className: "bg-primary text-primary-foreground font-semibold",
        });
      }
    };

    fetchApplicationDetail();

    return () => {
      isMounted = false;
    };
  }, [openModal, selectedApplicationId, session?.token]);

  useEffect(() => {
    if (!session?.token) {
      router.replace("/view/login");
      return;
    }

    let isMounted = true;

    const fetchApplications = async () => {
      try {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 3000));
        const data = await applicationApi.list();

        if (isMounted) {
          setApplications(data);
        }
      } catch (error) {
        console.error("Error obteniendo solicitudes:", error);
        const message =
          error instanceof Error ? error.message : "Error obteniendo solicitudes";

        if (message.toLowerCase().includes("token")) {
          toast.error("Tu sesion ya no es valida", {
            position: "top-center",
            className: "bg-primary text-primary-foreground font-semibold",
          });
          router.replace("/view/login");
          return;
        }

        toast.error(message, {
          position: "top-center",
          className: "bg-primary text-primary-foreground font-semibold",
        });
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
  }, [router, session?.token]);


  const handleUpdateApplication = async (updated: Application) => {
    const previousState = [...applications];
    //console.log("UPDATED:", updated);
    setApplications(prev => prev.map(item => item.id === updated.id ? updated : item)
    );
    setOpenModal(false);
    //setOpenModal(false);

    try {
      await applicationApi.update(updated.id, updated);
      toast.success("Solicitud actualizada correctamente", {
        position: "top-center",
        className: "bg-primary text-primary-foreground font-semibold",
      });
    } catch (error) {
      console.error("Error al actualizar:", error);
      setApplications(previousState);
      toast.error("Error de conexión: El cambio no se guardó en el servidor", {
        position: "top-center",
        className: "bg-primary text-primary-foreground font-semibold",
      });
    }
  };

  const handleDeleteApplication = async (id: string) => {
    const prev = applications;

    setApplications((current) => current.filter((item) => item.id !== id));

    try {
      await applicationApi.delete(id);
    } catch (error) {
      console.error(error);
      setApplications(prev);
      toast.error("Error eliminando la solicitud", {
        position: "top-center",
        className: "bg-primary text-primary-foreground font-semibold",
      });
    }
  };

  return (
    <>
      <FormViewApplication
        key={selectedApplicationId || "closed"}
        open={openModal}
        onOpenChange={(open) => {
          setOpenModal(open);

          if (!open) {
            setSelectedApplication(null);
            setSelectedApplicationId(null);
          }
        }}
        data={selectedApplication}
        onConfirm={handleUpdateApplication}
        onDelete={handleDeleteApplication}
      />

      <div className="min-h-screen px-4 pt-28 pb-8 md:px-6 md:pt-32">
        <div className="mx-auto w-full max-w-6xl space-y-4 rounded-4xl border p-8">
          <h1 className="text-center text-xl font-bold">Procesos de solicitud</h1>
          {loading ? (
            <>
              <p className="animate-pulse text-center text-sm text-muted-foreground">
                Cargando solicitudes...
              </p>
              <SkeletonTable rows={5} className="w-full" />
            </>
          ) : (
            <DataTable data={applications} columns={getColumns(handleView)} />
          )}
        </div>
      </div>
    </>
  );
}
