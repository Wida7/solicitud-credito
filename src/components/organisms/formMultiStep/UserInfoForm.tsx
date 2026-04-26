import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItems } from "@/modules/application/domain/types/form.types";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const DatosForm = ({
  name,
  email,
  phone,
  identification,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Información personal "
      description="Por favor indicanos tús datos personales"
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nombre y apellidos</Label>
          <Input
            autoFocus
            type="text"
            name="name"
            id="name"
            placeholder="Escribe tú nombre"
            value={name}
            onChange={(e) => updateForm({ name: e.target.value })}
            className="w-full"
            required
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Escribe tú correo electrónico"
            value={email}
            className="w-full"
            onChange={(e) => updateForm({ email: e.target.value })}
            required
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Número de teléfono</Label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Escribe tú número de teléfono"
            value={phone}
            className="w-full"
            onChange={(e) => updateForm({ phone: e.target.value })}
            required
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="identification">Identificación</Label>
          <Input
            type="tel"
            name="identification"
            id="identification"
            placeholder="Escribe tú número de identificación"
            value={identification}
            className="w-full"
            onChange={(e) => updateForm({ identification: e.target.value })}
            required
          />
          {errors.identification && (
            <p className="text-sm text-destructive">{errors.identification}</p>
          )}
        </div>        
      </div>
    </FormWrapper>
  );
};

export default DatosForm;
