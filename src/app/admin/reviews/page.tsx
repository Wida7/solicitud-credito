"use client";

import { useState } from "react";
import { applicationApi } from "@/modules/application/services/applicationApi";
import { Button } from "@/components/ui/button";

export default function ReviewsPage() {
  const [loading, setLoading] = useState(false);
  const [dataTest, setDataTest] = useState(null);

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
    <div className="p-6 space-y-4 flex flex-col items-center h-screen justify-center">
      <h1 className="text-xl font-bold align-center">Admin Reviews</h1>

      <Button
        onClick={handleFetch}
        disabled={loading}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Consultando..." : "Consultar solicitudes"}
      </Button>

      {dataTest && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Resultado:</h2>
          <pre className="bg-muted p-4 rounded-md overflow-auto">
            {JSON.stringify(dataTest, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}