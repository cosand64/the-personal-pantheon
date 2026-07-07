import { searchRequest , displayConfirmationMessage , closeConfirmationMessage } from "./navigation.mjs";
import '../css/contact-us.css';

const formBtn = document.querySelector("#submit-btn");
const closeBtn = document.querySelector('#modal .close-button');
const modal = document.querySelector("#modal")
const contactForm = document.querySelector("#contact-right-column > form")

function closeMessageAndResetForm() {
    contactForm.reset();
    closeConfirmationMessage(modal);
}

function init() {
    searchRequest();

    formBtn.addEventListener('click', e => {
        e.preventDefault();
        displayConfirmationMessage(modal);
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