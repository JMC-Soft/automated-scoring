import {type NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { slug: string };
  }
) {

  const slug = params.slug;
  const data = { slug };
  return NextResponse.json(data, { status: 200 });
}

