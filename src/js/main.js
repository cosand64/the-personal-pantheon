import { getCharacters , getIssues , getSpecificIssue } from "./api";
import { featuredTemplate , characterTemplate , comicTemplate } from "./templates";

async function characterInfo() {
    const characters = await getCharacters('&field_list=id,image,name&limit=6');
    document.querySelector('#character').insertAdjacentHTML('afterbegin', characters.map(characterTemplate).join(''));
}

async function comicInfo() {
    const comics = await getIssues('&field_list=id,image,name&limit=6');
    document.querySelector('#comic').insertAdjacentHTML('afterbegin', comics.map(comicTemplate).join(''));
}

function searchRequest() {
    document.querySelector(".general-form").addEventListener("submit", e => {
        e.preventDefault();
        const searchQuery = document.querySelector("#general-search").value;
        console.log(searchQuery);
        window.location.href = `search.html?query=${searchQuery}`;
    })
}

async function featuredInfo() {
    const featuredContainer = document.querySelector(".featured-section");
    featuredContainer.innerHTML = "";
    const issueId = Math.floor((Math.random() * 100) + 1);

    const issueList = await getSpecificIssue(issueId.toString(), '&field_list=id,image,name');
    console.log(issueList);
    featuredContainer.insertAdjacentHTML("afterbegin", featuredTemplate(issueList));
}

function init() {
    searchRequest();
    featuredInfo();
    comicInfo();
    characterInfo();
}

init();