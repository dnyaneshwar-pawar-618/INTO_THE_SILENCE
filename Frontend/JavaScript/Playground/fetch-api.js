// let URL = "https://api.api-ninjas.com/v1/planets?name=Saturn";

// async function fetchData() {
//     try {
//         let response = await fetch(URL, {
//             method: "GET",
//             headers: {
//                 "X-Api-Key": "nZigw64xq0WYsXqqgz8LAE0H1HsN8l3Ydkevqyxh",
//                 "Content-Type": "application/json"
//             }
//         });

//         if (!response.ok) {
//             throw new Error("HTTP error! status: " + response.status);
//         }

//         let data = await response.json();
//         console.log(data);

//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// // fetchData();


/*
async function fetchPlanet() {
    const url = 'https://planets-by-api-ninjas.p.rapidapi.com/v1/planets?name=Mars';

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ccd466a881msh52f63217a42cec1p1e2b49jsn841949371378',
            'x-rapidapi-host': 'planets-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const result = await response.json();
        console.log(result);

    } catch (error) {
        console.error("Error:", error);
    }
}

// fetchPlanet();
*/
// &type=search&api_key=${SERPAPI_KEY}

let URL = `https://serpapi.com/search.json?engine=google_maps&q=Coffee`

async function fetch() {
    let response = await fetch(URL);
    let data = await response.json()
    console.log(data)
}