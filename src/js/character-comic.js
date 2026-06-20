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
            console.log(favoritesList);
        }

        if (window.location.href.includes("comic")) {
            favoritesList.push({name:item.name, image:item.image.medium_url, id:item.id, type:'comic'});
        } else if (window.location.href.includes("character")) {
            favoritesList.push({name:item.name, image:item.image.medium_url, id:item.id, type:'character'});
        }

        localStorage.setItem("favorites", JSON.stringify(favoritesList));

    })
}

export function nullName(name) {
    if (name === null) {
        return 'N/A';
    } else {
        return name;
    }
}