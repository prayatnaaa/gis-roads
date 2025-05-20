import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email not valid" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(30),
});

export type TLoginSchema = {
  email: string;
  password: string;
};
