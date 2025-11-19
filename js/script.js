'use strict';

const navOpenBtn  = document.querySelector("[data-nav-open-btn]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navbar      = document.querySelector("[data-navbar]");
const overlay     = document.querySelector("[data-overlay]");
const navLinks    = document.querySelectorAll("[data-navbar-link]");

function isMobile() {
  return window.innerWidth <= 768; 
}

function openMenu() {
  navbar.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("nav-open");

  if (isMobile()) {
    navOpenBtn.style.display = "none";          
    navCloseBtn.style.display = "inline-flex";  
  }
}

function closeMenu() {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-open");

  if (isMobile()) {
    navOpenBtn.style.display = "inline-flex";   
    navCloseBtn.style.display = "none";         
  }
}

function handleResize() {
  if (!isMobile()) {
    navOpenBtn.style.display  = "";
    navCloseBtn.style.display = "";
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-open");
  } else {
    navCloseBtn.style.display = "none";
  }
}

navOpenBtn.addEventListener("click", openMenu);
navCloseBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navbar.classList.contains("active")) {
      closeMenu();
    }
  });
});

handleResize();
window.addEventListener("resize", handleResize);
/*
Go Up Button
*/ 

const goUpBtn = document.getElementById("goUpBtn");

// Show / hide button on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    goUpBtn.classList.add("show");
  } else {
    goUpBtn.classList.remove("show");
  }
});

// Smooth scroll to top
goUpBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
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
  logos.forEach(logo => track.appendChild(logo.cloneNode(true)));

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;  // drag speed factor
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener("wheel", (e) => {
    e.preventDefault();
    slider.scrollLeft += e.deltaY;
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".testimonial-slider .slide");
  const dots   = document.querySelectorAll(".testimonial-slider .dot");
  const prev   = document.getElementById("prevBtn");
  const next   = document.getElementById("nextBtn");

  if (!slides.length || !prev || !next) return;

  let index = 0;

  function showSlide(i) {
    // keep index within bounds
    index = (i + slides.length) % slides.length;

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
  }

  // arrows
  next.addEventListener("click", () => {
    showSlide(index + 1);
  });

  prev.addEventListener("click", () => {
    showSlide(index - 1);
  });

  // dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  // optional: auto-play every 5s
  setInterval(() => showSlide(index + 1), 5000);
});
