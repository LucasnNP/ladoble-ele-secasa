const weddingDate = new Date("2026-11-27T18:00:00");

function updateCountdown() {
  const now = new Date();

  const difference = weddingDate - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;

  document.getElementById("hours").innerText = hours;

  document.getElementById("minutes").innerText = minutes;

  document.getElementById("seconds").innerText = seconds;
}

updateCountdown();

setInterval(updateCountdown, 1000);

// Modales genéricos (Dress Code, Regalos, etc.)
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

window.onclick = function (event) {
  document.querySelectorAll(".modal").forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

const menuToggle = document.querySelector(".menu-toggle");
const navbarLinks = document.querySelector(".navbar-links");

menuToggle.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  const isOpen = navbarLinks.classList.contains("active");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navbarLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navbarLinks.classList.remove("active");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Carrusel de galería (soporta varios carruseles independientes en la
// misma página: la galería de fotos y el del modal de dress code)
function initCarousel() {
  const wraps = document.querySelectorAll(".carousel-wrap");

  wraps.forEach((wrap) => {
    const carousel = wrap.querySelector(".carousel");
    const slides = wrap.querySelectorAll(".carousel__slide");
    const prevBtn = wrap.querySelector(".carousel__arrow--prev");
    const nextBtn = wrap.querySelector(".carousel__arrow--next");
    const dotsContainer = wrap.querySelector(".carousel__dots");

    if (!carousel || slides.length === 0) return;

    let current = 0;

    // Crear los puntitos dinámicamente según la cantidad de slides
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("carousel__dot");
      dot.setAttribute("aria-label", `Ir a la foto ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".carousel__dot");

    function goToSlide(index) {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");

      current = (index + slides.length) % slides.length;

      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
    }

    prevBtn.addEventListener("click", () => goToSlide(current - 1));
    nextBtn.addEventListener("click", () => goToSlide(current + 1));

    // Estado inicial
    goToSlide(0);

    // Auto-avance cada 5 segundos (solo si hay más de una foto)
    if (slides.length > 1) {
      setInterval(() => goToSlide(current + 1), 5000);
    }
  });
}

initCarousel();

// Asegura que el video de fondo arranque en navegadores donde el
// autoplay con sonido está bloqueado (ya va muted, pero por las dudas
// forzamos el play en el primer toque en mobile).
const bgVideo = document.querySelector(".bg-video");
if (bgVideo) {
  document.addEventListener(
    "click",
    () => {
      bgVideo.play().catch(() => {});
    },
    { once: true },
  );
}
