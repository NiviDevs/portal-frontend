import { z } from "zod";

export const loginSchema = z.object({
    regId: z.string().min(1, "Registration number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
    firstname: z.string().min(1, "Enter first name"),
    lastname: z.string().min(1, "Enter last name"),
    regId: z.string().min(1, "Registration number is required"),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
});