const baseURL = "/comicvine"
const apiKey = import.meta.env.VITE_COMICVINE_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
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

// // Function to fetch a list of characters
// async function getStarWarsCharacters() {
//   const baseUrl = 'https://starwars-databank-server.onrender.com/api/v1/characters';

//   try {
//     const response = await fetch(baseUrl);
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
    
//     console.log(data);
    
//   } catch (error) {
//     console.error("Error fetching Star Wars data:", error);
//   }
// }

// getStarWarsCharacters();