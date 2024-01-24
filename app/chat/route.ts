import { model } from "@/lib/gemini/model";
import jwt, { type Jwt } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

namespace Config {
  export const title = "Educação inclusiva - 2017";
  export const read = `
  No Brasil, o início do processo de educação de surdos remonta ao Segundo Reinado. No entanto, esse ato não se configurou como inclusivo, já que se caracterizou pelo estabelecimento de um “apartheid” educacional, ou seja, uma escola exclusiva para tal público, segregando-o dos que seriam considerados “normais” pela população. Assim, notam-se desafios ligados à formação educacional das pessoas com dificuldade auditiva, seja por estereotipação da sociedade civil, seja por passividade governamental. Portanto, haja vista que a educação é fundamental para o desenvolvimento econômico do referido público e, logo, da nação, ela deve ser efetivada aos surdos pelos agentes adequados, a partir da resolução dos entraves vinculados a ela.


Sob esse viés, pode-se apontar como um empecilho à implementação desse direito, reconhecido por mecanismos legais, a discriminação enraizada em parte da sociedade, inclusive dos próprios responsáveis por essas pessoas com limitação. Isso por ser explicado segundo o sociólogo Talcott Parsons, o qual diz que a família é uma máquina que produz personalidades humanas, o que legitima a ideia de que o preconceito por parte de muitos pais dificulta o acesso à educação pelos surdos. Tal estereótipo está associado a uma possível invalidez da pessoa com deficiência e é procrastinado, infelizmente, desde o Período Clássico grego, em que deficientes eram deixados para morrer por serem tratados como insignificantes, o que dificulta, ainda hoje, seu pleno desenvolvimento e sua autonomia.


Além do mais, ressalte-se que o Poder Público incrementou o acesso do público abordado ao sistema educacional brasileiro ao tornar a Libras uma língua secundária oficial e ao incluí-la, no mínimo, à grade curricular pública. Contudo, devido à falta de fiscalização e de políticas públicas ostensivas por parte de algumas gestões, isso não é bem efetivado. Afinal, dados estatísticos mostram que o número de brasileiros com deficiência auditiva vem diminuindo tanto em escolas inclusivas – ou bilíngues -, como em exclusivas, a exemplo daquela criada no Segundo Reinado. Essa situação abjeta está relacionada à inexistência ou à incipiência de professores que dominem a Libras e à carência de aulas proficientes, inclusivas e proativas, o que deveria ser atenuado por meio de uma maior gerência do Estado nesse âmbito escolar.


Diante do exposto, cabe às instituições de ensino com proatividade o papel de deliberar acerca dessa limitação em palestras elucidativas por meio de exemplos em obras literárias, dados estatísticos e depoimentos de pessoas envolvidas com o tema, para que a sociedade civil, em especial os pais de surdos, não seja complacente com a cultura de estereótipos e preconceitos difundidos socialmente. Outrossim, o próprio público deficiente deve alertar a outra parte da população sobre seus direitos e suas possibilidades no Estado civil a partir da realização de dias de conscientização na urbe e da divulgação de textos proativos em páginas virtuais, como “Quebrando o Tabu”. Por fim, ativistas políticos devem realizar mutirões no Ministério ou na Secretaria de Educação, pressionando os demiurgos indiferentes à problemática abordada, com o fito de incentivá-los a profissionalizarem adequadamente os professores – para que todos saibam, no mínimo, o básico de Libras – e a efetivarem o estudo da Língua Brasileira de Sinais, por meio da disponibilização de verbas e da criação de políticas públicas convenientes, contrariando a teórica inclusão da primeira escola de surdos brasileira.



  `;
}

export async function GET(req: NextRequest) {
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

  return (
    Response.json(instance) &&
    Response.redirect("http://localhost:3000/service")
  );
}
