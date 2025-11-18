'use strict';


const navOpenBtn  = document.querySelector("[data-nav-open-btn]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navbar      = document.querySelector("[data-navbar]");
const overlay     = document.querySelector("[data-overlay]");
const navLinks    = document.querySelectorAll("[data-navbar-link]");

function openMenu() {
  navbar.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("nav-open"); 
  navOpenBtn.style.display = "none";   // HIDE hamburger
  navCloseBtn.style.display = "inline-flex"; // SHOW X
}

function closeMenu() {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-open");
  navOpenBtn.style.display = "inline-flex"; // SHOW burger again
  navCloseBtn.style.display = "none"; // HIDE X
}

navOpenBtn.addEventListener("click", openMenu);
navCloseBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});



/*
Counter Animation
*/
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');

  function animateCounter(counter) {
    const target = +counter.dataset.target;
    const duration = 3500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      counter.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Run once
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
});

/*
Clients Slider
*/ 
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");

  index = i;
}

document.getElementById("nextBtn").onclick = function () {
  index = (index + 1) % slides.length;
  showSlide(index);
};

document.getElementById("prevBtn").onclick = function () {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

dots.forEach((dot, i) => {
  dot.onclick = () => showSlide(i);
});
