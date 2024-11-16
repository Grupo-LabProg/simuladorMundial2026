function hideNavMenu() {
  if (window.innerWidth <= 800) {
    document.getElementById("nav_check").checked = false;
  }
}

document.querySelectorAll("nav .link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const target = link.getAttribute("data-target");

    document.querySelectorAll(".content").forEach((section) => {
      section.classList.remove("active");
    });

    if (target) {
      document.querySelector(`.${target}`).classList.add("active");
      hideNavMenu();
    }
  });
});
