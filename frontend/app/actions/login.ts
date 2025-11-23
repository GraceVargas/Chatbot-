"use server";

import { authenticate } from "../lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(initialState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      errors: "Por favor, complete todos los campos.",
    };
  }

  const res = await authenticate(email, password);

  return res;
}
