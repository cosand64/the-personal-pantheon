import { getSpecificCharacter , getIssues } from "./api.mjs";
import { powersTemplate , issuesTemplate , characterInfoTemplate } from "./templates.mjs";
import { favoriteButton } from "./character-comic.mjs";
import { searchRequest , validateInput } from "./navigation.mjs";
import '../css/character.css';

// This function makes the api call for the id that is in the url query. It waits for 
// all the api calls to be made before it displays the info
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

// This function clears any info in the hero banner and displays the new information from the api call
function characterInfoElement(data) {
    const heroBanner = document.querySelector(".hero-banner");
    heroBanner.innerHTML = "";
    heroBanner.insertAdjacentHTML("afterbegin", characterInfoTemplate(data))
}

// This function clears any info in the general info element and displays the new information from the api call
function generalInfoElement(data) {
    const generalInfo = document.querySelector(".general-info");
    generalInfo.innerHTML = "";
    generalInfo.insertAdjacentHTML("afterbegin", data);
}

// This function clears any info in the powers element and displays the new information from the api call
function powersElement(data) {
    const powers = document.querySelector(".powers > ul");
    powers.innerHTML = "";
    powers.insertAdjacentHTML("afterbegin", data.powers.map(powersTemplate).join(""));
}

// This function clears any info in the recent issues element and displays the new information from the api call
async function comicsElement(data) {
    const recentIssues = document.querySelector(".recent-issues");
    const sevenIssues = data.issue_credits.slice(0, 7);
    const issueIds = sevenIssues.map(issue => issue.id).join('|')
    const issuesInfo = await getIssues(`&filter=id:${issueIds}&field_list=id,image`)
    recentIssues.innerHTML = "";
    recentIssues.insertAdjacentHTML('afterbegin', issuesInfo.map(issuesTemplate).join(''));
}

// This function takes the info from the description attribute of the character object and returns the 
// Origin and Creation section information
function checkHTMLContent(html) {
    document.querySelector('.general-info').innerHTML = '';

    // Use the DOMParser classes to make the html in the description attribute from a string into a DOM Document, 
    // which enables the manipulation of the structure in JavaScript.
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');

    // In that DOM document, find all the anchor elements and remove them from the htmlDoc variable
    const anchors = htmlDoc.querySelectorAll('a');
    for (const a of anchors) {
        a.replaceWith(...a.childNodes);
    }

    let extractedHTML = '';
    let capture = false;

    // Make an array of all the children elements in the htmlDoc variable
    const elements = Array.from(htmlDoc.body.children);

    // Check for the 'Origin' and 'Creation' h2 headers, and add those headers with the <p> elements that follow
    // to the extractedHTML variable.
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