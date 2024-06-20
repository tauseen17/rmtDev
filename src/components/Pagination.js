import {
  RESULT_PER_PAGE,
  state,
  paginationEl,
  paginationBtnNextEl,
  paginationBtnBackEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
} from "../common.js";

import renderJobList from "./JobList.js";
const renderPaginationButton = () => {
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }
  //display next button if there are more job else hide it
  if (state.searchJobItems.length - state.currentPage * RESULT_PER_PAGE <= 0) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }
  //update page number
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  //unfocus button
  paginationNumberBackEl.blur();
  paginationNumberNextEl.blur();
};
const clickHandler = (event) => {
  //get clicked button element
  const clickedButtonEl = event.target.closest(".pagination__button");
  //return if NULL
  if (!clickedButtonEl) return;

  //check if intention is next or previous page
  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  nextPage ? state.currentPage++ : state.currentPage--;

  renderPaginationButton();

  renderJobList();
};
paginationEl.addEventListener("click", clickHandler);

export default renderPaginationButton;
