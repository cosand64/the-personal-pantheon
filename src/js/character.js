import { getSpecificCharacter , getIssues } from "./api";
import { powersTemplate , issuesTemplate } from "./templates";

const characterId = window.location.search.substr(4);
const generalInfo = document.querySelector(".general-info");
const powers = document.querySelector(".powers > ul");
const recentIssues = document.querySelector(".recent-issues");

async function characterInfo(id) {
    const characterList = await getSpecificCharacter(id, '&field_list=deck,description,id,image,powers,issue_credits,name');
    document.querySelector(".image-container > img").setAttribute('src', characterList.image.medium_url);
    document.querySelector(".character-description > h1").innerHTML = characterList.name;
    document.querySelector(".character-description > p").innerHTML = characterList.deck;
    const extractedData = checkHTMLContent(characterList.description);

    generalInfo.innerHTML = "";
    generalInfo.insertAdjacentHTML("afterbegin", extractedData);

    powers.innerHTML = "";
    powers.insertAdjacentHTML("afterbegin", characterList.powers.map(powersTemplate).join(""));


    const fiveIssues = characterList.issue_credits.slice(0, 7);
    const issueIds = fiveIssues.map(issue => issue.id).join('|')
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


characterInfo(characterId);