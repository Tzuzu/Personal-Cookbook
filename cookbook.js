var title = document.getElementById('recipeTitle')
var servings = document.getElementById('recipeServings')
var ingredients = document.getElementById('recipeIngredients')
var instructions = document.getElementById('recipeInstructions')
var saveButton = document.getElementById('recipeSave')
var warning = document.getElementById('warning')
var recipesList = document.getElementById('recipesList')

function saveRecipe(recipe) {
    let savedRecipesStr = localStorage.getItem("recipes");
    let savedRecipes = savedRecipesStr === null ? [] : JSON.parse(savedRecipesStr);
    savedRecipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(savedRecipes));
}

saveButton.addEventListener("click", saveUserRecipe)
function saveUserRecipe(event) {
    event.preventDefault()
    var recipeTitle = title.value.trim()
    var recipeServings = servings.value.trim()
    var recipeIngredients = ingredients.value.trim()
    var recipeInstructions = instructions.value.trim()
    if (!recipeTitle || !recipeServings || !recipeIngredients || !recipeInstructions) {
        warning.style.display="block"
        return;
    }
    var recipe = {"title":recipeTitle, "servings":recipeServings, "ingredients":recipeIngredients, "instructions":recipeInstructions}
    saveRecipe(recipe)
    title.value = ""
    servings.value = ""
    ingredients.value = ""
    instructions.value = ""
    warning.style.display="none"
}

// Creates and formats the list of saved items from the Local Storage

function renderRecipeListItem(recipe) {
    let li = document.createElement("li");
    let recipeTitle = document.createElement("h3")
    let recipeServings = document.createElement("h4")
    let splitIngredients = recipe.ingredients.split("|")
    let recipeIngredients = document.createElement("ul")
    let recipeInstructions = document.createElement("p")

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
}


