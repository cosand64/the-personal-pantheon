import { getGeneralSearch } from "./api.mjs";
import { searchResultTemplate } from "./templates.mjs";
import { errorCard , validateInput, menuToggle } from "./navigation.mjs";

const resultsList = document.querySelector(".results-container");
const pageQuery = new URLSearchParams(window.location.search).get('query');
const searchFilter = document.querySelector("#search-options");
const pageLoader = document.querySelector("#page-loader");
document.querySelector("#general-search").value = '';

// Check if the url query is valid. if not, display the modal with an error message. 
// If not, call the searchFromOtherPage() function.
function searchRequestForm() {
    if (validateInput(pageQuery)) {
        searchFromOtherPage(pageQuery);
    }

    // If the select list is changed at all, change the displayed results to show what is being filtered
    searchFilter.addEventListener('change', async () => {
        resultsList.innerHTML = "";
        pageLoader?.classList.remove("hide");

        const searchQuery = document.querySelector("#general-search").value;
        if (validateInput(searchQuery)) {
            const results = await filterResults(searchQuery);
            pageLoader?.classList.add("hide");
            if (results) {
                resultsList.insertAdjacentHTML('afterbegin', results.map(searchResultTemplate).join(''));
            } else {
                resultsList.insertAdjacentHTML("afterbegin", 'No results found.')
            }
        } else {
            pageLoader?.classList.add("hide");
            errorCard();
        }
    })

    // If there is a value inputted to the search bar, check it and make an api call to get the requested info
    document.querySelector(".general-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const searchQuery = document.querySelector("#general-search").value;
        if (validateInput(searchQuery)) {
            resultsList.innerHTML = "";
            pageLoader?.classList.remove("hide");

            const results = await filterResults(searchQuery);
            pageLoader?.classList.add("hide");
            if (results) {
                resultsList.insertAdjacentHTML('afterbegin', results.map(searchResultTemplate).join(''));
            } else {
                resultsList.insertAdjacentHTML("afterbegin", 'No results found.')
            }
        } else {
            pageLoader?.classList.add("hide");
            errorCard();
        }
    })
}

// If there is a query value in the url, search for the info, then display it on the search page.
async function searchFromOtherPage(keyword) {
    const searchResults = await getGeneralSearch(`&query=${keyword.toString()}&resources=character,issue`);
    pageLoader?.classList.add("hide");
    if (searchResults) {
        resultsList.insertAdjacentHTML('afterbegin', searchResults.map(searchResultTemplate).join(''));
    } else {
        resultsList.innerHTML = 'No results found.'
    }
}

// If the search filter has changed, change the type of api call that is made to display the correct info
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
    menuToggle();
}

init();