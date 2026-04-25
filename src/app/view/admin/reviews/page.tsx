"use client";

import { useState } from "react";
import { applicationApi } from "@/modules/application/services/applicationApi";
import { Button } from "@/components/ui/button";
import { Application } from "@/modules/application/domain/types/application.types";
import  DataTable  from "@/components/molecules/DataTable"
import { columns } from "../reviews/columns"

export default function ReviewsPage() {
  const [loading, setLoading] = useState(false);
  const [dataTest, setDataTest] = useState<Application[]>([]);

  const handleFetch = async () => {
    try {
      setLoading(true);

      const data = await applicationApi.list();

      console.log("📦 RESULTADO:", data);
      setDataTest(data);

    } catch (error) {
      console.error("❌ ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pt-28 pb-8 md:px-6 md:pt-32">
      <div className="mx-auto w-full max-w-6xl space-y-4 rounded-4xl border p-8">
        <h1 className="text-center text-xl font-bold">Procesos de solicitud</h1>
        <DataTable data={dataTest} columns={columns} />
        {/* <DataTable /> */}
      </div>
    </div>
  );
}
