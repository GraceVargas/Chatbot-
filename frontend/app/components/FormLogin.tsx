"use client" 

import { useActionState } from "react";
import { login } from "../actions/login";

function FormLogin() {
    const [state, formAction, pending] = useActionState(login, null);
    
  return (
    <div className="w-3/4 max-w-md p-8 bg-white shadow-lg rounded-lg">
      <header className="w-full bg-primary-500 flex justify-center px-2 py-3 items-center">
            <h2 className="text-xl font-semibold text-black flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 w-10"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  color="#000"
                >
                  <path d="M4 15.5a2 2 0 1 1 0-4m16 4a2 2 0 1 0 0-4M7 7V4m10 3V4" />
                  <circle cx="7" cy="3" r="1" />
                  <circle cx="17" cy="3" r="1" />
                  <path d="M13.5 7h-3c-2.828 0-4.243 0-5.121.909S4.5 10.281 4.5 13.207s0 4.389.879 5.298c.878.909 2.293.909 5.121.909h1.025c.792 0 1.071.163 1.617.757c.603.657 1.537 1.534 2.382 1.738c1.201.29 1.336-.111 1.068-1.256c-.076-.326-.267-.847-.066-1.151c.113-.17.3-.212.675-.296c.591-.132 1.079-.348 1.42-.701c.879-.91.879-2.372.879-5.298s0-4.389-.879-5.298C17.743 7 16.328 7 13.5 7" />
                  <path d="M9.5 15c.57.607 1.478 1 2.5 1s1.93-.393 2.5-1m-5.491-4H9m6.009 0H15" />
                </g>
              </svg>
              TravelBot
            </h2>
          </header>
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
      <div className="m-4 text-gray-800 text-lg text-center">
        <p>
          ¿Aún no tenés cuenta? <a href="/register" className="font-bold underline">Registrate acá</a> 
        </p>
      </div>
    </div>
  );
}

export default FormLogin