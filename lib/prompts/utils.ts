namespace Model {
  export const prompt = (title: any, text: any) => {
    return String(`
    Por favor, forneça uma revisão para a redação do ENEM que será entregue. Os detalhes necessários são os seguintes :
 TITULO DA REDAÇÃO  : ${title}
 REDAÇÃO : ${text}
 `);
  };
}

export { Model };
