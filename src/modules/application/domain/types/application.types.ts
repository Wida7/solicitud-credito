export interface Application {
    name: string;
    identification: string;
    email: string;
    /* phone: string; */
    monto: number;
    plazo: number;
    cuota?: number;
    cuotaAprox?: number;
    /* occupation: string;
    ingresos: number;
    egresos: number; */
    status: "DRAFT" | "APPROVED" | "REJECTED";
}

export type CreateApplicationInput = {
    name: string;
    identification: string;
    email: string;
    phone: string;
    monto: number;
    plazo: number;
    cuota?: number;
    cuotaAprox?: number;
    occupation: string;
    ingresos: number;
    egresos: number;
    status: "DRAFT" | "APPROVED" | "REJECTED";
    createdAt: string;
};