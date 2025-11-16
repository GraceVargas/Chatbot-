"use client" 

import { useActionState } from "react";
import { login } from "../actions/login";

function FormLogin() {
    const [state, formAction, pending] = useActionState(login, null);
    
  return (
    <div className="w-3/4 max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Iniciar sesión
      </h3>
      <form action={formAction}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            Ingrese su correo electrónico:
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            Ingrese su contraseña:
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="mb-3 text-red-600 text-sm">{state?.errors}</p>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={pending}
        >
          Aceptar
        </button>
      </form>
    </div>
  );
}

export default FormLogin