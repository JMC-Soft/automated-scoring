import {type NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {

  // const res = await req.json();
    const res = await req.json();
    return NextResponse.json(res, {
      status: 200,
        
    });
}
