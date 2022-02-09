"use strict";

import calcScroll from "./scroll";

const modalEl = document.querySelector(".modal"),
  scrollRigth = calcScroll();

// show
function showModal() {
  modalEl.classList.toggle("active");
  document.body.style.overflow = "hidden";
  document.body.style.marginRight = `${scrollRigth}px`;
}

// hide
function hideModal() {
  const modalCloseBtn = modalEl.querySelector(".modal-close");

  modalCloseBtn.addEventListener("click", () => {
    closeModal();
  });

  modalEl.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    if (e.target == modalEl) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalEl.classList.contains("active")) {
      closeModal();
    }
  });

  function closeModal() {
    modalEl.classList.toggle("active");

    const modalVideo = document.querySelector(".modal-video");
    if (modalVideo) {
      modalVideo.remove();
    }

    document.body.style.overflow = "";
    document.body.style.marginRight = `0px`;
  }
}

export { modalEl, showModal, hideModal };
