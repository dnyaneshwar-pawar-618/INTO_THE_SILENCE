// const form = document.getElementById('recipe-form');
// const ingredientInput = document.getElementById('ingredient');
// const recipesContainer = document.getElementById('recipes');

// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const ingredient = ingredientInput.value;
//     fetchRecipes(ingredient);
// })

// async function fetchRecipes(ingredient) {
//     const appId = '7efc1603';
//     const appKey = 'af5bfc9bddd7ac0619af195a1aa9df67';

//     const url = `https://api.edamam.com/search?q=${ingredient}&app_id=${appId}&app_key=${appKey}`;

//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data.hits);
//     displayRecipes(data.hits)
// }

// function displayRecipes(recipes){
//     recipesContainer.innerHTML = '';
//     recipes.forEach(recipeData =>{
//         const recipe = recipeData.recipe;
//         const recipeElement = document.createElement('div');
//         recipeElement.classList.add('recipe');
//         recipeElement.innerHTML = `
//         <img src="${recipe.im3age}" alt="${recipe.label}">
//         <div class="recipe-info">
//             <h3>${recipe.label}</h3>
//             <p>Calories : ${Math.round(recipe.calories)}</p>
//             <p><a href="${recipe.url}" target="_blank"> View Recipe</a></p>
//             </div>`;
//             recipesContainer.appendChild(recipeElement);
//     })
// }




// const getData = async ()=>{
//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data)
// }


// let url = 'https://imdb-api.com/';

// fetch(url)
// .then((response)=>{
//     return response.json();
// })
// .then((data)=>{
//     console.log('hello');
//     console.log(data);
// })
// .catch((e)=>{
//     console.log(e);
// })






// const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
// const options = {
//     method: 'GET',
//     headers: {
//         'x-rapidapi-key': 'ccd466a881msh52f63217a42cec1p1e2b49jsn841949371378',
//         'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
//     }
// };

// const getMovie = async () => {
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//         // console.log(result);  // Log the result to check its structure

//         // // Check if result is an array
//         // if (Array.isArray(result)) {
//         //     result.forEach((data) => {
//         //         let movie = document.createElement('div');
//         //         movie.classList.add('movie');

//         //         let img = document.createElement('img');
//         //         img.classList.add('img');
//         //         img.src = data.image;

//         //         let title = document.createElement('h3');
//         //         title.classList.add('title');
//         //         title.innerText = data.title;

//         //         movie.appendChild(img);
//         //         movie.appendChild(title);
//         //         document.querySelector('.movies-container').appendChild(movie);
//         //     });
//         // } else {
//         //     console.error('Unexpected response format:', result);
//         // }
//     } catch (error) {
//         console.error(error);
//     }
// };

// getMovie();


// let url = 'http://www.omdbapi.com/?i=tt3896198&apikey=fcc41620';
// // let APIKEY = 'ca597da65a868e5c42a738094eb28781';

// let getData = async ()=>{
//     let promise = await fetch(url);
//     let data = await promise.json();

//     let containerInfo = document.createElement('div');
//     containerInfo.classList.add('gx-movie')

//     let title = document.createElement('h1');
//     title.innerText = "Title : " + data.Title;

//     let desc = document.createElement('p');
//     desc.innerText = "Description : " + data.Plot;

//     let date = document.createElement('h3')
//     date.innerHTML = "Released : " + data.Released + "<br/> Director : " + data.Director;

//     containerInfo.append(title, desc, date);
//     containerInfo.style.color = '#fff';

//     document.querySelector('body').appendChild(containerInfo)
// }

// getData();

// fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });


const accessKey = 'lQJx3SOBsQVXiNesrsklgzx3QEzDE2TRJSVrnLsGKkE';
// Replace with your actual access key
let url = `https://api.unsplash.com/photos/?client_id=${accessKey}`;


let btn = document.querySelector('.btn');

const getImage = async () => {
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data[0]);

        let randomNo = Math.floor(Math.random() * 10 + 1);

        let img = document.querySelector('#image');
        img.src = data[randomNo].urls.full;

        let profileImg = document.querySelector('#user-profile');
        profileImg.src = data[randomNo].user.profile_image.large;

        let userName = document.querySelector('.user-name h4');
        userName.innerText = data[randomNo].user.username;

        let imgDesc = document.querySelector('.img-desc')
        imgDesc.innerText = data[randomNo].alt_description;

        let download = document.querySelector('.download a');
        download.href = data[randomNo].links.download;
    } catch (e) {
        console.log(e);
    }
}
btn.addEventListener('click', () => {
    getImage();
})

