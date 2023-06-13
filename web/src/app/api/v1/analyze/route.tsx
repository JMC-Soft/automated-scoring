import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // const data = await req.body;

  return NextResponse.json(
    { name: "Test 입니다." },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const savedLink = "/public/results/result.csv";
  const result = JSON.stringify({
    url: savedLink,
  });

  return NextResponse.json(result, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
