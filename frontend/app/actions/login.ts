'use server'

import { redirect } from 'next/navigation';
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(initialState: any, formData: FormData) {

    const API_URL = process.env.API_URL;

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return {
            errors: "Por favor, complete todos los campos.",
        }
    } 

    const data = { email, password }

    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

  if (res.status === 200) {
    redirect('/');
  } else {
    return { errors: "El usuario o la contraseña no es correcto."}
  }
}