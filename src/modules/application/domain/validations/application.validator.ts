import { FormItems } from "../types/form.types";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export function validateApplicationField(
  field: Partial<FormItems>
): Record<string, string> {
  const errors: Record<string, string> = {};

  const constants = {
    name: { minLength: 3, maxLength: 40 },
    monto: { min: 500000, max: 999999999 },
  };

  if (field.name !== undefined) {
    const value = field.name.trim();

    if (value.length < constants.name.minLength) {
      errors.name = `Nombre debe tener al menos ${constants.name.minLength} caracteres`;
    } else if (value.length > constants.name.maxLength) {
      errors.name = `Nombre no debe tener más de ${constants.name.maxLength} caracteres`;
    } else {
      errors.name = "";
    }
  }

  if (field.email !== undefined) {
    if (!/\S+@\S+\.\S+/.test(field.email)) {
      errors.email = "Correo inválido";
    } else {
      errors.email = "";
    }
  }

  if (field.phone !== undefined) {
    if (!/^[0-9]{10}$/.test(field.phone)) {
      errors.phone = "Teléfono inválido";
    } else {
      errors.phone = "";
    }
  }

  if (field.monto !== undefined) {
    if (field.monto < constants.monto.min) {
      errors.monto = `El monto no puede ser menor a ${formatCurrency(constants.monto.min)}`;
    } else if (field.monto > constants.monto.max) {
      errors.monto = `El monto no puede ser mayor a ${formatCurrency(constants.monto.max)}`;
    } else {
      errors.monto = "";
    }
  }


if (field.identification !== undefined) {
  const value = field.identification.trim();

  if (!/^[0-9]+$/.test(value)) {
    errors.identification = "Solo se permiten números";
  } else if (value.length < 5) {
    errors.identification = "Debe tener al menos 5 caracteres";
  } else {
    errors.identification = "";
  }
}

  console.log("Validator ", errors);

  return errors;
}