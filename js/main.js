let isDarkMode = localStorage.getItem("isDarkMode") === "true";

/**
 * Applies the appropriate color scheme to the document based on the current mode.
 *
 * @return {void} This function does not return anything.
 */
function applyMode() {
  if (isDarkMode) {
    document.documentElement.style.setProperty(
      "--current-bg-color",
      "var(--bg-color-dark)"
    );
    document.documentElement.style.setProperty(
      "--current-text-color",
      "var(--text-color-dark)"
    );
    document.documentElement.style.setProperty(
      "--current-bg-img",
      "var(--bg-img-dark)"
    );
  } else {
    document.documentElement.style.setProperty(
      "--current-bg-color",
      "var(--bg-color-light)"
    );
    document.documentElement.style.setProperty(
      "--current-text-color",
      "var(--text-color-light)"
    );
    document.documentElement.style.setProperty(
      "--current-bg-img",
      "var(--bg-img-light)"
    );
  }
  document.body.style.backgroundImage = "var(--current-bg-img)";
  document.body.style.backgroundColor = "var(--current-bg-color)";
  document.body.style.color = "var(--current-text-color)";
}

/**
 * Toggles the mode between light and dark and updates the local storage accordingly.
 *
 * @return {void} This function does not return a value.
 */
function toggleMode() {
  isDarkMode = !isDarkMode;
  localStorage.setItem("isDarkMode", isDarkMode);
  applyMode();
}

applyMode();

// form validation
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const messageEl = document.getElementById("message");
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success_msg");
const progress = document.getElementById("progress");

/**
 * Validates the name input field.
 *
 * @return {boolean} Returns true if the name is valid, false otherwise.
 */
const checkName = () => {
  let valid = false;
  const min = 3,
    max = 25;

  const name = nameEl.value.trim();

  if (!isRequired(name)) {
    showError(nameEl, "Name is required.");
  } else if (!isBetween(name.length, min, max)) {
    showError(nameEl, `Username must be between ${min} and ${max} characters.`);
  } else {
    showSuccess(nameEl);
    valid = true;
  }
  return valid;
};

/**
 * Checks if the email entered in the emailEl input field is valid.
 *
 * @return {boolean} Returns true if the email is valid, false otherwise.
 */

/**
 * Function to check the validity of an email input.
 *
 * @return {boolean} The validity of the email input
 */
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email is required.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

/**
 * Function to check the message input for validity.
 *
 * @return {boolean} The validity of the message input.
 */
const checkMessage = () => {
  let valid = false;
  const message = messageEl.value.trim();
  if (!isRequired(message)) {
    showError(messageEl, "Message is required.");
  } else {
    showSuccess(messageEl);
    valid = true;
  }
  return valid;
};

/**
 * Validates the given email address.
 *
 * @param {string} email - the email address to validate
 * @return {boolean} true if the email is valid, false otherwise
 */
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * Checks if the given value is required.
 *
 * @param {string} value - The value to check.
 * @return {boolean} true if the value is required, false otherwise
 */
const isRequired = (value) => (value === "" ? false : true);

/**
 * Checks if the given length is between the given min and max values.
 *
 * @param {number} length - The length to check.
 * @param {number} min - The minimum length.
 * @param {number} max - The maximum length.
 * @return {boolean} true if the length is between the min and max values, false otherwise
 */
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

/**
 * Shows the error message for the given input field.
 *
 * @param {HTMLElement} input - The input field to show the error message for.
 * @param {string} message - The error message to show.
 */
const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

/**
 * Shows the success message for the given input field.
 *
 * @param {HTMLElement} input - The input field to show the success message for.
 */
const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

/**
 * Adds an event listener to the form submit button.
 *
 * @param {HTMLElement} form - The form element to add the event listener to.
 * @returns {void}
 * @throws {Error} If the form is not found.
 * */
form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isUsernameValid = checkName(),
    isEmailValid = checkEmail(),
    isMessageValid = checkMessage();

  let isFormValid = isUsernameValid && isEmailValid && isMessageValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    successMessage.style.display = "block";
    animateProgress();
    setTimeout(function () {
      successMessage.style.display = "none";
    }, 3000);
  }
});

/**
 * Debounce the form submission function.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

/**
 * Event listeners for the form inputs and submit button.
 *
 * @param {Event} e - The event object.
 * @returns {void}
 * @throws {Error} If the form is not found.
 */
form.addEventListener(
  "change",
  debounce(function (e) {
    switch (e.target.id) {
      case "name":
        checkName();
        break;
      case "email":
        checkEmail();
        break;
      case "message":
        checkMessage();
        break;
    }
  })
);

let interval;
const closeBtn = document.getElementById("close_btn");

closeBtn.addEventListener("click", () => {
  successMessage.style.display = "none";
  console.log(interval);
  if (interval) {
    clearInterval(interval);
  }
});

function animateProgress() {
  let width = 100;
  interval = setInterval(frame, 30); // Adjust the animation speed by changing the interval value

  function frame() {
    if (width <= 0) {
      clearInterval(interval);
    } else {
      width--;
      progress.style.width = width + "%";
    }
  }
}
