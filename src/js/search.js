import { getGeneralSearch } from "./api.mjs";
import { searchResultTemplate } from "./templates.mjs";
import { errorCard , validateInput } from "./navigation.mjs";

const resultsList = document.querySelector(".results-container");
const pageQuery = new URLSearchParams(window.location.search).get('query');
const searchFilter = document.querySelector("#search-options")
document.querySelector("#general-search").value = '';

function searchRequestForm() {
    if (pageQuery && validateInput(pageQuery)) {
        searchFromOtherPage(pageQuery);
    } else {
        errorCard();
    }

    searchFilter.addEventListener('change', async () => {
        resultsList.innerHTML = "";

        const searchQuery = document.querySelector("#general-search").value;
        if (validateInput(searchQuery)) {
            const results = await filterResults(searchQuery);
            console.log(results);
            if (results) {
                resultsList.insertAdjacentHTML('afterbegin', results.map(searchResultTemplate).join(''));
            } else {
                resultsList.insertAdjacentHTML("afterbegin", 'No results found.')
            }
        } else {
            errorCard();
        }
    })

    document.querySelector(".general-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        resultsList.innerHTML = "";
        
        const searchQuery = document.querySelector("#general-search").value;
        const results = await filterResults(searchQuery);
        if (results) {
            resultsList.insertAdjacentHTML('afterbegin', results.map(searchResultTemplate).join(''));
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

async function filterResults(query) {
    if (searchFilter.value === 'Character') {
        return await getGeneralSearch(`&query=${query}&resources=character`);
    } else if (searchFilter.value === 'Comic') {
        return await getGeneralSearch(`&query=${query}&resources=issue`);
    } else {
        return await getGeneralSearch(`&query=${query}&resources=character,issue`);
    }
}

function init() {
    searchRequestForm();
}

init();