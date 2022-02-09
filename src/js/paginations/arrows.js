"use strict";

// prev
function prev(arrPages) {
  document.querySelector(".prev").addEventListener("click", (e) => {
    e.preventDefault();

    const activeEl = document.querySelector(".numbers.active"),
      i = activeEl.innerHTML;

    if (i == arrPages[0]) {
      document.querySelectorAll(".numbers")[arrPages.length - 1].click();
    } else {
      activeEl.previousElementSibling.click();
    }

    getCounter(arrPages);
  });
}

// next
function next(arrPages) {
  document.querySelector(".next").addEventListener("click", (e) => {
    e.preventDefault();

    const activeEl = document.querySelector(".numbers.active"),
      i = activeEl.innerHTML;

    if (i == arrPages.length) {
      document.querySelectorAll(".numbers")[0].click();
    } else {
      activeEl.nextElementSibling.click();
    }

    getCounter(arrPages);
  });
}

// counter, right arrows
function getCounter(arrPages) {
  const counter = document.querySelector(".counter"),
    newActiveEl = document.querySelector(".numbers.active");

  counter.innerHTML = `${newActiveEl.innerHTML}/${arrPages.length}`;
}

export { prev, next };
