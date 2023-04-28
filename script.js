var searchBar = document.getElementById('searchBar')
var submitBtn = document.getElementById('submitBtn')
var listResults = document.getElementById('listResults')
function saveRecipe(recipe) {
    console.log(recipe)
    JSON.stringify(recipe)
    localStorage.setItem("recipes", JSON.stringify(recipe));
}

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
    console.log(recipes)
    listResults.innerHTML = ""

    for (let i = 0; i <recipes.length; i++) {
        let li = renderRecipeListItem(recipes[i]);
        listResults.appendChild(li);
    }
}