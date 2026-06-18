// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    navLinks.classList.toggle("active");

    const icon = this.querySelector("i");
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      if (mobileMenuBtn) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks &&
    mobileMenuBtn &&
    !navLinks.contains(e.target) &&
    !mobileMenuBtn.contains(e.target)
  ) {
    navLinks.classList.remove("active");
    if (mobileMenuBtn) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }
});

// Header scroll effect
const header = document.querySelector("header");
const topBar = document.querySelector(".top-bar");
let headerFixed = false;

window.addEventListener("scroll", () => {
  if (!topBar || !header) return;

  const topBarHeight = topBar.offsetHeight;
  const scrollPosition = window.scrollY;

  if (scrollPosition > topBarHeight && !headerFixed) {
    // Cuando el scroll pasa el top bar, fijar el header
    header.classList.add("header-fixed");
    document.body.classList.add("has-fixed-header");
    headerFixed = true;
  } else if (scrollPosition <= topBarHeight && headerFixed) {
    // Cuando vuelve arriba, quitar fixed
    header.classList.remove("header-fixed");
    document.body.classList.remove("has-fixed-header");
    headerFixed = false;
  }
});

// Animación de entrada para elementos al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar elementos para animación
document
  .querySelectorAll(
    ".service-highlight-card, .service-item, .project-card, .mission, .vision",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// Agregar clase para animación
const style = document.createElement("style");
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Año actual en copyright
const yearElement = document.querySelector(".footer-bottom p");
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = yearElement.innerHTML.replace("2024", currentYear);
}

// Modal Lightbox para Servicios
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");

if (modal) {
  // 1. Abrir modal al hacer clic en la imagen
  document.querySelectorAll(".service-img-wrapper").forEach((wrapper) => {
    wrapper.addEventListener("click", function (e) {
      e.stopPropagation();
      const img = this.querySelector(".service-img");
      const parentItem = this.closest(".service-item");
      const title = parentItem?.querySelector(".service-text h3");

      if (img && title) {
        modalImg.src = img.src;
        modalTitle.textContent = title.textContent;
        modal.classList.add("active");
      }
    });
  });

  // 2. Abrir modal al hacer clic en los <li> con data-image
  document.querySelectorAll(".service-text ul li[data-image]").forEach((li) => {
    li.addEventListener("click", function (e) {
      e.stopPropagation();
      const imageUrl = this.getAttribute("data-image");
      const parentItem = this.closest(".service-item");
      const title = parentItem?.querySelector(".service-text h3");

      if (imageUrl) {
        modalImg.src = imageUrl;
        modalTitle.textContent = title
          ? title.textContent + " - " + this.textContent
          : this.textContent;
        modal.classList.add("active");
      }
    });
  });

  // Cerrar modal
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.classList.contains("modal-close")) {
      modal.classList.remove("active");
      modalImg.src = "";
      modalTitle.textContent = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
      modalImg.src = "";
      modalTitle.textContent = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoSlideInterval;

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
      stopAutoSlide();
      startAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  startAutoSlide();

  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer?.addEventListener("mouseenter", stopAutoSlide);
  carouselContainer?.addEventListener("mouseleave", startAutoSlide);

  window.addEventListener("resize", updateCarousel);
});

// Desplegable del Libro de Reclamaciones
const claimsTrigger = document.getElementById("claims-trigger");
const claimsSection = document.getElementById("claims-section");

if (claimsTrigger && claimsSection) {
  claimsTrigger.addEventListener("click", function (e) {
    e.preventDefault();
    claimsSection.classList.toggle("show");

    // Cambiar texto del enlace (opcional)
    if (claimsSection.classList.contains("show")) {
      claimsTrigger.innerHTML = "📋 Cerrar Libro de Reclamaciones";
      // Scroll suave hacia el formulario
      setTimeout(() => {
        claimsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      claimsTrigger.innerHTML = "📋 Libro de Reclamaciones";
    }
  });
}

// Validación en tiempo real para campos numéricos
const dniInput = document.querySelector('input[name="documento"]');
const telefonoInput = document.querySelector('input[name="telefono"]');

if (dniInput) {
  dniInput.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
}

if (telefonoInput) {
  telefonoInput.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
}

// Validación para nombres (solo letras y espacios)
const nombreInput = document.querySelector('input[name="nombre"]');
if (nombreInput) {
  nombreInput.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ\s]/g, "");
  });
}

// Validación de longitudes al enviar el formulario
const claimsForm = document.querySelector(".claims-form");

if (claimsForm) {
  claimsForm.addEventListener("submit", function (e) {
    const documento = document.querySelector('input[name="documento"]');
    const telefono = document.querySelector('input[name="telefono"]');
    let error = false;

    if (documento && documento.value.length < 8) {
      alert("El DNI / RUC debe tener al menos 8 números");
      documento.focus();
      error = true;
    }

    if (telefono && telefono.value.length !== 9) {
      alert("El teléfono debe tener exactamente 9 números");
      telefono.focus();
      error = true;
    }

    if (error) {
      e.preventDefault();
    }
  });
}
