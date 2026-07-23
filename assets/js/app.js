(function () {
  "use strict";

  const items = document.querySelectorAll(".fade-up");
  items.forEach((item, index) => {
    item.style.animationDelay = `${90 + index * 90}ms`;
  });

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const avatar = document.querySelector(".avatar-ring");

  if (avatar && hasFinePointer && !prefersReducedMotion) {
    const strength = 10;
    window.addEventListener("pointermove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * strength;
      const y = (event.clientY / window.innerHeight - 0.5) * strength;
      avatar.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
})();