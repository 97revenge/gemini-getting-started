import { model } from "@/lib/gemini/model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = " give me an little text about dogs";

  const result = model.generateContentStream({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  let text = "";

  Array.from([(await result).stream]).map((data: Record<string, any>) => {
    const chunk = data.text();
    text += chunk;
  });

  return res.status(200).json({
    message: text,
    status: res.statusCode,
    type: typeof (await result).stream,
  });
}
