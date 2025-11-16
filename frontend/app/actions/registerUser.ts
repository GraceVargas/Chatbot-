'use server'
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerUser(initialState: any, formData: FormData) {

    const API_URL = process.env.API_URL;

    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPass = formData.get('confirmPassword');

    if (!email || !password || !confirmPass) {
        return {
            errors: "Todos los campos son requeridos.",
        }
    } 
    
    if (confirmPass != password) {
        return {
            errors: "Las contraseñas deben ser idénticas.",
        }
    }

    const data = { email, password }

    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

  if (res.status === 201) {
    return { success: "El usuario fue creado con éxito." }
  } else {
    return { errors: "Hubo un problema con el registro."}
  }
}