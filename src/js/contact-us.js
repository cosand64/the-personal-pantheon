import { searchRequest , displayConfirmationMessage , closeConfirmationMessage , validateInput } from "./navigation.mjs";
import "../css/contact-us.css";

const formBtn = document.querySelector("#submit-btn");
const closeBtn = document.querySelector("#modal .close-button");
const modal = document.querySelector("#modal");
const contactForm = document.querySelector("#contact-right-column > form");

function closeMessageAndResetForm() {
  contactForm.reset();
  closeConfirmationMessage(modal);
}

function validateEmail(input) {
  const regex = /^[A-Za-z0-9_.@%()+=?/#:;-]{3,}@[A-Za-z0-9.-]{2,}\.[A-Za-z]{2,}$/;
  return regex.test(input);
}

function validatePhone(input) {
  const regex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  return regex.test(input);
}

function validateMessage(input) {
  const regex = /^[A-Za-z0-9\s.,!?'"-]{2,}$/;
  return regex.test(input);
}

function displayErrors(info) {
  const nameValue = document.querySelector("#name").value.trim();
  const emailValue = document.querySelector("#email").value.trim();
  const phoneValue = document.querySelector("#phone").value.trim();
  const messageValue = document.querySelector("#message").value.trim();
  if (!validateInput(nameValue)) {
    info.push("Please input at least 2 characters in the name field");
  }
  if (!validateEmail(emailValue)) {
    info.push("Please input a valid email");
  }
  if (phoneValue) {
    if (!validatePhone(phoneValue)) {
      info.push("Please input a valid phone number");
    }
  }
  if (!validateMessage(messageValue)) {
    info.push("Please input at least 2 characters in the message field");
  }
  return info;
}

function init() {
  searchRequest();

  formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const missingInfo = [];
    const errors = displayErrors(missingInfo);
    if (!errors.length) {
        displayConfirmationMessage(modal);
    } else {
        const errorMessage = errors.join("<br><br>");
        document.querySelector("#modal .modal-content #modal-title").textContent = "ERROR:";
        document.querySelector("#modal .modal-content #modal-description").innerHTML = errorMessage;
        displayConfirmationMessage(modal);
    }

  });

  closeBtn.addEventListener("click", closeMessageAndResetForm);

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
