import { nullName } from "./character-comic.mjs";

export function featuredTemplate(info) {
    return `<a href='comic.html?id=${info.id}'>
        <img src='${info.image.screen_large_url}' alt='${info.name} cover' loading="lazy">
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
        <img src='${info.image.small_url}' alt='${info.name} cover' loading="lazy">
    </a>`;
}

export function characterTemplate(info) {
    return `<a href='character.html?id=${info.id}'>
        <img src='${info.image.small_url}' alt='Image of ${info.name}' loading="lazy">
    </a>`;
}

export function powersTemplate(powers) {
    return `<li>${powers.name}</li>`;
}

export function issuesTemplate(info) {
    return `<a href="comic.html?id=${info.id}">
        <img src="${info.image.small_url}" loading="lazy" alt='Image of ${info.name}'>
    </a>`;
}

export function issueTemplate(info) {
    return `<img src='${info.image.small_url}' alt='Image of ${info.name}'>
    <section class='issue-details'>
        <h2>Issue Details</h2>
        <div id='name'>Name: ${nullName(info.name)}</div>
        <div id='volume'>Volume: ${info.volume.name}</div>
        <div id='issue-number'>Issue Number: ${info.issue_number}</div>
    </section>`
}

export function characterCreditTemplate(info) {
    return `<a href="character.html?id=${info.id}">
        <img src="${info.image.tiny_url}" loading="lazy" alt='Image of ${info.name}'>
        <h3>${nullName(info.name)}</h3>
    </a>`;
}

export function creatorsCreditTemplate(info) {
    return `<span>
        <img src="${info.image.tiny_url}" loading="lazy" alt='Image of ${info.name}'>
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
            <img src="${info.image.small_url}" loading="lazy" alt='Image of ${info.name}'>
            <h2>${nullName(info.name)} (${dataType})</h2>
        </a>
    </span>`;
}

export function favoriteTemplate(info) {
    return `<article class="result-card" data-id='${info.id}'>
        <a href="${info.type}.html?id=${info.id}">
            <img src="${info.image}" alt="Image of ${info.name}" loading="lazy" alt='Image of ${info.name}'>
            <h3>${info.name}</h3>
        </a>alt='Image of ${info.name}'
        <button class="remove-btn">Remove</button>
    </article>`
}