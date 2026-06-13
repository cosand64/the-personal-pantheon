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

    const characters = issueList.character_credits;
    const characterIds = characters.map(character => character.id).join('|')
    const characterInfo = await getCharacters(`&filter=id:${characterIds}&field_list=id,image,name`)
    characterCredits.innerHTML = "";
    characterCredits.insertAdjacentHTML('afterbegin', characterInfo.map(characterCreditTemplate).join(''));

    const creators = issueList.person_credits;
    const creatorIds = creators.map(creator => creator.id).join('|')
    const creatorInfo = await getCreators(`&filter=id:${creatorIds}&field_list=id,image,name`)
    creatorCredits.innerHTML = "";
    creatorCredits.insertAdjacentHTML('afterbegin', creatorInfo.map(creatorsTemplate).join(''));
}


issueInfo(issueId);