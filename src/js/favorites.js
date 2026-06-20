import { favoriteTemplate } from "./templates";

function displayFavorites() {
    const characterFavorites = document.querySelector("#saved-characters");
    const comicFavorites = document.querySelector("#saved-comics");
    let favoritesList = JSON.parse(localStorage.getItem("favorites"));
    console.log(favoritesList);
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
            console.log(itemContainer);
            favorites = favorites.filter(favorite => String(favorite.id) !== itemContainer.getAttribute('data-id'))
            console.log(favorites);
            localStorage.setItem("favorites", JSON.stringify(favorites)); 
            itemContainer.remove();
        })
    })
}

displayFavorites();
