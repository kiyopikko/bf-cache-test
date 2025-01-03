import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor") ?? 0;

  if (isNaN(Number(cursor))) {
    return new Response("Invalid cursor!", {
      status: 400,
    });
  }

  const now = new Date().toLocaleTimeString();

  const data = Array.from({ length: 4 }, (_, i) => ({
    id: `${Number(cursor) * 4 + i + 1}`,
    name: `Project ${Number(cursor) * 4 + i + 1}`,
    createdAt: now,
  }));

  const resData = {
    data,
    nextCursor: Number(cursor) + 1,
  };

  return Response.json(resData);
}
