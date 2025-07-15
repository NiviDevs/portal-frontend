import { zodResolver } from "@hookform/resolvers/zod";
import { Gift, Loader2, LogInIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { loginUser, registerUser } from "@/lib/api";
import { loginSchema, registerSchema } from "./schemas/authSchema";

const inputClasses = `bg-black/10 border border-black/30 dark:border-white/30 text-white/100 dark:text-white placeholder:text-white/50 dark:placeholder:text-white/70 focus:outline-none focus:ring-0 dark:focus:ring-0 rounded-md aria-invalid:bg-red-500/50 aria-invalid:placeholder:text-red-300 dark:aria-invalid:placeholder:text-red-300 dark:aria-invalid:bg-red-500/40 aria-invalid:ring-black transition-colors duration-300 aria-invalid:border-black placeholder:text-sm`;

export const LoginCard = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            regId: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await loginUser(data);
            const { token } = res.data;
            await login(token);
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm space-y-3">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                >
                    <FormField
                        control={form.control}
                        name="regId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Reg No."
                                        className={inputClasses}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="flex space-x-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            className={inputClasses}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            variant="outline"
                            className="w-fit rounded-md"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin w-4 h-4" />
                                    Login
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <LogInIcon />
                                    Login
                                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            <Button
                variant="outline"
                className="w-full bg-white/20 dark:bg-black/20 text-white"
            >
                <LogInIcon className="mr-2 h-4 w-4" /> Continue with Google
            </Button>
        </div>
    );
};

export const RegisterCard = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
            toast.error(err?.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm space-y-3">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                >
                    <div className="flex space-x-2">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="First Name"
                                            className={inputClasses}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="Last Name"
                                            className={inputClasses}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex space-x-2">
                        <FormField
                            control={form.control}
                            name="regId"
                            render={({ field }) => (
                                <FormItem className="w-1/4">
                                    <FormControl>
                                        <Input
                                            placeholder="Reg No."
                                            className={inputClasses}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-3/4">
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            className={inputClasses}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex space-x-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            className={inputClasses}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            variant="outline"
                            className="w-fit rounded-md"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin w-4 h-4" />
                                    Register
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <LogInIcon className="w-4 h-4" />
                                    Register
                                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            <Button
                variant="outline"
                className="w-full bg-white/20 dark:bg-black/20 text-white"
            >
                <Gift className="mr-2 h-4 w-4" /> Continue with Google
            </Button>
        </div>
    );
};
