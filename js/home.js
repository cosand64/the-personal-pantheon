const baseURL = "https://comicvine.gamespot.com/api/";
const apiKey = import.meta.env.VITE_COMICVINE_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  let data = {};
  const reponse = await fetch(baseURL + url, options);
  // check to make sure the reponse was ok.
  if (reponse.ok) {
    // convert to JSON
    data = await reponse.json();
  } else throw new Error("reponse not ok")
  return data;
}

console.log(getJson("characters"));

