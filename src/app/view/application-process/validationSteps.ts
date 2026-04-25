import { FormItems } from "@/modules/application/domain/types/form.types";

export function validateStep1(data: FormItems) {
  return (
    data.name.trim().length >= 3 &&
    /\S+@\S+\.\S+/.test(data.email) &&
    /^[0-9]{10}$/.test(data.phone) &&
    data.identification.trim().length > 0
  );
}

export function validateStep2(data: FormItems) {
  return data.monto > 0 && data.plazo > 0;
}

export function validateStep3(data: FormItems) {
  return data.ingresos > 0 && data.egresos >= 0 && data.occupation.trim().length > 0;
}

export function canGoNext(step: number, data: FormItems) {
  switch (step) {
    case 0:
      return validateStep1(data);
    case 1:
      return validateStep2(data);
    case 2:
      return validateStep3(data);
    default:
      return {};
  }
}