"use client";

import { useMemo, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import FormWrapper from "./FormWrapper";
import { FormItems } from "@/modules/application/domain/types/form.types";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { creditSimulator } from "@/modules/application/services/creditSimulator";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Record<string, string>;
};

type Plazo = 0 | 1 | 3 | 5 | 6 | 9;

const TermsForm = ({ updateForm, plazo, monto, yearly, errors }: stepProps) => {
  const [yearlyUpdated, setYearlyUpdated] = useState(yearly);
  const [plazoSelected, setPlazoSelected] = useState<Plazo>(plazo);

  const plazos = useMemo(() => {
    return creditSimulator(monto, yearly);
  }, [monto, yearly]);

  const handleCheckedChange = (yearlyUpdated: boolean) => {
    setYearlyUpdated((prev) => !prev);
    updateForm({ yearly: yearlyUpdated });
  };

  const handleValueChange = (value: string) => {
    if (!value) return;

    const plazoNumber = Number(value) as Plazo;

    setPlazoSelected(plazoNumber);

    const selectedPlan = plazos.find(
      (p) => p.plazoMeses === plazoNumber
    );

    updateForm({
      plazo: plazoNumber,
      cuotaAprox: selectedPlan?.cuota || 0,
    });
  };

  return (
    <FormWrapper
      title="Monto y plazos"
      description="Indica tu monto solicitado y el plazo en el que deseas pagar"
    >
      <div className="form-panel w-full items-center justify-center p-4">
        <Label className="text-foreground" htmlFor="monto">Monto solicitado: ${monto.toLocaleString()}</Label>
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
          className="my-2 w-full"
          required
        />
        {errors.monto && <p className="text-sm text-destructive">{errors.monto}</p>}
      </div>

      <div className="form-panel w-full items-center justify-center p-4">
        <div className="flex items-center gap-6 w-full justify-center mb-4">
          <Label
            htmlFor="airplane-mode"
            className={yearly ? "text-muted-foreground" : "scale-120 text-primary"}
          >
            Mensual
          </Label>
          <Switch
            id="airplane-mode"
            checked={yearlyUpdated}
            onCheckedChange={handleCheckedChange}
          />
          <Label
            htmlFor="airplane-mode"
            className={yearly ? "scale-120 text-primary" : "text-muted-foreground"}
          >
            Anual
          </Label>
        </div>
        <ToggleGroup.Root
          type="single"
          value={String(plazoSelected)}
          onValueChange={handleValueChange}
          className="flex flex-col gap-3 md:flex-row md:justify-between"
        >
          {plazos.map((plazo) => (
            <ToggleGroup.Item
              key={plazo.plazoMeses}
              value={String(plazo.plazoMeses)}
              className="h-fit cursor-pointer rounded-2xl border border-form-panel-border bg-surface p-4 text-left transition-all hover:border-primary/45 hover:bg-primary/4 data-[state=on]:border-primary data-[state=on]:bg-primary/7 data-[state=on]:shadow-sm"
            >
              <div className="flex flex-col">
                <p className="font-semibold text-foreground">{plazo.label}</p>

                <span className="text-sm text-secondary">
                  {plazo.descuentoTexto}
                </span>

                <span className="text-sm text-muted-foreground">
                  Cuota: {formatCurrency(plazo.cuota)}
                </span>
              </div>
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
    </FormWrapper>
  );
};

export default TermsForm;
