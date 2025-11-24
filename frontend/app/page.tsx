import Chatbot from "./components/Chatbot";
import { logout } from "../app/lib/auth";

export default async function Home() {
  return (
    <>
      <button
        onClick={logout}
        className="absolute z-10 bg-gray-600 rounded-full w-38 h-12 text-white font-semibold right-4 bottom-6 cursor-pointer hover:bg-gray-500"
      >
        Cerrar sesión
      </button>
      <Chatbot />
    </>
  );
}
