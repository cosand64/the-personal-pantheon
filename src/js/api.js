const baseURL = "https://comicvine.gamespot.com/api/"
const apiKey = import.meta.env.VITE_COMICVINE_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
  };
  let data = {};
  const reponse = await fetch(baseURL + url + `/?api_key=${apiKey}&format=json`);
  // check to make sure the reponse was ok.
  if (reponse.ok) {
    // convert to JSON
    data = await reponse.json();
  } else throw new Error("reponse not ok");
  return data;
}

async function test(){
    const characters = await getJson('characters');
    console.log(characters);
}

test();