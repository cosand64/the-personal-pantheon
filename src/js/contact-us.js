import { searchRequest  } from "./navigation.mjs";
import '../css/contact-us.css';

const formBtn = document.querySelector("#submit-btn");
const closeBtn = document.querySelector('.close-button');
const modal = document.querySelector("#modal")
const contactForm = document.querySelector("#contact-right-column > form")

function displayConfirmationMessage() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', false);
}

function closeConfirmationMessage() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', true);
}

function closeMessageAndResetForm() {
    contactForm.reset();
    closeConfirmationMessage();
}

function init() {
    searchRequest();

    formBtn.addEventListener('click', e => {
        e.preventDefault();
        displayConfirmationMessage();
    });

    closeBtn.addEventListener('click', closeMessageAndResetForm);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMessageAndResetForm();
        }
    })

    window.addEventListener('click', e => {
        if (e.target === modal) {
            closeMessageAndResetForm();
        }
    })
}

init();