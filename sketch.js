let saboresDeSorvete = [
  { nome: "Chocolate", idadeMinima: 0, categorias: ["clássico", "doce"] },
  { nome: "Baunilha", idadeMinima: 0, categorias: ["clássico", "suave"] },
  { nome: "Morango", idadeMinima: 0, categorias: ["frutado", "doce"] },
  { nome: "Menta com Chocolate", idadeMinima: 10, categorias: ["refrescante", "doce"] },
  { nome: "Café", idadeMinima: 12, categorias: ["estimulante"] },
  { nome: "Doce de Leite", idadeMinima: 12, categorias: ["doce", "rico"] }
];

let idadeInput;
let classicoCheckbox, frutadoCheckbox, refrescanteCheckbox;
let recomendarButton;
let saboresRecomendados = [];
let mensagemRecomendacao = "";

function setup() {
  createCanvas(600, 500);
  background(240);
  textSize(18);
  fill(50);
  textAlign(LEFT, TOP);

  text("Recomendador de Sabores de Sorvete", 20, 30);

  // --- Idade ---
  text("Qual é a sua idade?", 20, 80);
  idadeInput = createInput('');
  idadeInput.position(20, 110);
  idadeInput.attribute('placeholder', 'Digite sua idade');
  idadeInput.size(100);

  // --- Preferências ---
  text("Que tipo de sabores você gosta?", 20, 170);

  classicCheckbox = createCheckbox(' Sabores clássicos', false);
  classicCheckbox.position(20, 200);

  frutadoCheckbox = createCheckbox(' Sabores frutados', false);
  frutadoCheckbox.position(20, 230);

  refrescanteCheckbox = createCheckbox(' Sabores refrescantes', false);
  refrescanteCheckbox.position(20, 260);

  // --- Botão de Recomendar ---
  recomendarButton = createButton('Recomendar Sorvete');
  recomendarButton.position(20, 320);
  recomendarButton.mousePressed(gerarRecomendacao);

  // Initial clear display for results
  displayRecommendations();
}

function draw() {
  // draw() is intentionally left empty as we update the display only when the button is pressed.
}

function gerarRecomendacao() {
  background(240); // Clear the canvas for new recommendations
  text("Recomendador de Sabores de Sorvete", 20, 30);
  
  // Re-draw input elements and labels after clearing background
  text("Qual é a sua idade?", 20, 80);
  idadeInput.position(20, 110); // Ensure they stay in place
  text("Que tipo de sabores você gosta?", 20, 170);
  classicCheckbox.position(20, 200);
  frutadoCheckbox.position(20, 230);
  refrescanteCheckbox.position(20, 260);
  recomendarButton.position(20, 320);


  let idadeUsuario = int(idadeInput.value());
  let gostaClassico = classicCheckbox.checked();
  let gostaFrutado = frutadoCheckbox.checked();
  let gostaRefrescante = refrescanteCheckbox.checked();

  saboresRecomendados = []; // Clear previous recommendations

  if (isNaN(idadeUsuario) || idadeUsuario < 0) {
    mensagemRecomendacao = "Por favor, digite uma idade válida.";
    displayRecommendations();
    return;
  }

  for (let sorvete of saboresDeSorvete) {
    if (idadeUsuario >= sorvete.idadeMinima) {
      if (
        (gostaClassico && sorvete.categorias.includes("clássico")) ||
        (gostaFrutado && sorvete.categorias.includes("frutado")) ||
        (gostaRefrescante && sorvete.categorias.includes("refrescante"))
      ) {
        saboresRecomendados.push(sorvete.nome);
      } else if (!gostaClassico && !gostaFrutado && !gostaRefrescante) {
        // If no preferences are selected, include all flavors suitable for age
        saboresRecomendados.push(sorvete.nome);
      }
    }
  }

  // Deduplicate recommendations if a flavor can be added multiple times (e.g., if it has classic and fruity)
  saboresRecomendados = [...new Set(saboresRecomendados)];

  if (saboresRecomendados.length > 0) {
    mensagemRecomendacao = "Sabores de sorvete recomendados para você:";
  } else {
    mensagemRecomendacao = "Desculpe, não encontramos sabores de sorvete que correspondam à sua idade e preferências.";
  }

  displayRecommendations();
}

function displayRecommendations() {
  fill(50);
  let startY = 380; // Starting Y position for the results

  // Display general message
  text(mensagemRecomendacao, 20, startY);

  if (saboresRecomendados.length > 0) {
    // Display individual recommended flavors
    for (let i = 0; i < saboresRecomendados.length; i++) {
      text("- " + saboresRecomendados[i], 40, startY + 30 + i * 25);
    }
  }
}
