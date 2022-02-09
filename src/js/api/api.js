"use strict";

import config from "./apiConfig";
import showMovies from "../movies/movies";
import createModals from "../modal/createModals";
import addEventForm from "../movies/search";
import setToggleMenu from "../paginations/paginations";

const moviesEl = document.querySelector(".movies"),
  pagesEl = document.querySelector(".page");

// get res
async function getMovies(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${config.apiKey}`,
      },
    });
    const resData = await resp.json();

    if (url.includes("top") || url.includes("search")) {
      showMovies(resData);
    } else {
      createModals(resData);
    }
  } catch (e) {
    alert("Проверьте подключение к интернету!");
    console.error(e);
  }
}

addEventForm();
setToggleMenu();

export { moviesEl, pagesEl, getMovies };
