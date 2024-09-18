document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Evita que el enlace navegue a otra página

    const target = link.getAttribute("data-target");

    // Oculta todas las secciones
    document.querySelectorAll(".content").forEach((section) => {
      section.classList.remove("active");
    });

    // Muestra la sección correspondiente
    if (target) {
      document.querySelector(`.${target}`).classList.add("active");
    }
  });
});
