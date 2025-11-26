"use server";

import { redirect } from "next/navigation";
import { setTokenInCookies } from "../actions/setTokenInCookies";
import { cookies } from "next/headers";
import { API_URL } from "../../constants";

export const authenticate = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) => {
  const data = { email, password };

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.status === 200) {
    await setTokenInCookies(res.headers.get("set-cookie"));
    redirect("/");
  } else {
    return { errors: "El usuario o la contraseña no es correcto." };
  }
};

export const logout = async() => {
    const res = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.status == 200) {
      const cookieStore = await cookies();
      cookieStore.delete("token");
      redirect("/login");
    }
  }
