namespace Model {
  export const prompt = (title: any, text: any) => {
    return String(`
    Por favor, forneça uma revisão para a redação do ENEM que será entregue. Os detalhes necessários são os seguintes :
 TITULO DA REDAÇÃO  : ${title}
 REDAÇÃO : ${text}
 `);
  };
  export const format =
    "A revisão deve ser formatada em .md (Markdown) com titulos em fonte bold";

  export const note =
    "A pontuação atribuída deve estar dentro da faixa de 0 a 900.";

  export const revision =
    "Ao realizar a revisão, leve em consideração diversos aspectos, incluindo coerência, coesão, correção gramatical, clareza argumentativa e aderência ao tema proposto.";

  export const aditional =
    "Respire fundo e, com base em uma avaliação criteriosa, forneça um feedback detalhado e construtivo, que demonstre domínio da escrita formal da língua portuguesa, compreenda o tema proposto sem desviar do foco, organize e defenda seus argumentos de forma clara, evidenciando conhecimento dos mecanismos linguísticos, e apresente uma proposta de intervenção coerente.";
}

export { Model };
