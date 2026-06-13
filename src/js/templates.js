export function powersTemplate(powers) {
    return `<li>${powers.name}</li>`
}

export function issuesTemplate(info) {
    return `<a href="comic.html?id=${info.id}">
        <img src="${info.image.medium_url}">
    </a>`
}