import { FormItems } from "@/modules/application/domain/types/form.types";
//import { Checkbox } from "@/components/ui/checkbox";
import FormWrapper from "./FormWrapper";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { OCCUPATIONS } from "@/modules/application/constants/occupations"
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const AddonsForm = ({ yearly, occupation, ingresos, egresos, updateForm }: stepProps) => {

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
          <SelectTrigger className="w-45">
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

        <Label className="text-primary mt-4" htmlFor="monto">Ingresos mensuales: ${ingresos.toLocaleString()}</Label>
        <Input
          autoFocus
          inputMode="numeric"
          name="monto"
          id="monto"
          placeholder="Ingresa el monto que deseas solicitar"
          value={ingresos}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            updateForm({ ingresos: raw === "" ? 0 : Number(raw) });
          }}
          className="w-full placeholder:text-slate-600 mt-2"
          required
        />
        <Label className="text-primary mt-4" htmlFor="monto">Egresos mensuales: ${egresos.toLocaleString()}</Label>
        <Input
          autoFocus
          inputMode="numeric"
          name="monto"
          id="monto"
          placeholder="Ingresa el monto que deseas solicitar"
          value={egresos}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            updateForm({ egresos: raw === "" ? 0 : Number(raw) });
          }}
          className="w-full placeholder:text-slate-600 mt-2"
          required
        />
      </div>
    </FormWrapper>
  );
};

export default AddonsForm;
