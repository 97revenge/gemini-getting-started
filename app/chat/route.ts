import { model } from "@/lib/gemini/model";

namespace Config {
  export const title = "venceremos de manha, com certeza";
  export const read = "bom dia, hoje eu acordei e durmi denovo";
}

export async function GET(request: Request) {
  const prompt = `me de uma revisao  de uma redação do enem que eu vou te entregar : 
    TITULO DA REDAÇÃO  : ${Config.title}
    REDAÇÃO : ${Config.read}
    
    `;

  const result = await model.generateContent(prompt);

  const response = await result.response;

  const text = response.text();

  return Response.json({ message: text });
}
