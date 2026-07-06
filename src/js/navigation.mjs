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
    window.alert("Please input at least 1 character!")
}

export function validateInput(input) {
    const regex = /^[A-Za-z0-9\s':&.,!-]+$/;
    return regex.test(input);
}