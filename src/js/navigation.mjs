export function searchRequest() {

    // When a value is inputted in the search bar in the header, get the value and make sure it is the correct length before redirecting to the search.html to show the results of the search.
    document.querySelector(".general-form").addEventListener("submit", e => {
        e.preventDefault();
        const searchQuery = document.querySelector("#general-search").value;
        if (validateInput(searchQuery)) {
            window.location.href = `search.html?query=${searchQuery}`;
        } else {
            errorCard();
        }
    })
}


export function errorCard(){

    // Get the modal for the search bar and display it.
    const searchModal = document.querySelector("#search-modal");
    displayConfirmationMessage(searchModal);

    // If the close button is pressed, hide the search bar modal
    document.querySelector('main .close-button').addEventListener('click', () => closeConfirmationMessage(searchModal));

    // If the escape button is pressed or is the user clicks on the modal, hide the modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeConfirmationMessage(searchModal);
        }
    })

    window.addEventListener('click', e => {
        if (e.target === searchModal) {
            closeConfirmationMessage(searchModal);
        }
    })
}


export function validateInput(input) {

    // Validate the provided input to make sure their is at least 1 character provided. If so, return true.
    const regex = /^[A-Za-z0-9\s':&.,!-]+$/;
    return regex.test(input);
}

export function displayConfirmationMessage(modal) {
    // add the 'open' class to the provided modal and update attributes
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', false);
}

export function closeConfirmationMessage(modal) {
    // remove the 'open' class to the provided modal and update attributes
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', true);
    
}

export function menuToggle() {
    const menuBtn = document.querySelector("#menu-toggle");
    const menu = document.querySelector("#mobile-menu");

    if (!menuBtn || !menu) return;

    function close() {
        menu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
    }

    function open() {
        menu.classList.add("open");
        menuBtn.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-hidden", "false");
    }

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.contains("open") ? close() : open();
    });

    // Close if clicking anywhere outside the menu/button
    window.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && e.target !== menuBtn) {
            close();
        }
    });

    // Close on Escape
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            close();
        }
    });
}