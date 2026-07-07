export function searchRequest() {
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
    const searchModal = document.querySelector("#search-modal");
    displayConfirmationMessage(searchModal);

    document.querySelector('main .close-button').addEventListener('click', () => closeConfirmationMessage(searchModal));

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
    const regex = /^[A-Za-z0-9\s':&.,!-]+$/;
    return regex.test(input);
}

export function displayConfirmationMessage(modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', false);
}

export function closeConfirmationMessage(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', true);
    
}