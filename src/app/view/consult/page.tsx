"use client";

import { useState } from "react";
import DataTable from "@/components/molecules/DataTable";
import { Application } from "@/modules/application/domain/types/application.types";
import { getColumns } from "./columns";
import { SkeletonTable } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input as InputIU } from "@/components/ui/input";
import { validateApplicationField } from "@/modules/application/domain/validations/application.validator";
import { applicationApi } from "@/modules/application/services/applicationApi";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Filters = {
  identification: Application["identification"];
};

export default function ReviewsPage() {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<Filters>({
    identification: "",
  });

const handleChange = (value: Application["identification"]) => {
  const validation = validateApplicationField({
    identification: value,
  });

  setErrors(prev => ({ ...prev, ...validation }));

  setFilters(prev => ({
    ...prev,
    identification: value,
  }));
};

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error) || !filters.identification) {
      toast.warning("Revisa la identificación ingresada", { position: "top-center" });
      return;
    }

    try {
      setLoading(true);
      const data = await applicationApi.getByIdentification(filters.identification);
      setApplications(data);
      if (data.length === 0) {
        toast.info("No se encontraron solicitudes con esa identificación", { position: "top-center" });
      } else {
        toast.success(`Se encontraron ${data.length} solicitud(es)`, { position: "top-center" });
      }
    } catch (error) {
      toast.error("Error al buscar la solicitud", { position: "top-center" });
      console.error("Error obteniendo solicitudes por identificación:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen px-4 pt-28 pb-8 md:px-6 md:pt-32">
        <div className="mx-auto w-full max-w-6xl space-y-4 rounded-4xl border p-8">
          <h1 className="text-center text-xl font-bold">Procesos de solicitud</h1>
          <div>
            <label className="text-sm font-medium mt-2">Identificacion</label>
<form id="form-rhf-demo" onSubmit={handleSearch}>
    {/* Contenedor flex que agrupa Input y Botón */}
    <div className="flex flex-col sm:flex-row items-start gap-2">
      
      {/* Contenedor del Input + Error (ocupa el espacio restante) */}
      <div className="w-full flex-1">
        <InputIU
          value={filters.identification}
          onChange={(e) => handleChange(e.target.value)}
          disabled={loading}
        />
        {errors.identification && (
          <p className="text-sm text-destructive mt-1">
            {errors.identification}
          </p>
        )}
      </div>

      {/* El botón ahora es hermano del contenedor del input */}
      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full h-11 sm:w-auto px-15"
      ><Search />
        Consultar
      </Button>
    </div>
  </form>
          </div>

        <Separator className="my-5" />

          {loading ? (
            <>
              <p className="animate-pulse text-center text-sm text-muted-foreground">
                Cargando solicitudes...
              </p>
              <SkeletonTable rows={5} className="w-full" />
            </>
          ) : (
            <DataTable data={applications} columns={getColumns()} />
          )}
        </div>
      </div>
    </>
  );
}
