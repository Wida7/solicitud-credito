"use client";

import FormWrapper from "./FormWrapper";
import { FormItems } from "@/modules/application/domain/types/form.types";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import Image from "next/image";
import prestamo from "../../../public/assets/prestamo.png";
import calendario from "../../../public/assets/calendario.png";

type StepProps = FormItems & {
  goTo: (index: number) => void;
};

const FinalStep = ({ plazo, monto, cuotaAprox, goTo }: StepProps) => {
  const plazoNumber = Number(plazo);

  return (
    <FormWrapper
      title="Solicitar"
      description="Revisa tu información antes de enviar tu solicitud"
    >
      <div className="">
        <div className="form-panel mt-2 p-4">
          <div className="flex justify-between items-center">
            <div className="">
              <h4 className="font-semibold text-foreground md:text-lg">
                {`Monto: ${formatCurrency(monto)}`}
              </h4>
              <button
                onClick={() => goTo(0)}
                className="text-sm text-secondary transition-opacity hover:opacity-80"
              >
                Cambiar monto
              </button>
            </div>
            <Image src={prestamo} alt="prestamo" width="40" height="40" />
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <h4 className="font-semibold text-foreground md:text-lg">
                {`Plazo: ${plazo} ${plazoNumber === 1 ? "mes" : "meses"}`}
              </h4>
              <button
                onClick={() => goTo(0)}
                className="text-sm text-secondary transition-opacity hover:opacity-80"
              >
                Cambiar plazo
              </button>
            </div>
            <Image src={calendario} alt="calendario" width="40" height="40" />
          </div>
          
            <div
              className="flex justify-between items-center my-2"
              key="cuotaAprox"
            >
              <p className="text-muted-foreground">Valor cuota aproximada:</p>
              <p className="font-semibold text-foreground">{formatCurrency(cuotaAprox ?? 0)}</p>
            </div>
        </div>

      </div>
    </FormWrapper>
  );
};

export default FinalStep;
