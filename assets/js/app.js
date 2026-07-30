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

  function setupModal({ modalAttr, openAttr, closeAttr }) {
    const modal = document.querySelector(`[${modalAttr}]`);
    const openBtn = document.querySelector(`[${openAttr}]`);
    const closeEls = document.querySelectorAll(`[${closeAttr}]`);
    if (!modal || !openBtn) return;

    let lastFocused = null;

    function onKeydown(event) {
      if (event.key === "Escape") closeModal();
    }

    function openModal() {
      lastFocused = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      const closeBtn = modal.querySelector(".about-modal__close");
      if (closeBtn) closeBtn.focus();
      document.addEventListener("keydown", onKeydown);
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeydown);
      if (lastFocused) lastFocused.focus();
    }

    openBtn.addEventListener("click", openModal);
    closeEls.forEach((el) => el.addEventListener("click", closeModal));
  }

  setupModal({
    modalAttr: "data-about-modal",
    openAttr: "data-about-open",
    closeAttr: "data-about-close",
  });

  setupModal({
    modalAttr: "data-contact-modal",
    openAttr: "data-contact-open",
    closeAttr: "data-contact-close",
  });
})();