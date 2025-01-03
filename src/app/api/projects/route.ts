import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor") ?? 0;

  if (isNaN(Number(cursor))) {
    return new Response("Invalid cursor!", {
      status: 400,
    });
  }

  const data = {
    data: [
      {
        id: `id-${Number(cursor) + 1}`,
        name: `Project ${Number(cursor) + 1}`,
        createdAt: new Date().toLocaleTimeString(),
      },
    ],
    nextCursor: Number(cursor) + 1,
  };

  return Response.json(data);
}
