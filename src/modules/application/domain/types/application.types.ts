export interface Application {
    id: string;
    name: string;
    phone?: string;
    email: string;
    monto: number;
    plazo: number;
    status: "DRAFT" | "APPROVED" | "REJECTED";
    createdAt: string;
}

export type CreateApplicationInput = {
    name: string;
    identification: string;
    email: string;
    phone: string;
    monto: number;
    plazo: number;
    cuotaAprox?: number;
    occupation: string;
    ingresos: number;
    egresos: number;
    status: "DRAFT" | "APPROVED" | "REJECTED";
    createdAt: string;
    cuota?: number;
    yearly?: boolean;
};