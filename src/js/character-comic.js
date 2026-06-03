const favBtn = document.querySelector(".fav-btn");

favBtn.addEventListener("click", () => {
    document.querySelector(".saved").classList.toggle('show');
    setTimeout(() => {
        document.querySelector(".saved").classList.toggle('show');
    }, 2000)
})