const baseURL = "/comicvine/"
const apiKey = import.meta.env.VITE_COMICVINE_API_KEY;

async function getJson(url, urlOptions) {
  const options = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
    }
  };
  let data = {};
  let response = {};
  if (!urlOptions) {
    response = await fetch(baseURL + url + `/?api_key=${apiKey}&format=json`);
  } else {
    response = await fetch(baseURL + url + `/?api_key=${apiKey}&format=json` + urlOptions);
  }
  // check to make sure the reponse was ok.
  if (response.ok) {
    data = await response.json();
  } else throw new Error("response not ok");
  return data;
}

export async function getCharacters(character){
    const characters = await getJson('characters', `&filter=name:${character}`);
    console.log(characters);
}

export async function getIssues(){
    const characters = await getJson('issues');
    console.log(characters);
}

export async function getSpecificCharacter(id, urlOptions){
    const characterResults = await getJson(`character/4005-${id}`, urlOptions);
    return characterResults.results;
}

export async function getSpecificIssue(id, urlOptions){
    const issueResults = await getJson('issues', urlOptions);
    return issueResults.results;
}
