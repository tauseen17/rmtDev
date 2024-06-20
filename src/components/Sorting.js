import {
  state,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderJobList from "./JobList.js";
import renderPaginationButton from "./Pagination.js";
const Handleclick = (event) => {
  //get clicked element button
  const clickbuttonEL = event.target.closest(".sorting__button");

  //stop the function if element other than button is clicked
  if (!clickbuttonEL) return;

  state.currentPage = 1;
  //get recent items
  const recent = clickbuttonEL.className.includes("--recent") ? true : false;

  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }
  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }
  //reset pagination button
  renderPaginationButton();
  renderJobList();
};
sortingEl.addEventListener("click", Handleclick);
