import { getCharacters , getIssues , getSpecificIssue } from "./api.mjs";
import { featuredTemplate , characterTemplate , comicTemplate } from "./templates.mjs";
import { searchRequest } from "./navigation.mjs";

async function characterInfo() {
    const characters = await getCharacters('&field_list=id,image,name&limit=6');
    document.querySelector('#character').insertAdjacentHTML('afterbegin', characters.map(characterTemplate).join(''));
}

async function comicInfo() {
    const comics = await getIssues('&field_list=id,image,name&limit=6');
    document.querySelector('#comic').insertAdjacentHTML('afterbegin', comics.map(comicTemplate).join(''));
}

async function featuredInfo() {
    const featuredContainer = document.querySelector(".featured-section");
    featuredContainer.innerHTML = "";

    let issueList = await getSpecificIssue('1156300', '&field_list=id,image,name');

    featuredContainer.insertAdjacentHTML("afterbegin", featuredTemplate(issueList));
}

/** 
    @param {string} wrapperId 
*/
function setupCarousel(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const container = wrapper.closest('.carousel-container');
    if (!container) return;

    const prevBtn = container.querySelector('.carousel-arrow.prev');
    const nextBtn = container.querySelector('.carousel-arrow.next');
    const scrollAmount = 540; 

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
}

async function init() {
    await Promise.all([
        featuredInfo(),
        comicInfo(),
        characterInfo()
    ]);

    setupCarousel('comic');
    setupCarousel('character');

    searchRequest();

    // Once everything is loaded, reveal it.
    document.querySelector("main > div").classList.add("loaded");
}

init();