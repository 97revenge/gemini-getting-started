import { model } from "@/lib/gemini/model";

namespace Config {
  export const title =
    "Desafios para a valorização de comunidades e povos tradicionais no Brasil - 2022";
  export const read = `
  O poeta modernista Oswald de Andrade relata, em "Erro de Português", que, sob um dia de chuva, o índio foi vestido pelo português - uma denúncia à aculturação sofrida pelos povos indígenas com a chegada dos europeus ao território brasileiro. Paralelamente, no Brasil atual, há a manutenção de práticas prejudiciais não só aos silvícolas, mas também aos demais povos e comunidades tradicionais, como os pescadores. Com efeito, atuam como desafios para a valorização desses grupos a educação deficiente acerca do tema e a ausência do desenvolvimento sustentável.
  
  
  Diante desse cenário, existe a falta da promoção de um ensino eficiente sobre as populações tradicionais. Sob esse viés, as escolas, ao abordarem tais povos por meio de um ponto de vista histórico eurocêntrico, enraízam no imaginário estudantil a imagem de aborígenes cujas vivências são marcadas pela defasagem tecnológica. A exemplo disso, há o senso comum de que os indígenas são selvagens, alheios aos benefícios do mundo moderno, o que, consequentemente, gera um preconceito, manifestado em indagações como “o índio tem ‘smartphone’ e está lutando pela demarcação de terras?” – ideia essa que deslegitima a luta dos silvícolas. Entretanto, de acordo com a Teoria do Indigenato, defendida pelo ministro Edson Fachin, do Supremo Tribunal Federal, o direito dos povos tradicionais à terra é inato, sendo anterior, até, à criação do Estado brasileiro. Dessa forma, por não ensinarem tal visão, os colégios fometam a desvalorização das comunidades tradicionais, mediante o desenvolvimento de um pensamento discriminatório nos alunos.
  
  
  Além disso, outro desafio para o reconhecimento desses indivíduos é a carência do progresso sustentável. Nesse contexto, as entidades mercadológicas que atuam nas áreas ocupadas pelas populações tradicionais não necessariamente se preocupam com a sua preservação, comportamento no qual se valoriza o lucro em detrimento da harmonia entre a natureza e as comunidades em questão. À luz disso, há o exemplo do que ocorre aos pescadores, cujos rios são contaminados devido ao garimpo ilegal, extremamente comum na Região Amazônica. Por conseguinte, o povo que sobrevive a partir dessa atividade é prejudicado pelo que a Biologia chama de magnificação trófica, quando metais pesados acumulam-se nos animais de uma cadeia alimentar – provocando a morte de peixes e a infecção de humanos por mercúrio. Assim, as indústrias que usam os recursos naturais de forma irresponsável não promovem o desenvolvimento sustentável e agem de maneira nociva às sociedades tradicionais.
  
  
  Portanto, é essencial que o governo mitigue os desafios supracitados. Para isso, o Ministério da Educação – órgão responsável pelo estabelecimento da grade curricular das escolas – deve educar os alunos a respeito dos empecilhos à preservação dos indígenas, por meio da inserção da matéria “Estudos Indigenistas” no ensino básico, a fim de explicar o contexto dos silvícolas e desconstruir o preconceito. Ademais, o Ministério do Desenvolvimento – pasta instituidora da Política Nacional de Desenvolvimento Sustentável dos Povos e Comunidades Tradicionais – precisa fiscalizar as atividades econômicas danosas às sociedades vulneráveis, visando à valorização de tais pessoas, mediante canais de denúncias."
  
  `;
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