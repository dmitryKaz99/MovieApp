"use strict";

import config from "../api/apiConfig";
import { moviesEl, getMovies } from "../api/api";
import { modalEl, showModal } from "../modal/modal";

// show (create) movies
function showMovies(data) {
  moviesEl.innerHTML = "";

  setResponseErr(data);

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <div class="movie-inner">
        <img src="${movie.posterUrlPreview}" alt="${movie.nameRu} Img">
        <div class="movie-orange"></div>
      </div>
      <div class="movie-more">
        <img id="${
          movie.filmId
        }" class='popup-play' src="assets/play.svg" alt="Play Img">
        <div class="more-information">О фильме</div>
      </div>
      </div>
      <div class="movie-info">
        <div class="movie-title">${movie.nameRu}</div>
        <div class="movie-category">${movie.genres.map(
          (genreEl) => ` ${checkCategoryMovie(genreEl.genre)}`
        )}</div>
          <div class="movie-average average-${getClassByRate(
            movie.rating
          )}">${checkNumRating(movie.rating)}</div>
          </div>
      `;

    moviesEl.append(movieEl);
    checkNameMovie(movieEl);
  });

  setEventsVideoOfInfo();
}

// if resp = 0
function setResponseErr(data) {
  if (data.searchFilmsCountResult === 0) {
    const moviesErr = `
        <span class="movies-err">К сожалению, поиск по сайту не дал никаких результатов.
        <br>Попробуйте изменить или сократить запрос: <br><b>${data.keyword}</b></span>
        `;

    moviesEl.insertAdjacentHTML("beforeend", moviesErr);
  }
}

// if name not, delete 'movie'
function checkNameMovie(parentEl) {
  const name = parentEl.querySelector(".movie-title");
  if (name.innerHTML == "undefined") {
    parentEl.remove();
  }
}

// category
function checkCategoryMovie(category) {
  if (category == "unefined") {
    return "";
  } else {
    return category;
  }
}

// rating
function checkNumRating(rating) {
  if (!rating) {
    return;
  } else if (rating.includes("%")) {
    return rating.slice(0, 2).split("").join(".");
  } else {
    return rating;
  }
}

// add class rating
function getClassByRate(vote) {
  if (!vote || vote == "null" || vote == "undefined") {
    return "none";
  } else if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

// set events (video/info)
function setEventsVideoOfInfo() {
  const playElems = document.querySelectorAll(".popup-play"),
    infoElems = document.querySelectorAll(".more-information");

  const arrEvents = [playElems, infoElems];

  for (let event of arrEvents) {
    event.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        generateEvents(elem, e);

        modalEl.innerHTML = "";
        showModal();
      });
    });
  }
}

// events, more
function generateEvents(elem, e) {
  if (e.target && e.target.matches(".popup-play")) {
    const playId = elem.getAttribute("id");

    getMovies(`${config.urlVideos}${playId}/videos`);
  } else if (e.target) {
    const infoId = elem.previousElementSibling;

    getMovies(`${config.urlVideos}${infoId.getAttribute("id")}`);
  }
}

export default showMovies;
