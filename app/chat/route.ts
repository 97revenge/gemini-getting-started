import { model } from "@/lib/gemini/model";
import jwt, { type Jwt } from "jsonwebtoken";
import { NextApiRequest } from "next";

import { cookies } from "next/headers";

export async function GET(req: Request) {
  const prompt = "hey you you doing  ? ";
  const result = await model.generateContent(prompt);

  const response = await result.response;

  const text = response.text();

  const instance = await jwt.sign(text, String(process.env.JWT_TOKEN));

  const cookieStore = cookies();

  cookieStore.set("chat", instance);

  return Response.json(text);
}
