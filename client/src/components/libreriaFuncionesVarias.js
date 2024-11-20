export function mostrarConf() {
  document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (event) => {
      if (event.target.classList.contains("link")) {
        //event.preventDefault(); // Evita el comportamiento predeterminado del enlace
        const target = event.target.dataset.target; // Obtengo el valor de data-target
        localStorage.setItem("targetSection", target); // Guarda el valor en localStorage
        // window.location.href = event.target.href; // Redirige a la página principal
      }
    });
  });
}
