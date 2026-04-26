"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import {
	Application,
	ApplicationStatus,
} from "@/modules/application/domain/types/application.types";
import { useState } from "react";
import { validateApplicationField } from "@/modules/application/domain/validations/application.validator";
import { formatDateColombia } from "@/lib/utils/date";
import { SkeletonTable } from "../../ui/skeleton";
import { Button } from "../../ui/button";
import { LoaderCircle, Trash2 } from "lucide-react";

type FormViewApplicationPros = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: (data: Application) => void;
	data: Application | null;
	onDelete?: (id: string) => Promise<void>;
};

const FormViewApplication = ({
	open,
	onOpenChange,
	onConfirm,
	data,
	onDelete,
}: FormViewApplicationPros) => {
	const [formState, setFormState] = useState<Application | null>(null);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const STATUS_OPTIONS: ApplicationStatus[] = ["PENDIENTE", "APROBADO", "RECHAZADO"];
	const [loading, setLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const currentData = formState ?? data;
	const hasErrors = Object.values(errors).some((error) => error);

	const isLoadingData = !data;

	const handleChange = (field: Partial<Application>) => {

		const validation = validateApplicationField(field);
		setErrors((prev) => ({ ...prev, ...validation }));

		//console.log("Datos formState", formState);
		setFormState((prev) => ({
			...(prev ?? data!),
			...field,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    
    //console.log(">>> EJECUTANDO SUBMIT EN EL HIJO");
    //console.log("Datos actuales a enviar:", currentData);

		if (!currentData) {
			//console.log("NO DATA YET");
			return;
		}

		try {
			setLoading(true);
			onConfirm(currentData);
			onOpenChange(false);
		} catch (error) {
			console.error(error);
			toast.error("Error actualizando", {
				position: "top-center",
				className: "bg-primary text-primary-foreground font-semibold",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (!currentData?.id || !onDelete) return;

		try {
			setIsDeleting(true);

			await new Promise((res) => setTimeout(res, 2000));
			await onDelete(currentData.id);

			toast.success("Solicitud eliminada correctamente", {
				position: "top-center",
				className: "bg-primary text-primary-foreground font-semibold",
			});

			onOpenChange(false);
		} catch (error) {
			console.error(error);
			toast.error("Error eliminando", {
				position: "top-center",
				className: "bg-primary text-primary-foreground font-semibold",
			});
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-2xl text-center font-bold">
						Editar
					</AlertDialogTitle>
					<AlertDialogDescription className="text-center text-sm text-muted-foreground">
						Solo podra editar los campos permitidos
					</AlertDialogDescription>
				</AlertDialogHeader>

				<form  className="flex flex-col gap-2">
					{isLoadingData ? (
						<SkeletonTable rows={10} columns={1} className="h-auto" />
					) : (
						<>
							<fieldset className="grid grid-cols-[140px_1fr] gap-x gap-y-3 items-start">
								<label className="text-sm font-medium mt-2">Nombre</label>
								<div className="flex flex-col">
									<Input
										value={currentData?.name || ""}
										onChange={(e) => handleChange({ name: e.target.value })}
										disabled={loading}
									/>
									{errors.name && (
										<p className="text-sm text-center w-full text-destructive mt-1">
											{errors.name}
										</p>
									)}
								</div>

								<label className="text-sm font-medium mt-2">Email</label>
								<div className="flex flex-col">
									<Input
										value={currentData?.email || ""}
										onChange={(e) => handleChange({ email: e.target.value })}
										disabled={loading}
									/>
									{errors.email && (
										<p className="text-sm text-center w-full text-destructive mt-1">
											{errors.email}
										</p>
									)}
								</div>

								<label className="text-sm font-medium mt-2">Telefono</label>
								<div className="flex flex-col">
									<Input
										value={currentData?.phone || ""}
										onChange={(e) => handleChange({ phone: e.target.value })}
										disabled={loading}
									/>
									{errors.phone && (
										<p className="text-sm text-center w-full text-destructive mt-1">
											{errors.phone}
										</p>
									)}
								</div>

								<label className="text-sm font-medium mt-2">Identificacion</label>
								<div className="flex flex-col">
									<Input
										value={currentData?.identification || ""}
										onChange={(e) =>
											handleChange({ identification: e.target.value })
										}
										disabled={loading}
									/>
									{errors.identification && (
										<p className="text-sm text-destructive mt-1">
											{errors.identification}
										</p>
									)}
								</div>

								<label className="text-sm font-medium mt-2">Ocupacion</label>
								<div className="flex flex-col">
									<Input
										value={currentData?.occupation || ""}
										onChange={(e) =>
											handleChange({ occupation: e.target.value })
										}
										disabled
									/>
									{errors.occupation && (
										<p className="text-sm text-destructive mt-1">
											{errors.occupation}
										</p>
									)}
								</div>

								<label className="text-sm font-medium mt-2">Ingresos</label>
								<div className="flex flex-col">
									<Input
										value={currentData?.ingresos || 0}
										onChange={(e) =>
											handleChange({ ingresos: Number(e.target.value) || 0 })
										}
										disabled={loading}
									/>
									{errors.ingresos && (
										<p className="text-sm text-destructive mt-1">
											{errors.ingresos}
										</p>
									)}
								</div>

								<label className="text-sm font-medium mt-2">Egresos</label>
								<div className="flex flex-col">
									<Input
										value={currentData?.egresos || 0}
										onChange={(e) =>
											handleChange({ egresos: Number(e.target.value) || 0 })
										}
										disabled={loading}
									/>
									{errors.egresos && (
										<p className="text-sm text-destructive mt-1">
											{errors.egresos}
										</p>
									)}
								</div>

								<label className="text-sm font-medium mt-2">Monto</label>
								<div className="flex flex-col">
									<Input
										value={currentData?.monto || 0}
										onChange={(e) => {
											const raw = e.target.value.replace(/\D/g, "");
											handleChange({ monto: raw === "" ? 0 : Number(raw) });
										}}
										disabled={loading}
									/>
									{errors.monto && (
										<p className="text-sm text-destructive mt-1">{errors.monto}</p>
									)}
								</div>

								<label className="text-sm font-medium mt-2">Plazo</label>
								<Input value={currentData?.plazo || 0} disabled />

								<label className="text-sm font-medium mt-2">Cuota aprox</label>
								<div className="flex flex-col">
									<Input
										value={currentData?.cuotaAprox || 0}
										onChange={(e) => {
											const raw = e.target.value.replace(/\D/g, "");
											handleChange({ cuotaAprox: raw === "" ? 0 : Number(raw) });
										}}
										disabled={loading}
									/>
									{errors.cuotaAprox && (
										<p className="text-sm text-destructive mt-1">
											{errors.cuotaAprox}
										</p>
									)}
								</div>

								<label className="text-sm font-medium mt-2">Estado</label>
								<Select
									value={currentData?.status}
									onValueChange={(value) =>
										handleChange({ status: value as Application["status"] })
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Selecciona estado" />
									</SelectTrigger>

									<SelectContent>
										{STATUS_OPTIONS.map((status) => (
											<SelectItem key={status} value={status}>
												{status}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<label className="text-sm font-medium mt-2">Fecha</label>
								<Input
									value={
										currentData?.createdAt
											? formatDateColombia(currentData.createdAt)
											: ""
									}
									disabled
								/>
							</fieldset>
						</>
					)}
					<AlertDialogFooter>
						{onDelete && (
							<Button
								type="button"
								variant={"destructive"}
								onClick={handleDelete}
								disabled={isDeleting || loading}
							>
								{isDeleting ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
							</Button>
						)}
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							type="button"
							variant="default"
							disabled={hasErrors || loading || isLoadingData}
							onClick={handleSubmit}
						>
							Confirmar
						</AlertDialogAction>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default FormViewApplication;
