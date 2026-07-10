import { getCharacters , getIssues , getSpecificIssue } from "./api.mjs";
import { featuredTemplate , characterTemplate , comicTemplate } from "./templates.mjs";
import { searchRequest , validateInput } from "./navigation.mjs";
import '../css/style.css';

// Make an api for the first 6 characters in the api and insert them into the character carousel
async function characterInfo() {
    const characters = await getCharacters('&field_list=id,image,name&limit=6');
    document.querySelector('#character').insertAdjacentHTML('afterbegin', characters.map(characterTemplate).join(''));
}

// Make an api for the first 6 comic in the api and insert them into the comic carousel
async function comicInfo() {
    const comics = await getIssues('&field_list=id,image,name&limit=6');
    document.querySelector('#comic').insertAdjacentHTML('afterbegin', comics.map(comicTemplate).join(''));
}

// Make an api for a comic in the api and insert it into the feature element
async function featuredInfo() {
    const featuredContainer = document.querySelector(".featured-section");
    featuredContainer.innerHTML = "";

    let issueList = await getSpecificIssue('1156300', '&field_list=id,image,name,volume');
    featuredContainer.insertAdjacentHTML("afterbegin", featuredTemplate(issueList));
}

// This function sets up the carousels and enables their functionality
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

// wait for all the api calls to be made, then display all the info
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
    document.querySelector("#main-container").classList.add("loaded");
    document.querySelector("#page-loader")?.classList.add("hide");
}

init();