import { getSpecificCharacter , getIssues } from "./api.mjs";
import { powersTemplate , issuesTemplate , characterInfoTemplate } from "./templates.mjs";
import { favoriteButton } from "./character-comic.mjs";
import { searchRequest , validateInput } from "./navigation.mjs";
import '../css/character.css';

async function characterInfo(id) {
    const characterId = new URLSearchParams(window.location.search).get('id');
    const characterList = await getSpecificCharacter(characterId, '&field_list=deck,description,id,image,powers,issue_credits,name');

    await Promise.all([
        comicsElement(characterList),
        characterInfoElement(characterList),
        generalInfoElement(checkHTMLContent(characterList.description)),
        powersElement(characterList)
    ])
    
    favoriteButton(characterList);

    // Reveal everything once loaded
    document.querySelector(".hero-banner").classList.add("loaded");
    document.querySelector(".character-info").classList.add("loaded");
    document.querySelector(".recent-issues").classList.add("loaded");
}

function characterInfoElement(data) {
    const heroBanner = document.querySelector(".hero-banner");
    heroBanner.innerHTML = "";
    heroBanner.insertAdjacentHTML("afterbegin", characterInfoTemplate(data))
}

function generalInfoElement(data) {
    const generalInfo = document.querySelector(".general-info");
    generalInfo.innerHTML = "";
    generalInfo.insertAdjacentHTML("afterbegin", data);
}

function powersElement(data) {
    const powers = document.querySelector(".powers > ul");
    powers.innerHTML = "";
    powers.insertAdjacentHTML("afterbegin", data.powers.map(powersTemplate).join(""));
}

async function comicsElement(data) {
    const recentIssues = document.querySelector(".recent-issues");
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
    characterInfo();
    searchRequest();
}

init();