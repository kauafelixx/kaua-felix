const textoCompleto =
  "<strong>Kauã Felix</strong> | Desenvolvedor Front-End & Desenvolvedor Web";
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



  const carrosselInner = document.getElementById('carrosselInner');
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    carrosselInner.style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  document.getElementById('nextBtn').addEventListener('click', nextSlide);
  document.getElementById('prevBtn').addEventListener('click', prevSlide);

  // Auto play
  setInterval(nextSlide, 10000);

  // Touch support
  let startX = 0;
  carrosselInner.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carrosselInner.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      nextSlide();
    } else if (endX - startX > 50) {
      prevSlide();
    }
  });


  const form = document.getElementById("form");
  const statusMsg = document.getElementById("statusMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const url = form.action;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        statusMsg.textContent = "Mensagem enviada com sucesso!";
        form.reset();
      } else {
        statusMsg.textContent = "Erro ao enviar. Tente novamente.";
        statusMsg.style.color = "red";
      }
    } catch (error) {
      statusMsg.textContent = "Erro de conexão. Tente novamente.";
      statusMsg.style.color = "red";
    }
  });


  const toggleBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    toggleBtn.textContent = "🌙";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
    } else {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "🌞";
    }
  });