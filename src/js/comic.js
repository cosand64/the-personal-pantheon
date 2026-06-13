import { getCharacters , getCreators, getSpecificIssue } from "./api";
import { characterCreditTemplate , creatorsTemplate } from "./templates";

const issueId = window.location.search.substr(4);
const issueImg = document.querySelector(".general-info > img");
const characterCredits = document.querySelector(".character-container");
const creatorCredits = document.querySelector(".creator-container");

async function issueInfo(id) {
    const issueList = await getSpecificIssue(id, '&field_list=description,id,image,character_credits,person_credits,issue_number,name,volume');

    issueImg.setAttribute('src', issueList.image.medium_url);
    document.querySelector(".description").innerHTML = issueList.description;
    document.querySelector("#name").innerHTML = `Name: ${issueList.name}`;
    document.querySelector("#volume").innerHTML = `Volume: ${issueList.volume.name}`;
    document.querySelector("#issue-number").innerHTML = `Issue Number: ${issueList.issue_number}`;
    characterCreditElement(issueList.character_credits);
    creatorCreditElement(issueList.person_credits)
}

async function characterCreditElement(data) {
    const characterIds = data.map(character => character.id).join('|')
    const characterInfo = await getCharacters(`&filter=id:${characterIds}&field_list=id,image,name`)
    characterCredits.innerHTML = "";
    characterCredits.insertAdjacentHTML('afterbegin', characterInfo.map(characterCreditTemplate).join(''));
}

async function creatorCreditElement(data) {
    const creatorIds = data.map(creator => creator.id).join('|')
    const creatorInfo = await getCreators(`&filter=id:${creatorIds}&field_list=id,image,name`)
    creatorCredits.innerHTML = "";
    creatorCredits.insertAdjacentHTML('afterbegin', creatorInfo.map(creatorsTemplate).join(''));
}

function searchRequest() {
    document.querySelector(".general-form").addEventListener("submit", e => {
        e.preventDefault();
        const searchQuery = document.querySelector("#general-search").value;
        console.log(searchQuery);
        window.location.href = `search.html?query=${searchQuery}`;
    })
}

issueInfo(issueId);
searchRequest();