import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateMembership } from "../api";

const SERVICES = [
	{ id: 1, name: "Personal Training" },
	{ id: 2, name: "Massage Therapy" },
	{ id: 3, name: "Sauna Access" },
	{ id: 4, name: "Pool Access" },
	{ id: 5, name: "Group Fitness Classes" },
	{ id: 6, name: "Yoga Classes" },
	{ id: 7, name: "Pilates Classes" },
	{ id: 8, name: "Nutrition Consultation" },
] as const;

const schema = z.object({
	name: z.string().min(3, "Min 3 chars"),
	price: z.number("Must be a number").positive(),
	duration_months: z.number("Must be a number").int().min(1),
	status: z.string().nullable().optional(),
	serviceIds: z.array(z.number()).default([]).optional(),
});
type FormInputs = z.infer<typeof schema>;

export const MembershipNewPage = () => {
	const { mutate, isPending, isError, error } = useCreateMembership();

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			price: 0,
			duration_months: 1,
			serviceIds: [],
			status: null,
		},
	});

	const onSubmit = (data: FormInputs) => {
		mutate({
			name: data.name,
			duration_months: data.duration_months,
			price: data.price,
			status: data.status ?? null,
			serviceIds: data.serviceIds,
		});
	};

	return (
		<div className="max-w-lg mx-auto p-6">
			<h1 className="text-2xl font-semibold mb-4">Create membership</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label className="block text-sm mb-1">Name</label>
					<input
						type="text"
						placeholder="Gold"
						{...register("name")}
						className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
					/>
					{errors.name && (
						<p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm mb-1">Price</label>
					<input
						type="number"
						step="0.01"
						placeholder="49.99"
						{...register("price", { valueAsNumber: true })}
						className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
					/>
					{errors.price && (
						<p className="text-sm text-red-600 mt-1">{errors.price.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm mb-1">Duration (months)</label>
					<input
						type="number"
						min={1}
						placeholder="12"
						{...register("duration_months", { valueAsNumber: true })}
						className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
					/>
					{errors.duration_months && (
						<p className="text-sm text-red-600 mt-1">
							{errors.duration_months.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm mb-1">Status (optional)</label>
					<select
						{...register("status")}
						className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
					>
						<option value="">—</option>
						<option value="active">active</option>
						<option value="inactive">inactive</option>
					</select>
					{errors.status && (
						<p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm mb-2">Services</label>
					<div className="grid grid-cols-2 gap-2">
						<Controller
							control={control}
							name="serviceIds"
							render={({ field }) => (
								<div className="grid grid-cols-2 gap-2">
									{SERVICES.map((s) => {
										const checked = field.value?.includes(s.id) ?? false;

										return (
											<label
												key={s.id}
												className="flex items-center gap-2 text-sm"
											>
												<input
													type="checkbox"
													checked={checked}
													onChange={() => {
														if (checked) {
															field.onChange(
																field?.value?.filter((v: any) => v !== s.id)
															);
														} else {
															field.onChange([...field.value!, s.id]);
														}
													}}
												/>
												{s.name}
											</label>
										);
									})}
								</div>
							)}
						/>
					</div>
					{errors.serviceIds && (
						<p className="text-sm text-red-600 mt-1">
							{errors.serviceIds.message as string}
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={isPending}
					className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-60"
				>
					{isPending ? "Creating..." : "Create"}
				</button>

				{isError && (
					<p className="text-sm text-red-600 mt-2">
						{error instanceof Error ? error.message : "Failed to create"}
					</p>
				)}
			</form>
		</div>
	);
};
