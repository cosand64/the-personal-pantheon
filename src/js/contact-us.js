import { searchRequest , displayConfirmationMessage , closeConfirmationMessage , validateInput, menuToggle } from "./navigation.mjs";
import "../css/contact-us.css";

const formBtn = document.querySelector("#submit-btn");
const closeBtn = document.querySelector("#modal .close-button");
const modal = document.querySelector("#modal");
const contactForm = document.querySelector("#contact-right-column > form");

// When the form modal is closed, reset the contact form as well
function closeMessageAndResetForm() {
  closeConfirmationMessage(modal);
}

// Validate the inputted email to verify it is the correct format
function validateEmail(input) {
  const regex = /^[A-Za-z0-9_.@%()+=?/#:;-]{3,}@[A-Za-z0-9.-]{2,}\.[A-Za-z]{2,}$/;
  console.log(regex.test(input));
  return regex.test(input);
}

// Validate the inputted phone to verify it is the correct format
function validatePhone(input) {
  const regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  return regex.test(input);
}

// Validate the inputted message to verify it is the correct format
function validateMessage(input) {
  const regex = /^[A-Za-z0-9\s.,!?'"-]{2,}$/;
  return regex.test(input);
}

// If any of the inputted information is not valid, input error messages that explain what is wrong to the form modal
// then display the form modal for the user to see
function displayErrors(info) {
  // Get all the input fields
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const messageInput = document.querySelector("#message");

  // Get all the values in the input fields
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const messageValue = messageInput.value.trim();
  if (!validateInput(nameValue)) {
    info.push("Please input at least 2 characters in the name field");
    nameInput.classList.add("error-highlight");
  } else {
    nameInput.classList.remove("error-highlight");
  }

  if (!validateEmail(emailValue)) {
    info.push("Please input a valid email");
    emailInput.classList.add("error-highlight");
  } else {
    emailInput.classList.remove("error-highlight");
  }

  if (phoneValue) {
    if (!validatePhone(phoneValue)) {
      info.push("Please input a valid phone number");
      phoneInput.classList.add("error-highlight");
    } else {
      phoneInput.classList.remove("error-highlight");
    }
  } else {
    phoneInput.classList.remove("error-highlight");
  }

  if (!validateMessage(messageValue)) {
    info.push("Please input at least 2 characters in the message field");
    messageInput.classList.add("error-highlight");
  } else {
    messageInput.classList.remove("error-highlight");
  }

  return info;
}


function init() {
  searchRequest();
  menuToggle();

  // When the form is submitted, check if there are any errors or not.
  // If not, display the form modal. If there are, display an error message
  // in the modal with all the issues the form input has.
  formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const missingInfo = [];
    const errors = displayErrors(missingInfo);
    console.log(errors);
    if (!errors.length) {
        // Display a thank you message. For now, the information in the form is not sent anywhere.
        document.querySelector("#modal .modal-content #modal-title").textContent = "Messaged Sent!";
        document.querySelector("#modal .modal-content #modal-description").textContent = "Thank you for your message! Please wait 24 hours for a response from our team";
        displayConfirmationMessage(modal);
        contactForm.reset();
    } else {
        const errorMessage = errors.join("<br><br>");
        document.querySelector("#modal .modal-content #modal-title").textContent = "ERROR:";
        document.querySelector("#modal .modal-content #modal-description").innerHTML = errorMessage;
        displayConfirmationMessage(modal);
    }

  });

  // If the close button is pressed, hide the search bar modal
  closeBtn.addEventListener("click", closeMessageAndResetForm);

  // If the escape button is pressed or is the user clicks on the modal, hide the modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMessageAndResetForm();
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeMessageAndResetForm();
    }
  });
}

init(); 
