import { model } from "@/lib/gemini/model";
import { Model } from "@/lib/prompts/utils";
import jwt from "jsonwebtoken";

import { NextApiRequest, NextApiResponse } from "next";

export const maxDuration = 100;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const title = req.query.title;
  const responseText = req.query.text;

  const prompt = Model.prompt(title, responseText);

  const format = Model.format;

  const note = Model.note;

  const revision = Model.revision;

  const aditional = Model.aditional;

  try {
    const result = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            { text: note },
            { text: revision },
            { text: aditional },
            { text: format },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.5,
      },
    });

    let text = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      text += chunkText;
    }

    const chat = jwt.sign(text, String(process.env.JWT_TOKEN!));

    if (res.statusCode === 504) {
      res.redirect('/?error="voce teve um erro "');
    }

    return res
      .status(200)
      .redirect(`/service?status=${res.statusCode}&text=${chat}`);
  } catch (err) {
    res.redirect(`/?error=${err}`);
  }
}
