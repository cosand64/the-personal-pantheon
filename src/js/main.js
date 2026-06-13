import { getCharacters , getIssues } from "./api";
import { characterTemplate , comicTemplate } from "./templates";

async function characterInfo() {
    const characters = await getCharacters('&field_list=id,image,name&limit=6');
    document.querySelector('#character').insertAdjacentHTML('afterbegin', characters.map(characterTemplate).join(''));
}

async function comicInfo() {
    const comics = await getIssues('&field_list=id,image,name&limit=6');
    document.querySelector('#comic').insertAdjacentHTML('afterbegin', comics.map(comicTemplate).join(''));
}

function init() {
    comicInfo();
    characterInfo();
}

init();