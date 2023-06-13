import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const data = { test: "Hello World" };
    const token = req.cookies.get("token");
    const requestHeaders = new Headers(req.headers);

    return NextResponse.json(data, {
      status: 200,
      // headers: { "Set-Cookie": `token=${token}`},
    });
}