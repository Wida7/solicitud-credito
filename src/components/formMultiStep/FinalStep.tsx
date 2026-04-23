"use client";

import { useState, useEffect } from "react";
import FormWrapper from "./FormWrapper";
import { Separator } from "@/components/ui/separator";
import { FormItems } from "@/app/application-process/page";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import Image from "next/image";
import prestamo from "../../../public/assets/prestamo.png";
import calendario from "../../../public/assets/calendario.png";

type StepProps = FormItems & {
  goTo: (index: number) => void;
};

const FinalStep = ({ yearly, plazo, monto, addOns, cuotaAprox, goTo }: StepProps) => {
  let planPrice = 0;
  switch (plazo) {
    case 1:
      planPrice = 9;
      break;
    case 3:
      planPrice = 12;
      break;
    case 5:
      planPrice = 15;
      break;
    default:
      planPrice = 0;
      break;
  }

  const filteredAddOns = addOns.filter((addOn) => addOn.checked === true);

  const totalAddOnsPrice = filteredAddOns?.reduce(
    (acc, obj) => acc + obj.price,
    0
  );
  console.log(totalAddOnsPrice);

  return (
    <FormWrapper
      title="Solicitar"
      description="Revisa tu información antes de enviar tu solicitud"
    >
      <div className="">
        <div className="bg-neutral-900 p-4 mt-2 rounded-md border border-neutral-700">
          <div className="flex justify-between items-center">
            <div className="">
              <h4 className="font-semibold text-white md:text-lg">
                {`Monto: ${formatCurrency(monto)}`}
              </h4>
              <button
                onClick={() => goTo(0)}
                className="text-[#6fe79f] text-sm"
              >
                Cambiar monto
              </button>
            </div>
            <Image src={prestamo} alt="prestamo" width="40" height="40" />
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <h4 className="font-semibold text-white md:text-lg">
                {`Plazo: ${plazo} ${plazo === 1 ? "mes" : "meses"}${yearly ? " (anual)" : ""}`}
              </h4>
              <button
                onClick={() => goTo(0)}
                className="text-[#6fe79f] text-sm"
              >
                Cambiar plazo
              </button>
            </div>
            <Image src={calendario} alt="calendario" width="40" height="40" />
          </div>
          {filteredAddOns.length > 0 && <Separator className="my-4" />}
          {filteredAddOns?.map((addOn) => (
            <div
              className="flex justify-between items-center my-2"
              key={addOn.id}
            >
              <p className="text-neutral-400">Valor cuota aproximada:</p>
              <p className="">{formatCurrency(cuotaAprox ?? 0)}</p>
            </div>
          ))}
        </div>

      </div>
    </FormWrapper>
  );
};

export default FinalStep;
