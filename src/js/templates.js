import { nullName } from "./character-comic";

export function featuredTemplate(info) {
    return `<a href='comic.html?id=${info.id}'>
        <img src='${info.image.screen_large_url}' alt='${info.name} cover'>
    </a>
    <span>
        <a href='comic.html?id=${info.id}'>
            <h2>Featured</h2>
            <h2>${nullName(info.name)}</h2>
        </a>
    </span>`;
}

export function comicTemplate(info) {
    return `<a href='comic.html?id=${info.id}'>
        <img src='${info.image.medium_url}' alt='${info.name} cover'>
    </a>`;
}

export function characterTemplate(info) {
    return `<a href='character.html?id=${info.id}'>
        <img src='${info.image.medium_url}' alt='Image of ${info.name}'>
    </a>`;
}

export function powersTemplate(powers) {
    return `<li>${powers.name}</li>`;
}

export function issuesTemplate(info) {
    return `<a href="comic.html?id=${info.id}">
        <img src="${info.image.medium_url}">
    </a>`;
}

export function characterCreditTemplate(info) {
    return `<a href="character.html?id=${info.id}">
        <img src="${info.image.icon_url}">
        <h3>${nullName(info.name)}</h3>
    </a>`;
}

export function creatorsTemplate(info) {
    return `<span>
        <img src="${info.image.icon_url}">
        <h3>${nullName(info.name)}</h3>
    </span>`;
}

export function searchResultTemplate(info) {
    let pageURL = '';
    let dataType = '';

    if (info.resource_type === 'character') {
        pageURL = `character.html`
        dataType = 'Character'
    } else if (info.resource_type === 'issue') {
        pageURL = `comic.html`
        dataType = 'Comic'
    }

    return `<span class="result-card" data-type="${dataType}" data-id="${info.id}">
        <a href="${pageURL}">
            <img src="${info.image.medium_url}">
            <h2>${nullName(info.name)} (${dataType})</h2>
        </a>
    </span>`;
}

export function favoriteTemplate(info) {
    return `<article class="result-card" data-id='${info.id}'>
        <a href="${info.type}.html?id=${info.id}">
            <img src="${info.image}" alt="Image of ${info.name}">
            <h3>${info.name}</h3>
        </a>
        <button class="remove-btn">Remove</button>
    </article>`
}