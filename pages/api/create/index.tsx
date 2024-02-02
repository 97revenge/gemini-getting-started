import { model } from "@/lib/gemini/model";
import { Model } from "@/lib/prompts/utils";
import jwt from "jsonwebtoken";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const title = req.query.title;
  const responseText = req.query.text;

  const prompt = Model.prompt(title, responseText);

  const format =
    "A revisão deve ser formatada em .md (Markdown) com titulos em fonte bold";

  const note = "A pontuação atribuída deve estar dentro da faixa de 0 a 900.";

  const revision =
    "Ao realizar a revisão, leve em consideração diversos aspectos, incluindo coerência, coesão, correção gramatical, clareza argumentativa e aderência ao tema proposto.";

  const aditional = `Respire fundo e, com base em uma avaliação criteriosa, forneça um feedback detalhado e construtivo, destacando pontos fortes e áreas que podem ser aprimoradas. Garanta que a revisão seja minuciosa e contribua para o desenvolvimento do autor.

    `;

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
