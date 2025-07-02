import { zodResolver } from "@hookform/resolvers/zod";
import { Gift } from "lucide-react";
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
import { registerUser } from "@/lib/api";
import { registerSchema } from "./schemas/authSchema";

const RegisterCard = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

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

            await login(token); // ✅ same logic here
            toast.success("Registration successful!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err?.response?.data?.error || "Registration failed");
        }
    };

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

    return (
					<div className="w-full max-w-sm bg-muted shadow-none">
						<div>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-3"
								>
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
									<div className="flex space-x-2">
										<FormField
											control={form.control}
											name="regId"
											render={({ field }) => (
												<FormItem className="w-full">
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
												<FormItem className="w-full">
													<FormControl>
														<Input placeholder="Email" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														type="password"
														placeholder="Password"
														{...field}
													/>
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
						</div>
						<div>
							<Button
								variant="outline"
								className="min-w-max text-center w-full"
							>
								<Gift /> or use Google
							</Button>
						</div>
					</div>
				);
};

export default RegisterCard;
