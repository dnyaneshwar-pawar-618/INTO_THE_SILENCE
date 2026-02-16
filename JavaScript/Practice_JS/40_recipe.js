const form = document.getElementById('recipe-form');
const ingredientInput = document.getElementById('ingredient');
const recipesContainer = document.getElementById('recipes');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const ingredient = ingredientInput.value;
    fetchRecipes(ingredient);
});

async function fetchRecipes(ingredient) {
    const appId = '7efc1603';
    const appKey = 'af5bfc9bddd7ac0619af195a1aa9df67';
    const response = await fetch(`https://api.edamam.com/search?q=${ingredient}&app_id=${appId}&app_key=${appKey}`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    recipesContainer.innerHTML = '';
    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <div class="recipe-info">
                <h3>${recipe.label}</h3>
                <p>Calories: ${Math.round(recipe.calories)}</p>
                <p><a href="${recipe.url}" target="_blank">View Recipe</a></p>
            </div>
        `;
        recipesContainer.appendChild(recipeElement);
    });
}
