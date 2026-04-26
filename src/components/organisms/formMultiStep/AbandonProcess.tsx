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
import { useId, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Input } from "../../ui/input";
import { FormItems } from "@/modules/application/domain/types/form.types";
import { AbandonApplication } from "@/modules/abandon/domain/types/abandon.types";
import { AbandonItems } from "@/modules/abandon/domain/types/form.types";
import { abandonApi } from "@/modules/abandon/services/abandonApi";
import { toast } from "sonner";

type AbandonProcessProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: (data: AbandonItems) => void;
	formSnapshot: FormItems;
	stepAbandon: number;
};

const AbandonProcess = ({
	open,
	onOpenChange,
	onConfirm,
	formSnapshot,
	stepAbandon,
}: AbandonProcessProps) => {
	const id = useId();
	const [rating, setRating] = useState<AbandonItems["rating"]>("");
	const [message, setMessage] = useState<AbandonItems["message"]>("");

	const isRatingValid = rating.trim() !== "";
	const isMessageValid = message.trim().length > 0;

	const isDisabled = !isRatingValid || !isMessageValid;

	const ratings = [
		{ value: "1", label: "Angry", icon: "😡" },
		{ value: "2", label: "Sad", icon: "🙁" },
		{ value: "3", label: "Neutral", icon: "🙂" },
		{ value: "4", label: "Happy", icon: "😁" },
		{ value: "5", label: "Laughing", icon: "🤩" },
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!rating.trim() || !message.trim()) {
			toast.warning("Completa la calificacion y el motivo del abandono", { position: "top-center" });
			return;
		}

		const data: AbandonItems = {
			rating,
			message,
			formSnapshot,
			stepAbandon,
		};

		const payload: AbandonApplication = {
			rating,
			message,
			stepAbandon,
			formSnapshot: formSnapshot,
		};

		await abandonApi.create(payload);

		console.log("DATA:", data);

		onConfirm(data);
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-2xl text-center font-bold">
						¿Deseas abandonar el proceso?
					</AlertDialogTitle>
					<AlertDialogDescription className="text-center text-sm text-muted-foreground">
						Se perderán los datos ingresados si decides salir ahora.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<fieldset className="space-y-4">
						<legend className="text-foreground text-sm leading-none font-medium sm:text-left text-center">
							Para poder continuar, por favor indicanos ¿Cuál es tu experiencia
							con el proceso de solicitud de crédito y motivo del abandono?
						</legend>
						<RadioGroup
							className={`${!isRatingValid ? " border-2 border-red-300 animate-pulse shadow-[0_0_10px_red] focus:border-red-300 focus-visible:border-red-200 " : " "} flex gap justify-center justify-self-center w-fit rounded-4xl px-3 py-0.5`}
							defaultValue="5"
							value={rating}
							onValueChange={setRating}
						>
							{ratings.map((rating) => (
								<label
									key={`${id}-${rating.value}`}
									className="border-input relative flex size-9 cursor-pointer flex-col items-center justify-center rounded-full border text-center text-xl shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:border-sky-600 has-focus-visible:ring-[3px] has-focus-visible:ring-sky-600/50 has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-[state=checked]:border-sky-600 has-data-[state=checked]:bg-sky-600/10 dark:has-focus-visible:border-sky-400 dark:has-focus-visible:ring-sky-600/50 dark:has-data-[state=checked]:border-sky-400 dark:has-data-[state=checked]:bg-sky-400/10"
								>
									<RadioGroupItem
										id={`${id}-${rating.value}`}
										value={rating.value}
										className="sr-only after:absolute after:inset-0"
									/>
									<p className="text-xl mb-3">{rating.icon}</p>
								</label>
							))}
						</RadioGroup>
					</fieldset>
					<div className="grid grow gap-3">
						<Input
							placeholder="Escribe motivo del abandono"
							className={`${!isMessageValid ? "border-2 border-red-300 animate-pulse shadow-[0_0_10px_red] focus:border-red-300 focus-visible:border-red-200" : ""}`}
							id="message"
							value={message}
							required
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							type="submit"
							variant="destructive"
							disabled={isDisabled}
						>
							Abandonar
						</AlertDialogAction>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AbandonProcess;
