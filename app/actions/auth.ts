"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { loginSchema, signupSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function loginWithSocial(provider: "github" | "google") {
  await signIn(provider, { redirectTo: "/dashboard" });
}

export async function registerUser(values: z.infer<typeof signupSchema>) {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Data tidak valid!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { error: "Email sudah digunakan!" };
  }

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return { success: "Akun berhasil dibuat!" };
}

export async function loginUser(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Data tidak valid!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau password salah!" };
        default:
          return { error: "Terjadi kesalahan sistem!" };
      }
    }
    throw error;
  }
}
