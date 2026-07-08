import { nullName } from "./character-comic.mjs";

// This module has all the templates used for displaying the information on the main.html, search.html,
// character.html, comic.html, and favorites.html

export function featuredTemplate(info) {
    return `<a href='comic.html?id=${info.id}'>
        <img src='${info.image.screen_large_url}' alt='${nullName(info)} cover'>
    </a>
    <span>
        <a href='comic.html?id=${info.id}'>
            <h2>Featured:</h2>
            <h2>${nullName(info)}</h2>
        </a>
    </span>`;
}

export function comicTemplate(info) {
    return `<a href='comic.html?id=${info.id}'>
        <img src='${info.image.small_url}' alt='${nullName(info)} cover' loading="lazy">
    </a>`;
}

export function characterTemplate(info) {
    return `<a href='character.html?id=${info.id}'>
        <img src='${info.image.small_url}' alt='Image of ${nullName(info)}' loading="lazy">
    </a>`;
}

export function characterInfoTemplate(info) {
    return `<div class='image-container'>
        <img src='${info.image.small_url}' alt='Image of ${nullName(info)}' width="300" height="400">
    </div>
    <div class='character-description'>
        <h1>${nullName(info)}</h1>
        <p>${info.deck}</p>
        <button class="fav-btn">Favorite</button>
        <div class="saved">Character saved!</div>
    </div>`
}

export function powersTemplate(powers) {
    return `<li>${powers.name}</li>`;
}

export function issuesTemplate(info) {
    return `<a href="comic.html?id=${info.id}">
        <img src="${info.image.small_url}" loading="lazy" alt='Image of ${nullName(info)}' width="162" height="250">
    </a>`;
}

export function issueTemplate(info) {
    return `<img src='${info.image.small_url}' alt='Image of ${nullName(info)}' fetchpriority=high>
    <section class='issue-details'>
        <h2>Issue Details</h2>
        <div id='name'>Name: ${nullName(info)}</div>
        <div id='volume'>Volume: ${info.volume.name}</div>
        <div id='issue-number'>Issue Number: ${info.issue_number}</div>
    </section>`
}

export function characterCreditTemplate(info) {
    return `<a href="character.html?id=${info.id}">
        <img src="${info.image.tiny_url}" loading="lazy" alt='Image of ${nullName(info)}' width='30' height='30'>
        <h3>${nullName(info)}</h3>
    </a>`;
}

export function creatorsCreditTemplate(info) {
    return `<span>
        <img src="${info.image.tiny_url}" loading="lazy" alt='Image of ${nullName(info)}'>
        <h3>${nullName(info)}</h3>
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

    return `<article class="result-card" data-type="${dataType}" data-id="${info.id}">
        <a href="${pageURL}?id=${info.id}">
            <img src="${info.image.small_url}" loading="lazy" alt='Image of ${nullName(info)}'>
            <h2>${nullName(info)} (${dataType})</h2>
        </a>
    </article>`;
}

export function favoriteTemplate(info) {
    return `<article class="result-card" data-id='${info.id}'>
        <a href="${info.type}.html?id=${info.id}">
            <img src="${info.image}" alt="Image of ${nullName(info)}">
            <h3>${nullName(info)}</h3>
        </a>
        <button class="remove-btn">Remove</button>
    </article>`
}