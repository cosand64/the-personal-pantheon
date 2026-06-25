// const baseURL = "/comicvine/"\
const baseURL = 'https://comicvine.gamespot.com/api/'
const apiKey = import.meta.env.VITE_COMICVINE_API_KEY;

async function getJson(url, urlOptions) {
  const options = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=31536000',
    }
  };
  let data = {};
  let response = {};
  if (!urlOptions) {
    response = await fetch(baseURL + url + `/?api_key=${apiKey}&format=json`, options);
  } else {
    response = await fetch(baseURL + url + `/?api_key=${apiKey}&format=json` + urlOptions, options);
  }
  // check to make sure the reponse was ok.
  if (response.ok) {
    data = await response.json();
  } else throw new Error("response not ok");
  return data;
}

export async function getGeneralSearch(urlOptions){
    const searchResults = await getJson(`search`, urlOptions);
    return searchResults.results;
}

export async function getCharacters(urlOptions){
    const charactersResults = await getJson('characters', urlOptions);
    return charactersResults.results;
}

export async function getIssues(urlOption){
    const issuesResults = await getJson('issues', urlOption);
    return issuesResults.results;
}

export async function getCreators(id, urlOptions){
    const creatorResults = await getJson(`people`, urlOptions);
    return creatorResults.results;
}

export async function getSpecificCharacter(id, urlOptions){
    const characterResults = await getJson(`character/4005-${id}`, urlOptions);
    return characterResults.results;
}

export async function getSpecificIssue(id, urlOptions){
    const issueResults = await getJson(`issue/4000-${id.toString()}`, urlOptions);
    return issueResults.results;
}


