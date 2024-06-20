import {
  RESULT_PER_PAGE,
  jobDetailsContentEl,
  jobListSearchEl,
  jobListBookmarksEl,
  BASE_API_URL,
  getData,
  state,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

const renderJobList = (whichJobList = "search") => {
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;
  //remove previous job items
  jobListEl.innerHTML = " ";

  let jobItems;
  if (whichJobList === "search") {
    jobItems = state.searchJobItems.slice(
      state.currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
      state.currentPage * RESULT_PER_PAGE
    );
  } else if (whichJobList === "bookmarks") {
    jobItems = state.bookmarkJobItems;
  }

  //display job items

  jobItems.forEach((jobItem) => {
    const newJobEl = `
      <li class="job-item ${
        state.activeJobItem.id === jobItem.id ? "job-item--active" : ""
      }">
          <a class="job-item__link" href="${jobItem.id}">
              <div class="job-item__badge">${jobItem.badgeLetters}</div>
              <div class="job-item__middle">
                  <h3 class="third-heading">${jobItem.title}</h3>
                  <p class="job-item__company">${jobItem.company}</p>
                  <div class="job-item__extras">
                      <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${
                        jobItem.duration
                      }</p>
                      <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${
                        jobItem.salary
                      }</p>
                      <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${
                        jobItem.location
                      }</p>
                  </div>
              </div>
              <div class="job-item__right">
                  <i class="fa-solid fa-bookmark job-item__bookmark-icon ${
                    state.bookmarkJobItems.some(
                      (bookmarkJobItem) => bookmarkJobItem.id === jobItem.id
                    ) && "job-item__bookmark-icon--bookmarked"
                  }"></i>
                  <time class="job-item__time">${jobItem.daysAgo}d</time>
              </div>
          </a>
      </li>`;
    jobListEl.insertAdjacentHTML("beforeend", newJobEl);
  });
};

const clickHandler = async (event) => {
  event.preventDefault();
  //get clicked element
  const jobItemEl = event.target.closest(".job-item");

  //remove active class from previously active job item
  // const activeEl = document.querySelector(".job-item--active");
  // if (activeEl) {
  //   activeEl.classList.remove("job-item--active");
  // }
  document
    .querySelectorAll(".job-item--active")
    .forEach((jobItemWithActiveClass) =>
      jobItemWithActiveClass.classList.remove("job-item--active")
    );

  //add active class
  jobItemEl.classList.add("job-item--active");

  //empty job details section
  jobDetailsContentEl.innerHTML = "";
  renderSpinner("job-details");

  //id of clicked jobItems
  const id = jobItemEl.children[0].getAttribute("href");

  const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
  state.activeJobItem = allJobItems.find((jobItem) => jobItem.id === +id);

  renderJobList();

  //add id to url
  history.pushState(null, "", `/#${id}`);

  //fetch job item data
  try {
    const data = await getData(`${BASE_API_URL}/jobs?search/${id}`);

    const { jobItem } = data;

    renderSpinner("job-details");

    //render job details

    renderJobDetails(jobItem);
  } catch (error) {
    renderSpinner("job-details");
    renderError(error.message);
  }

  // fetch(`${BASE_API_URL}/jobs?search/${id}`)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(
  //         "Resource issue (e.g. resource doesn't exits) or server issue"
  //       );
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     //extract job item
  //     const { jobItem } = data;

  //     renderSpinner("job-details");

  //     //render job details
  //     renderJobDetails(jobItem);
  //   })
  //   .catch((error) => {
  //     renderSpinner("job-details");
  //     renderError(error.message);
  //   });
};
jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);

export default renderJobList;
