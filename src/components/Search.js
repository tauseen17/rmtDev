import {
  state,
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  getData,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";
import renderPaginationButton from "./Pagination.js";

const submitHandler = async (event) => {
  event.preventDefault();
  //get search value
  const searchtext = searchInputEl.value;

  //validation
  const forbiddenpattern = /[0-9]/;
  const patternMatch = forbiddenpattern.test(searchtext);
  if (patternMatch) {
    renderError("Your search may not contain numbers");
    return;
  }

  //blur the input
  searchInputEl.blur();

  //remove previous job items
  jobListSearchEl.innerHTML = "";

  //reset sorting buttons
  sortingBtnRecentEl.classList.remove("sorting__button--active");
  sortingBtnRelevantEl.classList.add("sorting__button--active");

  //render spinner
  renderSpinner("search");

  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchtext}`);

    const { jobItems } = data; //destructuring

    state.searchJobItems = jobItems;
    state.currentPage = 1;
    renderSpinner("search");

    //render number of result
    numberEl.textContent = jobItems.length;
    //render pagination button
    renderPaginationButton();
    //render job items
    renderJobList();
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }

  //   fetch(`${BASE_API_URL}/jobs?search=${searchtext}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(
  //           "Resource issue (e.g. resource doesn't exits) or server issue"
  //         );
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const { jobItems } = data; //destructuring
  //       renderSpinner("search");

  //       //render number of result

  //       numberEl.textContent = jobItems.length;

  //       //render job items
  //       renderJobList(jobItems);
  //     })
  //     .catch((error) => {
  //       renderSpinner("search");
  //       renderError(error.message);
  //     });
};

searchFormEl.addEventListener("submit", submitHandler);
