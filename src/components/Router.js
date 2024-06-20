import {
  jobDetailsContentEl,
  BASE_API_URL,
  getData,
  state,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";
import renderJobList from "./JobList.js";

const loadHandler = async () => {
  //remove the active class from previously active item
  document
    .querySelectorAll(".job-item--active")
    .forEach((jobItemWithActiveClass) =>
      jobItemWithActiveClass.classList.remove("job-item--active")
    );

  const id = window.location.hash.substring(1);

  if (id) {
    jobDetailsContentEl.innerHTML = "";

    renderSpinner("job-details");
    try {
      const data = await getData(`${BASE_API_URL}/jobs?search/${id}`);

      const { jobItem } = data;

      state.activeJobItem = jobItem;

      renderJobList();

      renderSpinner("job-details");

      //render job details

      renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner("job-details");
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHandler);
window.addEventListener("hashchange", loadHandler);
