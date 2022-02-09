"use strict";

import { modalEl, hideModal } from "./modal";

// create Modals
function createModals(data) {
  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");
  modalDialog.innerHTML = `
  <div class="modal-content">
    <form action="#">
        <div class="modal-close">&times;</div>
    </form>
  </div>
  `;
  modalEl.append(modalDialog);

  if (data.nameRu || data.description) {
    createInformation(data);
  } else {
    createIframeOrError(data);
  }
  hideModal();
}

// add function, using 2 times
function createRulesModal(selector) {
  const mContent = document.querySelector(".modal-content");

  mContent.classList.add(selector);
  mContent.parentElement.style.maxWidth = "720px";
}

// create Info
function createInformation(data) {
  const formEl = document.querySelector(".modal-content form");
  createRulesModal("description");

  const formAlert = `
  <div class="modal-name_film">${data.nameRu}</div>
  <div class="modal-text">${checkDesctiprion(data.description)}</div>
  <div class="modal-information">
    <div title="Age Limits">
        <img src="assets/age.png" alt="Age Img">
        <p>${getRightAge(data.ratingAgeLimits)}</p>
    </div>
    <div title="Countries">
      <img src="assets/countries.png" alt="Countries Img">
      <p>${data.countries.map(
        (cuntryEl) => ` ${getCorrectValue(cuntryEl.country)}`
      )}</p>
    </div>
    <div title="Year">
      <img src="assets/calendar.png" alt="Year Img">
      <p>${getCorrectValue(data.year)}</p>
    </div>
  </div>
  `;

  formEl.insertAdjacentHTML("beforeend", formAlert);
  deleteInformation();
}

// check description
function checkDesctiprion(desc) {
  let descErr =
    "<b>К сожалению,</b> описание к данному фильму у нас отстствует.";

  desc = !desc ? descErr : desc;
  return desc;
}

// get correct value
function getCorrectValue(value) {
  value = !value ? "delete" : value;
  return value;
}

// get rigth age
function getRightAge(age) {
  age = !age ? "delete" : `${age.slice(3, age.length)}+`;
  return age;
}

// delete info, if contains 'delete'
function deleteInformation() {
  const deleteElems = document.querySelectorAll(".modal-information p");

  deleteElems.forEach((elem) => {
    if (elem.innerHTML === "delete" || elem.innerHTML === "") {
      elem.parentElement.remove();
    }
  });
}

// create iframe of error
function createIframeOrError(data) {
  const arrItems = data.items,
    arrYouTube = [];
  let strCode;

  arrItems.forEach((elem) => {
    let { site, name } = elem;

    if (
      site === "YOUTUBE" &&
      (name.toLowerCase().includes("трейлер") ||
        name.toLowerCase().includes("тизер"))
    ) {
      arrYouTube.push(elem);
    }
  });

  if (arrYouTube.length === 0) {
    getErrorVideo();
  } else {
    for (let i = 0; i < arrYouTube.length; i++) {
      const nameRU = arrYouTube[i].name,
        urlRU = arrYouTube[i].url;

      if (nameRU.match(/рус/i) || nameRU.match(/дубл/i)) {
        strCode = urlRU;
        break;
      }
    }

    if (strCode === undefined) {
      strCode = arrYouTube[0].url;
    }

    const formEl = document.querySelector(".modal-content form");
    const iframeEl = `
      <iframe class="modal-video" width="100%" src="https://www.youtube.com/embed/${strCode.substr(
        strCode.length - 11
      )}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `;

    formEl.insertAdjacentHTML("beforeend", iframeEl);
  }
}

function getErrorVideo() {
  const formEl = document.querySelector(".modal-content form");
  createRulesModal("error");

  const formAlert = `
  <div class="modal-title">К сожалению, у нас нет подходящего трейлера!</div>
  <img class='modal-img' src="assets/sad-smile.png" alt="">
  `;
  formEl.insertAdjacentHTML("beforeend", formAlert);
}

export default createModals;
