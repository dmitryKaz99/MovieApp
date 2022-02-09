"use strict";

import config from "../api/apiConfig";
import { showContent, isContains, hideContent } from "@/";
import { moviesEl, pagesEl, getMovies } from "../api/api";
import { prev, next } from "./arrows";

const btnPopular = document.getElementById("popular"),
  btnBest = document.getElementById("best"),
  btnAwait = document.getElementById("await");

// create numbers
function createPageNumbers(url) {
  let arrPages = [];

  if (url.includes("AWAIT")) {
    arrPages = [1];
  } else {
    const indexTop = url.search("TOP"),
      numberTop = url.substr(indexTop + 4, 3) / 20;

    for (let i = 0; i < numberTop; i++) {
      arrPages.push(i + 1);
    }
  }

  addPages(arrPages);
  setPagination(url);
}

// add pages on site
function addPages(arrPages) {
  pagesEl.innerHTML = "";
  arrPages.forEach((number) => {
    const nubmerEl = `<a href="#" class="numbers">${number}</a>`;
    pagesEl.insertAdjacentHTML("beforeend", nubmerEl);
  });

  if (arrPages.length > 5) {
    createArrows(arrPages);

    document
      .querySelectorAll(".numbers")
      .forEach((page) => (page.style.display = "none"));

    pagesEl.insertAdjacentHTML(
      "beforeend",
      `<div class="counter">1/${arrPages.length}</div>`
    );
  }
}

// if str > 5, create arrows
function createArrows(arrPages) {
  const prevBtn = `<a href="#" class="prev arrow">
    <i class="fas fa-chevron-up"></i>
    </a>`,
    nextBtn = `<a href="#" class="next arrow">
      <i class="fas fa-chevron-up"></i>
      </a>`;

  pagesEl.insertAdjacentHTML("afterbegin", prevBtn);
  pagesEl.insertAdjacentHTML("beforeend", nextBtn);

  prev(arrPages);
  next(arrPages);
}

// set pagination
function setPagination(url) {
  const arrPagination = document.querySelectorAll(".numbers"),
    paginationOne = document.querySelector(".numbers");

  arrPagination.forEach((page) => {
    page.addEventListener("click", (e) => {
      e.preventDefault();
      moviesEl.scrollIntoView({ behavior: "smooth" });

      hideContent(arrPagination);
      showContent(page);
      getMovies(`${url}${page.innerHTML}`);
    });
  });

  paginationOne.click();
}

// check, where was click
function checkClickBtn() {
  if (isContains(btnPopular)) {
    createPageNumbers(config.urlPopular);
  } else if (isContains(btnBest)) {
    createPageNumbers(config.urlBest);
  } else if (isContains(btnAwait)) {
    createPageNumbers(config.urlAwait);
  }
}

// set click for menu and CALL
function setToggleMenu() {
  const arrBtns = [btnPopular, btnBest, btnAwait];

  arrBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      hideContent(arrBtns);
      showContent(btn);
      checkClickBtn();
    });
  });
}

export default setToggleMenu;
