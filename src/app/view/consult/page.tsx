"use client";

import { useState } from "react";
import DataTable from "@/components/molecules/DataTable";
import { Application } from "@/modules/application/domain/types/application.types";
import { getColumns } from "./columns";
import { SkeletonTable } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input as InputIU } from "@/components/ui/input";
import { validateApplicationField } from "@/modules/application/domain/validations/application.validator";

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

  return (
    <>
      <div className="min-h-screen px-4 pt-28 pb-8 md:px-6 md:pt-32">
        <div className="mx-auto w-full max-w-6xl space-y-4 rounded-4xl border p-8">
          <h1 className="text-center text-xl font-bold">Procesos de solicitud</h1>
          <div>
            <label className="text-sm font-medium mt-2">Identificacion</label>
            <div className="flex flex-col">
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
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </div>


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
