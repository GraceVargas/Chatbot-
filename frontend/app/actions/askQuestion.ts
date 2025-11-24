"use server"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function askQuestion(initialState: any, formData: FormData) {
    const question = formData.get("question");
    if (!question) {
        return {
        errors: "Por favor, complete ingrese una pregunta.",
        };
    }
    return {
        success: question.toString()
    }
}