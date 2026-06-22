export function searchRequest() {
    document.querySelector(".general-form").addEventListener("submit", e => {
        e.preventDefault();
        const searchQuery = document.querySelector("#general-search").value;
        window.location.href = `search.html?query=${searchQuery}`;
    })
}