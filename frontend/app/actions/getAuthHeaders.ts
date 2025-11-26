import { cookies } from "next/headers";

export async function getAuthHeaders(): Promise<HeadersInit | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  return {
    Cookie: `token=${token};`,
    "Content-Type": "application/json",
  };
}