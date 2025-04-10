const textoCompleto =
  "<strong>Kauã Felix</strong> | Desenvolvedor Front-End & Aspirante a Full Stack";
const elemento = document.getElementById("typing-text");
let i = 0;
let dentroDeTag = false;
let tagAtual = "";
let textoVisivel = "";

function digitar() {
  if (i < textoCompleto.length) {
    const caractere = textoCompleto[i];

    // Verifica se estamos entrando ou saindo de uma tag HTML
    if (caractere === "<") {
      dentroDeTag = true;
      tagAtual += caractere;
    } else if (caractere === ">") {
      dentroDeTag = false;
      tagAtual += caractere;
      textoVisivel += tagAtual;
      tagAtual = "";
    } else if (dentroDeTag) {
      tagAtual += caractere;
    } else {
      textoVisivel += caractere;
    }

    elemento.innerHTML = textoVisivel;
    i++;

    // Velocidade de digitação (mais rápido para espaços e pontuação)
    let velocidade = 100;
    if (caractere === " " || caractere === "|") velocidade = 30;
    if (caractere === "&") velocidade = 150;

    setTimeout(digitar, velocidade);
  } else {
    // Remove o cursor quando terminar
    const style = document.createElement("style");
    style.innerHTML = "#typing-text::after { content: none !important; }";
    document.head.appendChild(style);
  }
}

// Inicia a animação quando a página carregar
window.addEventListener("DOMContentLoaded", digitar);

// Animação scroll reveal
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
