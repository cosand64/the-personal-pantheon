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
    let issueId = Math.floor((Math.random() * 10000) + 1);

    let issueList = await getSpecificIssue(issueId.toString(), '&field_list=id,image,name');

    if (!issueList.image) {
        issueId = Math.floor((Math.random() * 10000) + 1);
        issueList = await getSpecificIssue(issueId.toString(), '&field_list=id,image,name');
    }

    featuredContainer.insertAdjacentHTML("afterbegin", featuredTemplate(issueList));
}

function init() {
    searchRequest();
    featuredInfo();
    comicInfo();
    characterInfo();
}

init();