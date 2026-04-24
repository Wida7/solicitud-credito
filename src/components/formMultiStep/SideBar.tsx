import { RoughNotation } from "react-rough-notation";
import { canGoNext, validateStep1, validateStep2, validateStep3 } from "@/app/application-process/validationSteps";
import { FormItems } from "@/modules/application/domain/types/form.types";


type NavProps = {
  currentStepIndex: number;
  goTo: (index: number) => void;
  formData: FormItems;
};

const styles = { 
  currentStep: "text-secondary md:scale-120",
  currentRough: "#09344a" 
}

const SideBar = ({ currentStepIndex, goTo, formData }: NavProps) => {
  return (
    <div className="absolute -top-20 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0">
      <nav className="py-5 text-slate-200 bg-slate-100 h-full rounded-md border border-neutral-700 md:p-5">
        <ul className="flex justify-center gap-6 md:flex-col">
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              PASO 1
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(0)}
              className={`text-sm ${
                currentStepIndex === 0 ? styles.currentStep : "text-primary"
              } md:text-base cursor-pointer hover:opacity-50`}
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
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              PASO 2
            </span>
            <button
              tabIndex={0}
              onClick={() => { (validateStep1(formData)) && goTo(1); }}
              className={`text-sm ${
                currentStepIndex === 1 ? styles.currentStep : "text-primary"
              } md:text-base cursor-pointer hover:opacity-50`}
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
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              PASO 3
            </span>
            <button
              tabIndex={0}
              onClick={() => { (validateStep1(formData)) && validateStep2(formData) && goTo(2); }}
              className={`text-sm ${
                currentStepIndex === 2 ? styles.currentStep : "text-primary"
              } md:text-base cursor-pointer hover:opacity-50`}
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
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              PASO 4
            </span>
            <button
              tabIndex={0}
              onClick={() => { (validateStep1(formData)) && validateStep2(formData) && validateStep3(formData) && goTo(3); }}
              className={`text-sm ${
                currentStepIndex === 3 ? styles.currentStep : "text-primary"
              } md:text-base cursor-pointer hover:opacity-50`}
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
