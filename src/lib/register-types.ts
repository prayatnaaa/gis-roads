import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "There is no way your name is less than 2 character" })
      .max(40),
    email: z.string().email({ message: "Email not valid" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(30),
    confirmPass: z.string(),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Password did not match",
    path: ["confirmPass"],
  });

export type TRegisterSchema = {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
};
