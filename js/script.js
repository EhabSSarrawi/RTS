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


/*
Testimonial Slider
*/
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".testimonial-slider .slide");
  const dots   = document.querySelectorAll(".testimonial-slider .dot");
  const prev   = document.getElementById("prevBtn");
  const next   = document.getElementById("nextBtn");

  if (!slides.length || !prev || !next) return;

  let index = 0;
  let isAnimating = false;
  const DURATION = 600; // must match CSS animation time

  function changeSlide(newIndex, direction) {
    if (isAnimating || newIndex === index) return;
    isAnimating = true;

    const current   = slides[index];
    const nextSlide = slides[(newIndex + slides.length) % slides.length];

    // clear previous animation classes
    slides.forEach(s =>
      s.classList.remove(
        "active",
        "exit-left",
        "exit-right",
        "enter-left",
        "enter-right"
      )
    );

    // old slide: exit according to direction
    if (direction === "right") {
      current.classList.add("exit-left");   // moving card to the LEFT
    } else {
      current.classList.add("exit-right");  // moving card to the RIGHT
    }

    // new slide: enter from opposite side + become active
    if (direction === "left") {
      nextSlide.classList.add("active", "enter-right");
    } else {
      nextSlide.classList.add("active", "enter-left");
    }

    // update dots
    dots.forEach(d => d.classList.remove("active"));
    dots[(newIndex + slides.length) % slides.length].classList.add("active");

    // finish animation
    setTimeout(() => {
      current.classList.remove("exit-left", "exit-right");
      nextSlide.classList.remove("enter-left", "enter-right");
      index = (newIndex + slides.length) % slides.length;
      isAnimating = false;
    }, DURATION);
  }

  // right arrow → forward → fade/slide toward RIGHT
  next.addEventListener("click", () => {
    changeSlide(index + 1, "right");
  });

  // left arrow → backward → fade/slide toward LEFT
  prev.addEventListener("click", () => {
    changeSlide(index - 1, "left");
  });

  // dots click
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      if (i === index) return;
      const direction = i > index ? "right" : "left";
      changeSlide(i, direction);
    });
  });

  // optional autoplay
  setInterval(() => {
    changeSlide(index + 1, "right");
  }, 8000);
});