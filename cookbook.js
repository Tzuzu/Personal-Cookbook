// Deletes an item from the local storage

var deleteBtn = document.getElementById('deleteButton')

deleteBtn.addEventListener("click", () => deleteRecipe(recipe.title))

function deleteRecipe(recipeTitle) {
    let savedRecipesStr = localStorage.getItem("recipes");
    let savedRecipes = savedRecipesStr === null ? [] : JSON.parse(savedRecipesStr);
    savedRecipes = savedRecipes.filter(r => r.title !== recipeTitle);
    localStorage.setItem("recipes", JSON.stringify(savedRecipes));
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

    deleteButton.innerText = "Delete"
    li.appendChild(deleteButton)
}

var images = [
    './assets/imiges/image1.jpg',
    './assets/imiges/image2.jpg',
    './assets/imiges/image3.jpg',
    './assets/imiges/image4.jpg',
  ];

  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    document.querySelector('.background').style.backgroundImage = `url(${images[index]})`;
  }, 5000);