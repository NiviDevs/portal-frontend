import { zodResolver } from "@hookform/resolvers/zod";
import { Gift, LogInIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { loginUser, registerUser } from "@/lib/api";
import { loginSchema, registerSchema } from "./schemas/authSchema";

export const LoginCard = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			regId: "",
			password: "",
		},
	});

	const onSubmit = async (data) => {
		try {
			const res = await loginUser(data);
			const { token } = res.data;
			await login(token);
			toast.success("Login successful!");
			navigate("/dashboard");
		} catch (err) {
			toast.error(err?.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className="w-full max-w-sm space-y-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="regId"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Reg No." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						Log In
					</Button>
				</form>
			</Form>

			<Button variant="outline" className="w-full">
				<LogInIcon className="mr-2 h-4 w-4" /> Continue with Google
			</Button>
		</div>
	);
};

export const RegisterCard = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			firstname: "",
			lastname: "",
			regId: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data) => {
		const fullName = `${data.firstname} ${data.lastname}`;
		const payload = {
			name: fullName,
			regId: data.regId,
			email: data.email,
			password: data.password,
		};

		try {
			const res = await registerUser(payload);
			const { token } = res.data;
			await login(token);
			toast.success("Registration successful!");
			navigate("/dashboard");
		} catch (err) {
			toast.error(err?.response?.data?.error || "Registration failed");
		}
	};

	return (
		<div className="w-full max-w-sm space-y-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="flex space-x-2">
						<FormField
							control={form.control}
							name="firstname"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<Input placeholder="First Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lastname"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<Input placeholder="Last Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="regId"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Reg No." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						Register
					</Button>
				</form>
			</Form>

			<Button variant="outline" className="w-full">
				<Gift className="mr-2 h-4 w-4" /> Continue with Google
			</Button>
		</div>
	);
};
