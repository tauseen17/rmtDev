import { spinnerJobDetailsEl, spinnerSearchEl } from "../common.js";

const renderSpinner = (whichspinner) => {
  const spinnerEl =
    whichspinner === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  spinnerEl.classList.toggle("spinner--visible");
};

export default renderSpinner;
