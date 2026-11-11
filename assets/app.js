(function () {
  "use strict";

  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var form = document.getElementById("contact-form");
  var formWrap = document.getElementById("form-wrap");
  var formSuccess = document.getElementById("form-success");
  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".hero-dot");
  var slideIndex = 0;
  var slideTimer = null;

  function setNavOpen(open) {
    if (!navToggle || !siteNav) return;
    siteNav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!siteNav.classList.contains("is-open"));
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setNavOpen(false);
    });
  }

  function showSlide(index) {
    if (!slides.length) return;
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", i === slideIndex);
    });
    dots.forEach(function (dot, i) {
      var active = i === slideIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function startSlider() {
    stopSlider();
    if (slides.length < 2) return;
    slideTimer = window.setInterval(function () {
      showSlide(slideIndex + 1);
    }, 7000);
  }

  function stopSlider() {
    if (slideTimer) {
      window.clearInterval(slideTimer);
      slideTimer = null;
    }
  }

  if (slides.length) {
    showSlide(0);
    startSlider();
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        showSlide(i);
        startSlider();
      });
    });
  }

  if (form && formWrap && formSuccess) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.reset();
      formWrap.hidden = true;
      formSuccess.hidden = false;
      formSuccess.focus();
    });
  }
})();
