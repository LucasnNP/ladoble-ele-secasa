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

function openDressCode() {
  document.getElementById("dressCodeModal").style.display = "block";
}

function closeDressCode() {
  document.getElementById("dressCodeModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = this.document.getElementById("dressCodeModal");

  if (event.target === modal) {
    modal.style.display = "none";
  }
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
