// This function adds the character or comic that has its favorite button pressed to the localStorage of the user
// and displays a confirmation message to the user.
export function favoriteButton(item) {
    const favBtn = document.querySelector(".fav-btn");
    
    favBtn.addEventListener("click", () => {
        document.querySelector(".saved").classList.toggle('show');
        setTimeout(() => {
            document.querySelector(".saved").classList.toggle('show');
        }, 2000)
        let favoritesList = [];
        
        if (localStorage.getItem("favorites")) {
            favoritesList = JSON.parse(localStorage.getItem("favorites"));
        }

        if (window.location.href.includes("comic")) {
            favoritesList.push({name:item.name, image:item.image.medium_url, id:item.id, type:'comic'});
        } else if (window.location.href.includes("character")) {
            favoritesList.push({name:item.name, image:item.image.medium_url, id:item.id, type:'character'});
        }

        localStorage.setItem("favorites", JSON.stringify(favoritesList));

    })
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