import { model } from "@/lib/gemini/model";
import jwt, { type Jwt } from "jsonwebtoken";
import { NextApiRequest } from "next";

import { cookies } from "next/headers";

export async function GET(req: Request) {
  const prompt = "hey you you doing  ? ";

  return Response.json(prompt);
}
