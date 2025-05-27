let sabores = [
  { nome: "Morango", idadeMinima: 0, categorias: ["frutado", "refrescante"] },
  { nome: "Creme", idadeMinima: 0, categorias: ["cremoso", "doce"] },
  { nome: "Maracujá", idadeMinima: 8, categorias: ["frutado", "azedo"] },
  { nome: "Chocolate", idadeMinima: 10, categorias: ["cremoso", "doce"] },
  { nome: "Limão", idadeMinima: 12, categorias: ["frutado", "azedo", "refrescante"] },
  { nome: "Café", idadeMinima: 14, categorias: ["cremoso", "amargo"] }
];
let idadeUsuario;
let gostaFrutado, gostaCremoso;
let saboresRecomendados = [];
let campoIdade;
let campoFrutado;
let recomendacaoTexto = "Nenhum sabor recomendado";

function setup() {
  createCanvas(800, 400);

  // 🔵 Texto para informar ao usuário
  createSpan("Sua idade: ");
  campoIdade = createInput("5");

  // 🔵 Checkbox com descrição clara
  campoFrutado = createCheckbox(" Gosta de sabores frutados?");
}

function geraRecomendacao(idade, gostaDeFrutado) {
  idade = parseInt(idade); // Garante que a idade seja um número inteiro

  if (idade >= 10) {
    if (idade >= 14) {
      // Se tiver 14 anos ou mais, recomenda Café
      return "Café";
    } else {
      if (gostaDeFrutado) {
        // Se gosta de frutado e tem entre 10 e 13 anos, recomenda Maracujá ou Limão
        const saborFrutadoMaior10 = sabores.find(sabor => sabor.idadeMinima <= idade && sabor.categorias.includes("frutado"));
        return saborFrutadoMaior10 ? saborFrutadoMaior10.nome : "Maracujá";
      } else {
        // Se não gosta de frutado e tem entre 10 e 13 anos, recomenda Chocolate
        const saborCremosoMaior10 = sabores.find(sabor => sabor.idadeMinima <= idade && sabor.categorias.includes("cremoso"));
        return saborCremosoMaior10 ? saborCremosoMaior10.nome : "Chocolate";
      }
    }
  } else {
    if (gostaDeFrutado) {
      // Se gosta de frutado e tem menos de 10 anos, recomenda Morango
      return "Morango";
    } else {
      // Se não gosta de frutado e tem menos de 10 anos, recomenda Creme
      return "Creme";
    }
  }
}

function draw() {
  background("white"); // ⚪ Fundo branco
  let idade = campoIdade.value();
  let gostaDeFrutado = campoFrutado.checked();
  recomendacaoTexto = geraRecomendacao(idade, gostaDeFrutado);

  fill(color(76, 0, 115)); // 🟣 Cor do texto (roxo escuro)
  textAlign(CENTER, CENTER); // 🎯 Alinhamento centralizado
  textSize(38); // 🔠 Tamanho maior para boa leitura

  text(recomendacaoTexto, width / 2, height / 2); // 📍 Texto exibido no centro
}
