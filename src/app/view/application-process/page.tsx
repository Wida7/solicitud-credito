"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMultiplestepForm } from "@/hooks/useMultiplestepForm";
import { AnimatePresence } from "framer-motion";
import UserInfoForm from "@/components/formMultiStep/UserInfoForm";
import PlanForm from "@/components/formMultiStep/PlanForm";
import AddonsForm from "@/components/formMultiStep/AddonsForm";
import FinalStep from "@/components/formMultiStep/FinalStep";
import SuccessMessage from "@/components/formMultiStep/SuccessMessage";
import SideBar from "@/components/formMultiStep/SideBar";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { FormItems } from "@/modules/application/domain/types/form.types";
import { useAppDispatch } from "@/infrastructure/store/hooks";
import { canGoNext } from "./validationSteps";
import { toast } from "sonner";
import { createApplication } from "@/modules/application/store/applicationThunks";
import { applicationApi } from "@/modules/application/services/applicationApi";
import { CreateApplicationInput } from "@/modules/application/domain/types/application.types";
import { Trash2 } from "lucide-react"
import AbandonProcess from "@/components/formMultiStep/AbandonProcess";


const initialValues: FormItems = {
  name: "",
  email: "",
  phone: "",
  identificationType: "",
  identification: "",
  monto: 0,
  plazo: 0,
  cuotaAprox: 0,
  occupation: "",
  ingresos: 0,
  egresos: 0,
  yearly: false,
};

export default function Home() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(4);
  const [showAbandonDialog, setShowAbandonDialog] = useState(false);
  const dispatch = useAppDispatch();

  const handleNext = async () => {
    //console.log("Validando paso", currentStepIndex);
    if (!canGoNext(currentStepIndex, formData)) {
      toast.warning("Revisa los datos ingresados", {
        description: "No puedes avanzar al siguiente paso, revisa los datos ingresados",
        position: "top-center",
      })
      return; // bloquea avance
    }

    const payload: CreateApplicationInput = {
      name: formData.name,
      email: formData.email,
      monto: formData.monto,
      plazo: formData.plazo,
      identificationType: formData.identificationType,
      identification: formData.identification,
      phone: formData.phone,
      cuotaAprox: formData.cuotaAprox,
      occupation: formData.occupation,
      ingresos: formData.ingresos,
      egresos: formData.egresos,
      yearly: formData.yearly,

      //campos que NO vienen del form
      status: "DRAFT",
    };


    if (isLastStep) {
      try {
        await applicationApi.create(payload);
        await dispatch(createApplication(formData)).unwrap();
        toast.success("Solicitud enviada correctamente", {
          position: "top-center",
          className: "bg-primary text-primary-foreground font-semibold",
        });
        nextStep();

      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Intenta nuevamente";

        console.error(error);
        toast.error("Error al enviar la solicitud", {
          description: errorMessage,
        });
      }
      return;
    }

    nextStep();
  };


  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const { name, email, phone } = fieldToUpdate;
    console.log("Validando campo:", fieldToUpdate);
    const constansValidation = {
      name: {
        minLength: 3,
        maxLength: 40,
      },
      monto: {
        min: 500000,
      },
    }

    if (name && name.trim().length < constansValidation.name.minLength) {
      setErrors((prevState) => ({
        ...prevState,
        name: `Nombre debe tener al menos ${constansValidation.name.minLength} caracteres`,
      }));
    } else if (name && name.trim().length > constansValidation.name.maxLength) {
      setErrors((prevState) => ({
        ...prevState,
        name: `Nombre no debe tener más de ${constansValidation.name.maxLength} caracteres`,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Por favor, introduce una dirección de correo electrónico válida",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      setErrors((prevState) => ({
        ...prevState,
        phone: "Por favor, introduce un número de teléfono válido de 10 dígitos",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        phone: "",
      }));
    }
    //console.log("Datos del form", formData);
    
    //console.log(fieldToUpdate.monto, constansValidation.monto.min)
    if (fieldToUpdate.monto !== undefined && fieldToUpdate.monto < constansValidation.monto.min) {
      setErrors((prevState) => ({
        ...prevState,
        monto: `El monto no puede ser menor a:  ${formatCurrency(constansValidation.monto.min)}`,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        monto: "",
      }));
    }

    setFormData(prev => ({ ...prev, ...fieldToUpdate }));
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    handleNext();
  };

  const handleConfirmAbandon = () => {
    setFormData(initialValues);
    setErrors({});
    setShowAbandonDialog(false);
    goTo(0);

    toast("Proceso abandonado", {
      description: "La solicitud fue eliminada.",
      position: "top-center",
    });
  };

  return (
    <>
      <AbandonProcess
        open={showAbandonDialog}
        onOpenChange={setShowAbandonDialog}
        onConfirm={handleConfirmAbandon}
        formSnapshot={formData}
        stepAbandon={currentStepIndex}
      />
      <div
        className={`relative m-1 flex w-full max-w-4xl flex-col rounded-[28px] border border-form-panel-border bg-form-panel p-4 text-foreground shadow-lg md:flex-row md:justify-between ${
    currentStepIndex === 1 ? "md:min-h-125" : "md:min-h-112"
  }`}
      >
        {!showSuccessMsg ? (
          <SideBar currentStepIndex={currentStepIndex} goTo={goTo} formData={formData} />
        ) : (
          ""
        )}
        <main
          className={`${showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"} md:mr-[4%]`}
        >
          {showSuccessMsg ? (
            <AnimatePresence mode="wait">
              <SuccessMessage />
            </AnimatePresence>
          ) : (
            <form
              onSubmit={handleOnSubmit}
              className="w-full flex flex-col justify-between h-full"
            >
              <AnimatePresence mode="wait">
                {currentStepIndex === 0 && (
                  <UserInfoForm
                    key="step1"
                    {...formData}
                    updateForm={updateForm}
                    errors={errors}
                  />
                )}
                {currentStepIndex === 1 && (
                  <PlanForm key="step2" {...formData} updateForm={updateForm} errors={errors} />
                )}
                {currentStepIndex === 2 && (
                  <AddonsForm key="step3" {...formData} updateForm={updateForm} />
                )}
                {currentStepIndex === 3 && (
                  <FinalStep key="step4" {...formData} goTo={goTo} />
                )}
              </AnimatePresence>
              <div className="w-full items-center flex justify-between mt-2">
                <div className="">
                  <Button
                    onClick={previousStep}
                    type="button"
                    variant="ghost"
                    className={`${isFirstStep
                      ? "invisible"
                      : "visible p-0 text-muted-foreground hover:text-foreground"
                      } px-4`}
                  >
                    Anterior
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition flex">
                    <Button
                      type="button"
                      variant="destructive"
                      className="relative mr-2"
                      onClick={() => setShowAbandonDialog(true)}
                    >
                      <Trash2 />
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      className="relative"
                    >
                      {isLastStep ? "Confirmar" : "Siguiente"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </>
  );
}
