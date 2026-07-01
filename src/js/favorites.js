import { favoriteTemplate } from "./templates.mjs";
import { searchRequest } from "./navigation.mjs";

const characterFavorites = document.querySelector("#saved-characters");
const comicFavorites = document.querySelector("#saved-comics");

function displayFavorites() {
    let favoritesList = JSON.parse(localStorage.getItem("favorites"));
    checkComicsAndCharacters(favoritesList);
    
    favoritesList.forEach(favorite => {
        if (favorite.type === 'character') {
            characterFavorites.insertAdjacentHTML('afterbegin', favoriteTemplate(favorite));
        } else if (favorite.type === 'comic') {
            comicFavorites.insertAdjacentHTML('afterbegin', favoriteTemplate(favorite));
        }
    });

    removeItem(favoritesList);
}

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

