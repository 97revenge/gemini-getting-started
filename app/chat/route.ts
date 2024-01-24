import { model } from "@/lib/gemini/model";
import jwt, { type Jwt } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

namespace Config {
  export const title =
    "O estigma associado às doenças mentais na sociedade brasileira - 2020";
  export const read = `
  De acordo com o filósofo Platão, a associação entre saúde física e mental seria imprescindível para a manutenção da integridade humana. Nesse contexto, elucida-se a necessidade de maior atenção ao aspecto psicológico, o qual, além de estar suscetível a doenças, também é alvo de estigmatização na sociedade brasileira. Tal discriminação é configurada a partir da carência informacional concatenada à idealização da vida nas redes sociais, o que gera a falta de suporte aos necessitados. Isso mostra que esse revés deve ser solucionado urgentemente.


Sob essa análise, é necessário salientar que fatores relevantes são combinados na estruturação dessa problemática. Dentre eles, destaca-se a ausência de informações precisas e contundentes a respeito das doenças mentais, as quais, muitas vezes, são tratadas com descaso e desrespeito. Essa falta de subsídio informacional é grave, visto que impede que uma grande parcela da população brasileira conheça a seriedade das patologias psicológicas, sendo capaz de comprometer a realização de tratamentos adequados, a redução do sofrimento do paciente e a sua capacidade de recuperação. Somada a isso, a veiculação virtual de uma vida idealizada também contribui para a construção dessa caótica conjuntura, pois é responsável pela crença equivocada de que a existência humana pode ser feita, isto é, livre de obstáculos e transtornos. Esse entendimento falho da realidade fez com que os indivíduos que não se encaixem nos padrões difundidos, em especial no que concerne à saúde mental, sejam vítimas de preconceito e exclusão. Evidencia-se, então, que a carência de conhecimento associado à irrealidade digitalmente disseminada arquitetam esse lastimável panorama.


Consequentemente, tais motivadores geram incontestáveis e sérios efeitos na vida dos indivíduos que sofrem de algum gênero de doença mental. Tendo isso em vista, o acolhimento insuficiente e a falta de tratamento são preocupantes, uma vez que os acometidos precisam de compreensão, respeito e apoio para disporem de mais energia e motivação no enfrentamento dessa situação, além de acompanhamento médico e psicológico também ser essencial para que a pessoa entenda seus sentimentos e organize suas estruturas psicológicas de uma forma mais salutar e emancipadora. O filme “Toc toc” retrata precisamente o processo de cura de um grupo de amigos que são diagnosticados com transtornos de ordem psicológica, revelando que o carinho fraternal e o entendimento mútuo são ferramentas fundamentais no desenvolvimento integral da saúde. Mostra-se, assim, que a estigmatização de doentes mentais produz a escassez de elementos primordiais para que eles possam ser tratados e curados.


Urge, portanto, que o Ministério da Saúde crie uma plataforma, por meio de recursos digitais, que contenha informações a respeito das doenças mentais e que proponha comportamentos e atitudes adequadas a serem adotados durante uma interação com uma pessoa que esteja com alguma patologia do gênero, além de divulgar os sinais mais frequentes relacionados à ausência de saúde psicológica. Essa medida promoverá uma maior rede informacional e propiciará um maior apoio aos necessitados. Ademais, também cabe à sociedade e a mídia elaborar campanhas que preguem a contrariedade ao preconceito no que tange os doentes dessa natureza, o que pode ser efetivado através de mobilizações em redes sociais e por intermédio de programas televisivos com viés informativo. Tal iniciativa é capaz de engajar a população brasileira no combate a esse tipo de discriminação. Com isso, a ideia platônica será convertida em realidade no Brasil.
  `;
}

export async function GET(req: NextApiRequest) {
  const prompt = `me de uma revisao  de uma redação do enem que eu vou te entregar : 
    TITULO DA REDAÇÃO  : ${Config.title}
    REDAÇÃO : ${Config.read}
    Formate todo o resultado para markdown e muito bem formatado !!! 
    
    `;

  const result = await model.generateContent(prompt);

  const response = await result.response;

  const text = response.text();

  const instance = await jwt.sign(text, String(process.env.JWT_TOKEN));

  const cookieStore = cookies();

  cookieStore.set("chat", instance);

  return Response.json(text);
}
