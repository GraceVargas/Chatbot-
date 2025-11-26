import { NextResponse } from "next/server";
import { sendQuestion } from "../../lib/sendQuestion";

export async function POST(req: Request): Promise<Response> {
    try {
        const msg = await req.text();
        const backendRes = await sendQuestion(msg);

        if (!backendRes.body) {
            return NextResponse.json(
                { error: "El backend no devolvió un stream" },
                { status: 500 }
            );
        }

        return new Response(backendRes.body, {
            headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked"
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }    
}
