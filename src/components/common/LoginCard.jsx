import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
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
import { loginUser } from "@/lib/api";
import { loginSchema } from "./schemas/authSchema";

const LoginCard = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

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

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			regId: "",
			password: "",
		},
	});

	return (
		<div className="p-0 w-full bg-transparent border-0 shadow-none">

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
						<FormField
							control={form.control}
							name="regId"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="text" placeholder="Reg No." {...field} />
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
							Submit
						</Button>
					</form>
				</Form>
				<Button variant="outline" className="w-full text-center ">
					<LogInIcon />
					or use Google
				</Button>
		</div>
	);
};

export default LoginCard;
