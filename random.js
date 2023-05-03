const randomBtn = document.getElementById('Random');
const mealList = document.getElementById('myMeal');

// Event listener for clicking the button that call for the function
randomBtn.addEventListener('click', getRandomMeal);


function getRandomMeal(){
    // clears the list every call
    mealList.innerHTML = "";

    
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then((response) => {
      if (response.ok) {
        return response.json();
      }else {
        throw new Error("NETWORK RESPONSE ERROR");
    }})
  .then(data => {
      displayRecipe(data);
    })
  .catch((error) => console.error("FETCH ERROR:", error));
  

}

function displayRecipe(data) {

    const myMealname = data.meals[0];
    console.log(myMealname);
    
    const mealID = myMealname.strMeal;
    const heading1 = document.createElement("h1");
    heading1.innerHTML = mealID;
    mealList.appendChild(heading1);

    const mealImg = document.createElement("img");
    mealImg.src = myMealname.strMealThumb;
    mealList.appendChild(mealImg);

    var myh1 = document.createElement("h1");
    myh1.innerHTML = "Ingredients";
    mealList.appendChild(myh1);

    const mealIngredients = document.createElement("ul");
    mealList.appendChild(mealIngredients);

    const getIngredients = Object.keys(myMealname)
      .filter(function (ingredient) {
        return ingredient.indexOf("strIngredient") == 0;
      })
      .reduce(function (ingredients, ingredient) {
        if (myMealname[ingredient] != "") {
          ingredients[ingredient] = myMealname[ingredient];
        }
        return ingredients;
      }, {});
    for (let key in getIngredients) {
      let value = getIngredients[key];
      listItem = document.createElement("li");
      listItem.innerHTML = value;
      mealIngredients.appendChild(listItem);
    }

    var myh2 = document.createElement("h1");
    myh2.innerHTML = "Instructions";
    mealList.appendChild(myh2);
    
    const myInstru = myMealname.strInstructions;
    const mealInstru = document.createElement("p");
    mealInstru.innerHTML = myInstru;
    mealList.appendChild(mealInstru);

  }
    
  