import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import uploadFile from "@/lib/firebase/storage/uploadFile";

export async function GET(req: NextRequest) {
  // const data = await req.body;
  console.log(req);

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
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ url: "no file" });

  const resultObj = await uploadFile(file);
  if (!resultObj) return NextResponse.json({ url: "error" });

  return NextResponse.json(resultObj);
}
