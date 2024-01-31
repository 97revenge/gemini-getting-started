import { model } from "@/lib/gemini/model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt =
    "me de um texto para eu fazer testes dentro da gemini ia , talvez o maximo de caracteres que consiga me entregar, pode buscar um tema aleatório tambem. respire fundo e se esforce nisto !!!";

  const result = model.generateContentStream({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  let text = "";

  for await (const chunk of (await result).stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }

  return res.status(200).json({
    message: text,
    status: res.statusCode,
    type: typeof (await result).stream,
  });
}
