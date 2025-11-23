import { cookies } from "next/headers";

export async function setTokenInCookies(rawSetCookie: string | null) {
  if (!rawSetCookie) throw new Error("No se recibió cookie de sesión");

  const secureCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict" as const,
  };

  const splitCookies = rawSetCookie.split(",").filter(Boolean);
  console.log(splitCookies)

  const cookieStore = await cookies();
  for (const cookieStr of splitCookies) {
    const [cookiePair] = cookieStr.split(";");
    const [name, value] = cookiePair.split("=");

    if (name && value) {
      const trimmedName = name.trim();
      const trimmedValue = value.trim();
      cookieStore.set(trimmedName, trimmedValue, {
        ...secureCookieOptions,
      });
    }
  }
}