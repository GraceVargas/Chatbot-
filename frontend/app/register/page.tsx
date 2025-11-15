"use server";

import FormRegister from "../components/FormRegister";

export default async function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full flex items-center justify-center">
        <FormRegister />
      </div>
    </div>
  );
}
