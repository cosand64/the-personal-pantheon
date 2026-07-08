import { favoriteTemplate } from "./templates.mjs";
import { searchRequest , validateInput } from "./navigation.mjs";

const characterFavorites = document.querySelector("#saved-characters");
const comicFavorites = document.querySelector("#saved-comics");

// Retrieve all the information from the 'favorites' object in localStorage, then display
// each item on the favorites.html page
function displayFavorites() {
    let favoritesList = JSON.parse(localStorage.getItem("favorites"));
    checkComicsAndCharacters(favoritesList);
    
    // If the item in the 'favorites' object is a charactor or comic, input it into the correct
    // element on the page
    favoritesList.forEach(favorite => {
        if (favorite.type === 'character') {
            characterFavorites.insertAdjacentHTML('afterbegin', favoriteTemplate(favorite));
        } else if (favorite.type === 'comic') {
            comicFavorites.insertAdjacentHTML('afterbegin', favoriteTemplate(favorite));
        }
    });

    removeItem(favoritesList);
}

// If the remove button is pressed, remove the item from the 'favorites' object and from the 
// favorites.html page
function removeItem(favorites) {
    const removeButton = document.querySelectorAll(".remove-btn");
    removeButton.forEach((button) => {
        button.addEventListener("click", e => {
            const itemContainer = e.currentTarget.closest('article');
            favorites = favorites.filter(favorite => String(favorite.id) !== itemContainer.getAttribute('data-id'))
            checkComicsAndCharacters(favorites);
            localStorage.setItem("favorites", JSON.stringify(favorites)); 
            itemContainer.remove();

        })
    })
}

// Check if the item in the 'favorites' object is a character or a comic
function checkComicsAndCharacters(list) {
    if (!list.find((favorite) => favorite.type === "character")) {
        characterFavorites.innerHTML = '';
        characterFavorites.insertAdjacentHTML("afterbegin", "No saved characters yet");
    }

    if (!list.find((favorite) => favorite.type === "comic")) {
        comicFavorites.innerHTML = '';
        comicFavorites.insertAdjacentHTML("afterbegin", "No saved comics yet");
    }
}

function init() {
    displayFavorites();
    searchRequest();
}

init();

