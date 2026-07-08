import { getCharacters , getCreators, getSpecificIssue } from "./api.mjs";
import { characterCreditTemplate , creatorsCreditTemplate , issueTemplate } from "./templates.mjs";
import { favoriteButton } from "./character-comic.mjs";
import { searchRequest , validateInput } from "./navigation.mjs";
import '../css/comic.css';

const issueId = new URLSearchParams(window.location.search).get('id');
const characterCredits = document.querySelector(".character-container");
const creatorCredits = document.querySelector(".creator-container");

// This function makes the api call for the id that is in the url query. It waits for 
// all the api calls to be made before it displays the info
async function issueInfo(id) {
    const issueList = await getSpecificIssue(id, '&field_list=description,id,image,character_credits,person_credits,issue_number,name,volume');
    document.querySelector(".general-info").insertAdjacentHTML('afterbegin', issueTemplate(issueList));
    document.querySelector(".description").innerHTML = issueList.description;

    await Promise.all([
        characterCreditElement(issueList.character_credits),
        creatorCreditElement(issueList.person_credits)
    ])
    
    favoriteButton(issueList);

    // Reveal everything once it is loaded
    document.querySelector(".comic-container").classList.add("loaded");
}

// Get which characters are in the comic and return them
async function characterCreditElement(data) {
    const characterIds = data.map(character => character.id).join('|')
    const characterInfo = await getCharacters(`&filter=id:${characterIds}&field_list=id,image,name`)
    characterCredits.innerHTML = "";
    characterCredits.insertAdjacentHTML('afterbegin', characterInfo.map(characterCreditTemplate).join(''));
}

// Get the creators involved with the comic and return then
async function creatorCreditElement(data) {
    const creatorIds = data.map(creator => creator.id).join('|')
    const creatorInfo = await getCreators(`&filter=id:${creatorIds}&field_list=id,image,name`)
    creatorCredits.innerHTML = "";
    creatorCredits.insertAdjacentHTML('afterbegin', creatorInfo.map(creatorsCreditTemplate).join(''));
}

function init() {
    issueInfo(issueId);
    searchRequest();
}

init();
