import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ message: "Email is required*" })
    .min(1, { message: "Email is required*" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required*" })
    .min(1, { message: "Password is required*" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, type LoginSchema };
