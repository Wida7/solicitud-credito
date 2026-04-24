import { RoughNotation } from "react-rough-notation";
import { validateStep1, validateStep2, validateStep3 } from "@/app/application-process/validationSteps";
import { FormItems } from "@/modules/application/domain/types/form.types";


type NavProps = {
  currentStepIndex: number;
  goTo: (index: number) => void;
  formData: FormItems;
};

const styles = { 
  currentStep: "text-primary md:scale-110",
  currentRough: "#09344a" 
}

const SideBar = ({ currentStepIndex, goTo, formData }: NavProps) => {

  // Funciones para manejar la navegación con validación en el sidebar
  const handleGoToStep2 = () => {
    if (validateStep1(formData)) {
      goTo(1);
    }
  };

  const handleGoToStep3 = () => {
    if (validateStep1(formData) && validateStep2(formData)) {
      goTo(2);
    }
  };

  const handleGoToStep4 = () => {
    if (
      validateStep1(formData) &&
      validateStep2(formData) &&
      validateStep3(formData)
    ) {
      goTo(3);
    }
  };

  return (
    <div className="absolute -top-20 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0">
      <nav className="h-full rounded-3xl border border-form-panel-border bg-surface px-4 py-5 text-foreground shadow-sm md:p-5">
        <ul className="flex justify-center gap-6 md:flex-col">
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-muted-foreground md:flex">
              PASO 1
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(0)}
              className={`text-sm ${
                currentStepIndex === 0 ? styles.currentStep : "text-muted-foreground"
              } cursor-pointer transition-opacity hover:opacity-70 md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 0}
                color={styles.currentRough}
              >
                Datos
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-muted-foreground md:flex">
              PASO 2
            </span>
            <button
              tabIndex={0}
              onClick={handleGoToStep2}
              className={`text-sm ${
                currentStepIndex === 1 ? styles.currentStep : "text-muted-foreground"
              } cursor-pointer transition-opacity hover:opacity-70 md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 1}
                color={styles.currentRough}
              >
                Monto y Plazo
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-muted-foreground md:flex">
              PASO 3
            </span>
            <button
              tabIndex={0}
              onClick={handleGoToStep3}
              className={`text-sm ${
                currentStepIndex === 2 ? styles.currentStep : "text-muted-foreground"
              } cursor-pointer transition-opacity hover:opacity-70 md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 2}
                color={styles.currentRough}
              >
                Ingresos
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-muted-foreground md:flex">
              PASO 4
            </span>
            <button
              tabIndex={0}
              onClick={handleGoToStep4}
              className={`text-sm ${
                currentStepIndex === 3 ? styles.currentStep : "text-muted-foreground"
              } cursor-pointer transition-opacity hover:opacity-70 md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 3}
                color={styles.currentRough}
              >
                Solicitar
              </RoughNotation>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
