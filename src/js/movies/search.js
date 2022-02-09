"use strict";

import config from "../api/apiConfig";
import { hideContent } from "@/";
import { moviesEl, pagesEl, getMovies } from "../api/api";

// event on form
function addEventForm() {
  const formSearch = document.querySelector(".form-header"),
    search = document.querySelector(".header-search");

  // event on form
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    hideContent(document.querySelectorAll(".menu-item"));
    moviesEl.scrollIntoView({ behavior: "smooth" });

    const apiSearchUrl = `${config.urlSearch}${search.value}`;
    if (search.value) {
      getMovies(apiSearchUrl);
      search.value = "";
    }

    pagesEl.innerHTML = "";
  });
}

export default addEventForm;
