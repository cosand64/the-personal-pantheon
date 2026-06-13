import { getSpecificCharacter , getCharacters } from "./api";
const resultsList = document.querySelector(".results-container");

function searchRequest() {
    getCharacters('Batman');
}

function itemPageLoad() {
    resultsList.addEventListener("click", e => {
        e.preventDefault();
        const targetItem = e.target.closest(".result-card");
        if (targetItem.getAttribute('data-type') === 'character') {
            window.location.href = `character.html?id=${targetItem.getAttribute('data-item-id')}`
        }
    })
    
    
}

itemPageLoad();
searchRequest();