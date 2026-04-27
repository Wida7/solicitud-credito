import { FormItems } from "@/core/domain/types/form.types";
//import { Checkbox } from "@/frontend/components/ui/checkbox";
import FormWrapper from "./FormWrapper";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/frontend/components/ui/select"
import { OCCUPATIONS } from "@/frontend/constants/occupations"
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const FinancialForm = ({ occupation, ingresos, egresos, updateForm }: stepProps) => {

  const occupationOptions = OCCUPATIONS.map((occupation) => ({
    label: occupation.label,
    value: occupation.value,
  }));

  return (
    <FormWrapper
      title="Información financiera"
      description="Indica tu información financiera y tu ocupación actual"
    >
      <div className="flex flex-col gap-3">
        <Label htmlFor="ocupation">Ocupación</Label>
        <Select
          value={occupation}
          onValueChange={(value) => {
            updateForm({ occupation: value });
          }}
        >
          <SelectTrigger className="w-45" autoFocus>
            <SelectValue placeholder="Indique su ocupación" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {occupationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label className="mt-4 text-foreground" htmlFor="ingresos">Ingresos mensuales: ${ingresos.toLocaleString()}</Label>
        <Input
          inputMode="numeric"
          name="monto"
          id="monto"
          placeholder="Ingresa el monto que deseas solicitar"
          value={ingresos}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            updateForm({ ingresos: raw === "" ? 0 : Number(raw) });
          }}
          className="mt-2 w-full"
          required
        />
        <Label className="mt-4 text-foreground" htmlFor="egresos">Egresos mensuales: ${egresos.toLocaleString()}</Label>
        <Input
          inputMode="numeric"
          name="monto"
          id="monto"
          placeholder="Ingresa el monto que deseas solicitar"
          value={egresos}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            updateForm({ egresos: raw === "" ? 0 : Number(raw) });
          }}
          className="mt-2 w-full"
          required
        />
      </div>
    </FormWrapper>
  );
};

export default FinancialForm;
