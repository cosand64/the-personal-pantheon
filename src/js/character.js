import { getSpecificCharacter , getIssues } from "./api.mjs";
import { powersTemplate , issuesTemplate } from "./templates.mjs";
import { favoriteButton } from "./character-comic.mjs";
import { searchRequest } from "./navigation.mjs";

const characterId = new URLSearchParams(window.location.search).get('id');
const generalInfo = document.querySelector(".general-info");
const powers = document.querySelector(".powers > ul");
const recentIssues = document.querySelector(".recent-issues");

async function characterInfo(id) {
    const characterList = await getSpecificCharacter(id, '&field_list=deck,description,id,image,powers,issue_credits,name');
    document.querySelector(".image-container > img").setAttribute('src', characterList.image.medium_url);
    document.querySelector(".character-description > h1").innerHTML = characterList.name;
    document.querySelector(".character-description > p").innerHTML = characterList.deck;
    generalInfoElement(checkHTMLContent(characterList.description));
    powersElement(characterList);
    comicsElement(characterList);
    favoriteButton(characterList);
}

function generalInfoElement(data) {
    generalInfo.innerHTML = "";
    generalInfo.insertAdjacentHTML("afterbegin", data);
}

function powersElement(data) {
    powers.innerHTML = "";
    powers.insertAdjacentHTML("afterbegin", data.powers.map(powersTemplate).join(""));
}

async function comicsElement(data) {
    const sevenIssues = data.issue_credits.slice(0, 7);
    const issueIds = sevenIssues.map(issue => issue.id).join('|')
    const issuesInfo = await getIssues(`&filter=id:${issueIds}&field_list=id,image`)
    recentIssues.innerHTML = "";
    recentIssues.insertAdjacentHTML('afterbegin', issuesInfo.map(issuesTemplate).join(''));
}

function checkHTMLContent(html) {
    document.querySelector('.general-info').innerHTML = '';
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');

    const anchors = htmlDoc.querySelectorAll('a');
    for (const a of anchors) {
        a.replaceWith(...a.childNodes);
    }

    let extractedHTML = '';
    let capture = false;

    const elements = Array.from(htmlDoc.body.children);

    for (const element of elements) {
        if (element.tagName === 'H2') {
            const title = element.textContent.trim();
            if (title === 'Origin' || title === 'Creation') {
                capture = true;
            } else {
                capture = false;
            }
        }

        if (capture) {
            extractedHTML += element.outerHTML;
        } 
    }
    return extractedHTML;
}

function init() {
    searchRequest();
    characterInfo(characterId);
}

init();