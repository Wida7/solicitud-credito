"use client";

import { useMemo, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import FormWrapper from "./FormWrapper";
import { FormItems } from "@/app/application-process/page";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { creditSimulator } from "@/modules/application/services/creditSimulator";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Record<string, string>;
};

type Plazo = 0 | 1 | 3 | 5 | 6 | 9;

const MontoYPlazoForm = ({ updateForm, plazo, monto, yearly, cuotaAprox, errors }: stepProps) => {
  const [yearlyUpdated, setYearlyUpdated] = useState(yearly);
  const [planSelected, setPlanSelected] = useState<Plazo>(plazo);

  const planes = useMemo(() => {
    return creditSimulator(monto, yearly);
  }, [monto, yearly]);

  const handleCheckedChange = (yearlyUpdated: boolean) => {
    setYearlyUpdated((prev) => !prev);
    updateForm({ yearly: yearlyUpdated });
  };

  const handleValueChange = (plazoSelected: Plazo) => {
    if (plazoSelected) {
      setPlanSelected(plazoSelected);
      const selectedPlan = planes.find(plan => plan.plazoMeses === plazoSelected);
      updateForm({ 
        plazo: plazoSelected,
        cuotaAprox: selectedPlan?.cuota || 0
      });
    }
  };


  return (
    <FormWrapper
      title="Monto y plazos"
      description="Indica tu monto solicitado y el plazo en el que deseas pagar"
    >
      <div className="w-full items-center justify-center bg-slate-800 p-3 rounded-md">
        <Label className="text-slate-300" htmlFor="monto">Monto solicitado: ${monto.toLocaleString()}</Label>
        <Input
          autoFocus
          inputMode="numeric"
          name="monto"
          id="monto"
          placeholder="Ingresa el monto que deseas solicitar"
          value={monto}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            updateForm({ monto: raw === "" ? 0 : Number(raw) });
          }}
          className="w-full placeholder:text-slate-600 my-2"
          required
        />
        {errors.monto && <p className="text-red-500 text-sm">{errors.monto}</p>}
      </div>

      <div className="w-full items-center justify-center bg-slate-800 p-3 rounded-md">
        <div className="flex items-center gap-6 w-full justify-center mb-4">
          <Label
            htmlFor="airplane-mode"
            className={yearly ? "text-blue-800" : "text-blue-500 scale-120"}
          >
            Mensual
          </Label>
          <Switch
            id="airplane-mode"
            className="data-[state=checked]:bg-blue-900 data-[state=unchecked]:bg-blue-900 border-slate-600"
            checked={yearlyUpdated}
            onCheckedChange={handleCheckedChange}
          />
          <Label
            htmlFor="airplane-mode"
            className={yearly ? "text-blue-500 scale-120" : "text-blue-800"}
          >
            Anual
          </Label>
        </div>
        <ToggleGroup.Root
          type="single"
          value={planSelected}
          onValueChange={handleValueChange}
          className="flex flex-col gap-3 md:flex-row md:justify-between"
        >
          {planes.map((plan) => (
            <ToggleGroup.Item
              key={plan.plazoMeses}
              value={plan.plazoMeses}
              className="border border-blue-800 p-3 h-24 rounded-md data-[state=on]:border-blue-500 data-[state=on]:bg-neutral-900 cursor-pointer hover:opacity-50"
            >
              <div className="flex flex-col">
                <p className="text-white font-semibold">{plan.label}</p>

                <span className="text-[#b9e5ff] text-sm">
                  {plan.descuentoTexto}
                </span>

                <span className="text-[#b9e5ff] text-sm">
                  Cuota: {formatCurrency(plan.cuota)}
                </span>
              </div>
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
    </FormWrapper>
  );
};

export default MontoYPlazoForm;
