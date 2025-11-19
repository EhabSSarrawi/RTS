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
document.addEventListener("DOMContentLoaded", () => {
  const track  = document.querySelector(".slide-track");
  const slider = document.querySelector(".slider");

  if (!track || !slider) return;

  const logos = Array.from(track.children);
  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });

  track.style.animationDuration = "28s";

  slider.addEventListener("wheel", (e) => {
    e.preventDefault();
    slider.scrollLeft += e.deltaY; 
  });
});