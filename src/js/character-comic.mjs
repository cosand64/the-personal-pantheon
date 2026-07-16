// This function adds the character or comic that has its favorite button pressed to the localStorage of the user
// and displays a confirmation message to the user.
export function favoriteButton(item) {
    const favBtn = document.querySelector(".fav-btn");
    const savedMsg = document.querySelector(".saved");

    if (!favBtn) return;

    const isComic = window.location.href.includes("comic");
    const itemType = isComic ? 'comic' : 'character';

    let favoritesList = [];
    if (localStorage.getItem("favorites")) {
        favoritesList = JSON.parse(localStorage.getItem("favorites"));
    }

    let isFavorited = favoritesList.some(fav => fav.id === item.id && fav.type === itemType);

    if (isFavorited) {
        favBtn.textContent = "Favorited";
        favBtn.classList.add("favorited");
    }
    
   favBtn.addEventListener("click", () => {
        favoritesList = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
        isFavorited = favoritesList.some(fav => fav.id === item.id && fav.type === itemType);

        if (isFavorited) {
            // UNFAVORITE LOGIC
            favoritesList = favoritesList.filter(fav => !(fav.id === item.id && fav.type === itemType));
            
            favBtn.textContent = "Favorite";
            favBtn.classList.remove("favorited");
            
            if (savedMsg) {
                savedMsg.textContent = isComic ? "Comic removed!" : "Character removed!";
                // savedMsg.style.color = "var(--extra-color, red)"; 
            }
        } else {
            // FAVORITE LOGIC 
            favoritesList.push({
                name: item.name, 
                image: item.image.medium_url, 
                id: item.id, 
                type: itemType
            });
            
            favBtn.textContent = "Favorited";
            favBtn.classList.add("favorited");
            
            if (savedMsg) {
                savedMsg.textContent = isComic ? "Comic saved!" : "Character saved!";
            }
        }

        localStorage.setItem("favorites", JSON.stringify(favoritesList));

        // ANIMATIONS & VISUALS 
        favBtn.classList.add("animate");
        setTimeout(() => {
            favBtn.classList.remove("animate");
        }, 1000);

        if (savedMsg) {
            savedMsg.classList.add('show');

            if (favBtn.timeoutId) clearTimeout(favBtn.timeoutId);
            
            favBtn.timeoutId = setTimeout(() => {
                savedMsg.classList.remove('show');
            }, 2000);
        }
    });
}

// If the name attribute is null, return the volumne name or 'N/A'. If not, return the name attribute
export function nullName(info) {
    if (info.name === null) {
        try {
            return info.volume.name;
        } catch {
            return 'N/A';
        }
    } else {
        return info.name;
    }
}