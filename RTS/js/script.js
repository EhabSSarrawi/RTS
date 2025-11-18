'use strict';



/**
 * navbar toggle
 */

const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const overlay = document.querySelector("[data-overlay]");

function toggleMenu() {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-open");
}

navOpenBtn.addEventListener("click", toggleMenu);
navCloseBtn.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);




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
