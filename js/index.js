const buttons = document.querySelectorAll(".toggle-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`.${button.dataset.target}`);

    target.classList.toggle("active");
  });
});
