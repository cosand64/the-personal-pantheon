import { getGeneralSearch } from "./api";
import { searchResultTemplate } from "./templates";

const resultsList = document.querySelector(".results-container");
document.querySelector("#general-search").value = '';

function searchRequest() {
    resultsList.innerHTML = "";
    document.querySelector(".general-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchQuery = document.querySelector("#general-search").value;
        const searchResults = await getGeneralSearch(`&query=${searchQuery.toString()}&resources=character,issue`);
        if (searchResults) {
            resultsList.insertAdjacentHTML('afterbegin', searchResults.map(searchResultTemplate).join(''));
        } else {
            resultsList.innerHTML = '<p>No results found.</p>'
        }
    })
}





resultsList.addEventListener("click", (e) => {
    e.preventDefault();
    const targetItem = e.target.closest(".result-card");
    if (targetItem.getAttribute('data-type') === 'Character') {
        window.location.href = `character.html?id=${targetItem.getAttribute('data-id')}`
    } else if (targetItem.getAttribute('data-type') === 'Comic') {
        window.location.href = `comic.html?id=${targetItem.getAttribute('data-id')}`
    }
})


searchRequest();