import { model } from "@/lib/gemini/model";
import jwt from "jsonwebtoken";

import { NextApiRequest, NextApiResponse } from "next";

namespace userRequests {
  export const shearch = `aprenda e pesquise todas as informacoes sobre a historia
do rap e selecione os rappers que mais fizeram parte desta historia
`;
  export const task = `agora selecione rappers com as discografias entre todos estes`;

  export const enity = `Classifique entre os 5 maiores do maior ao menor`;

  export const format = `formate todo este conteudo mara .md (markdown)`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const title = req.query.title;
  const responseText = req.query.text;

  const prompt = `me de uma revisao  de uma redação do enem que eu vou te entregar :
 TITULO DA REDAÇÃO  : ${title}
 REDAÇÃO : ${responseText}
 Formate todo o resultado para .md (markdown) bem formatado !!!
 esta revisao precisa ter uma nota de 0 a 900 .
 respire fundo e me de um  otimo resultado !!!! 

 `;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.2,
    },
  });

  const response = await result.response;

  const text = response.text();

  const chat = jwt.sign(text, String(process.env.JWT_TOKEN));

  res.redirect(`/service?text=${chat}`);
}
