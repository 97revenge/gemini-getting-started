import { model } from "@/lib/gemini/model";
import jwt, { type Jwt } from "jsonwebtoken";
import { NextApiRequest } from "next";

import { cookies } from "next/headers";

export namespace Config {
  export const temperature = {
    consistent: 0.2,
    balanced: 0.5,
    adaptive: 0.7,
    criative: 0.9,
  };

  export const title =
    "A Persistência da Violência contra a Mulher na Sociedade Brasileira - 2015";
  export const read = `
  Historicamente, o papel feminino nas sociedades ocidentais foi subjugado aos interesses masculinos e tal paradigma só começou a ser contestado em meados do século XX, tendo a francesa Simone de Beauvoir como expoente. Conquanto tenham sido obtidos avanços no que se refere aos direitos civis, a violência contra a mulher é uma problemática persistente no Brasil, uma vez que ela se dá- na maioria das vezes- no ambiente doméstico. Essa situação dificulta as denúncias contra os agressores, pois muitas mulheres temem expor questões que acreditam ser de ordem particular.


Com efeito, ao longo das últimas décadas, a participação feminina ganhou destaque nas representações políticas e no mercado de trabalho. As relações na vida privada, contudo, ainda obedecem a uma lógica sexista em algumas famílias. Nesse contexto, a agressão parte de um pai, irmão, marido ou filho; condição de parentesco essa que desencoraja a vítima a prestar queixas, visto que há um vínculo institucional e afetivo que ela teme romper.


Outrossim, é válido salientar que a violência de gênero está presente em todas as camadas sociais, camuflada em pequenos hábitos cotidianos. Ela se revela não apenas na brutalidade dos assassinatos, mas também nos atos de misoginia e ridicularização da figura feminina em ditos populares, piadas ou músicas. Essa é a opressão simbólica da qual trata o sociólogo Pierre Bordieu: a violação aos Direitos Humanos não consiste somente no embate físico, o desrespeito está –sobretudo- na perpetuação de preconceitos que atentam contra a dignidade da pessoa humana ou de um grupo social.


Destarte, é fato que o Brasil encontra-se alguns passos à frente de outros países o combate à violência contra a mulher, por ter promulgado a Lei Maria da Penha. Entretanto, é necessário que o Governo reforce o atendimento às vítimas, criando mais delegacias especializadas, em turnos de 24 horas, para o registro de queixas. Por outro lado, uma iniciativa plausível a ser tomada pelo Congresso Nacional é a tipificação do feminicídio como crime de ódio e hediondo, no intuito de endurecer as penas para os condenados e assim coibir mais violações. É fundamental que o Poder Público e a sociedade – por meio de denúncias – combatam praticas machistas e a execrável prática do feminicídio.


    `;
}

export async function GET(req: Request) {
  const prompt = `me de uma revisao  de uma redação do enem que eu vou te entregar :
    TITULO DA REDAÇÃO  : ${Config.title}
    REDAÇÃO : ${Config.read}
    Formate todo o resultado para .md (markdown) bem formatado !!!
    esta revisao precisa ter uma nota de 0 a 900 .
    respire fundo e me de um  otimo resultado !!!! 

    `;

  const result = await model.generateContent(prompt);

  const response = await result.response;

  const text = response.text();

  const instance = await jwt.sign(text, String(process.env.JWT_TOKEN));

  const cookieStore = cookies();

  cookieStore.set("chat", instance);

  return Response.json(text);
}
