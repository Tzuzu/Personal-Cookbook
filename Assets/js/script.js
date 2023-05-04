var searchBar = document.getElementById('searchBar')
var submitBtn = document.getElementById('submitBtn')
var listResults = document.getElementById('listResults')
var searchResults = document.getElementById('searchResults')
// Function used to save a recipe to local storage

function saveRecipe(recipe) {
    let savedRecipesStr = localStorage.getItem("recipes");
    let savedRecipes = savedRecipesStr === null ? [] : JSON.parse(savedRecipesStr);
    savedRecipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(savedRecipes));
}

// Function to fetch recipes from the API

submitBtn.addEventListener("click", fetchRecipes)
function fetchRecipes() {
    var query = searchBar.value.trim()
    console.log(query)
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
        headers: { 'X-Api-Key': 'Ej/mW4GkFPaFkQnbqivazQ==3snf3WxitsQcqi3E'},
        contentType: 'application/json',
        success: function(result) {
            displayRecipes(result)
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    }); 
} 

// Creates and formats the list of search results from the API

function renderRecipeListItem(recipe) {
    let li = document.createElement("li");
    let recipeTitle = document.createElement("h3")
    let recipeServings = document.createElement("h4")
    let splitIngredients = recipe.ingredients.split("|")
    let recipeIngredients = document.createElement("ul")
    let recipeInstructions = document.createElement("p")
    let saveButton = document.createElement("button")

    recipeTitle.innerText = recipe.title;
    li.appendChild(recipeTitle)

    recipeServings.innerText = recipe.servings;
    li.appendChild(recipeServings)

    for(let i = 0; i <splitIngredients.length; i++) {
        let ingredientLi = document.createElement("li");
        ingredientLi.innerText = splitIngredients[i];
        recipeIngredients.appendChild(ingredientLi);
    }

    li.appendChild(recipeIngredients);

    recipeInstructions.innerText = recipe.instructions;
    li.appendChild(recipeInstructions)

    saveButton.innerText = "Save"
    li.appendChild(saveButton)

    saveButton.addEventListener("click", () => saveRecipe(recipe))

    return li;
    }

function displayRecipes(recipes) {
    searchResults.style.display="block"
    listResults.innerHTML = ""

    for (let i = 0; i <recipes.length; i++) {
        let li = renderRecipeListItem(recipes[i]);
        listResults.appendChild(li);
    }
}

//making the bbackground image load
var images = [
    './Assets/images/image1.jpg',
    './Assets/images/image2.jpg',
    './Assets/images/image3.jpg',
    './Assets/images/image4.jpg',
  ];

  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    document.querySelector('.background').style.backgroundImage = `url(${images[index]})`;
}, 5000);

