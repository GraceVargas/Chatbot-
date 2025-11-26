import { API_URL } from "../../constants";
import { getAuthHeaders } from "../actions/getAuthHeaders";

export const sendQuestion = async(question: string) => {
    const headers = await getAuthHeaders();
    if (!headers) {
        throw new Error("Token no encontrado");
    }

    const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        credentials: "include",
        headers,
        body: question,
    });
    
    return res; 
}