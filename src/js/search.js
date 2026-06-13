import { getGeneralSearch } from "./api";
import { searchResultTemplate } from "./templates";

const resultsList = document.querySelector(".results-container");
const query = window.location.search.substr(7);
const searchFilter = document.querySelector("#search-options").value
document.querySelector("#general-search").value = '';

function searchRequest() {
    if (query) {
        searchFromOtherPage(query);
    }

    document.querySelector(".general-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        let searchResults = {};
        resultsList.innerHTML = "";
        const searchQuery = document.querySelector("#general-search").value;
        
        if (searchFilter === 'All') {
            searchResults = await getGeneralSearch(`&query=${searchQuery.toString()}&resources=character,issue`);
        } else if (searchFilter === 'Character') {
            searchResults = await getGeneralSearch(`&query=${searchQuery.toString()}&resources=character`);
        } else if (searchFilter === 'Comic') {
            searchResults = await getGeneralSearch(`&query=${searchQuery.toString()}&resources=issue`);
            console.log(searchResults);
        }

        if (searchResults) {
            resultsList.insertAdjacentHTML('afterbegin', searchResults.map(searchResultTemplate).join(''));
        } else {
            resultsList.innerHTML = 'No results found.'
        }
    })
}

async function searchFromOtherPage(keyword) {
    const searchResults = await getGeneralSearch(`&query=${keyword.toString()}&resources=character,issue`);
    if (searchResults) {
        resultsList.insertAdjacentHTML('afterbegin', searchResults.map(searchResultTemplate).join(''));
    } else {
        resultsList.innerHTML = 'No results found.'
    }
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