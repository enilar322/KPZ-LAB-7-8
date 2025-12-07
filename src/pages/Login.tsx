import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../features/auth/api";

export const Login = () => {
	const loginSchema = z.object({
		email: z.string().email("Invalid email address"),
		password: z.string().min(5, "Password must be at least 6 characters"),
	});

	const { mutate, isPending, isError, error } = useLogin();

	type LoginFormInputs = z.infer<typeof loginSchema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormInputs) =>
		mutate({ email: data.email, password: data.password });

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-sm mx-auto space-y-4"
		>
			<div className="space-y-1">
				<label htmlFor="email" className="text-sm">
					Email
				</label>
				<input
					id="email"
					type="email"
					placeholder="you@example.com"
					{...register("email")}
					className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
				/>
				{errors.email && (
					<p className="text-sm text-red-600">{errors.email.message}</p>
				)}
			</div>

			<div className="space-y-1">
				<label htmlFor="password" className="text-sm">
					Password
				</label>
				<input
					id="password"
					type="password"
					placeholder="••••••••"
					{...register("password")}
					className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
				/>
				{errors.password && (
					<p className="text-sm text-red-600">{errors.password.message}</p>
				)}
			</div>

			<button
				type="submit"
				disabled={isPending}
				className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-60"
			>
				{isPending ? " Loading" : "Submit"}
			</button>

			<p>{isError ? error.message : ""}</p>
		</form>
	);
};
