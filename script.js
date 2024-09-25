function fetchMealsAPI(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data.meals))
        .catch(error => console.log('Error:', error));
}

if (document.getElementById('search-input')) {
    document.getElementById('search-input').addEventListener('input', function() {
        const query = this.value;
        if (query.length > 0) {
            fetchMealsAPI(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`, displaySearchResults);
        } else {
            document.getElementById('search-results').innerHTML = '';
        }
    });
}

function displaySearchResults(meals) {
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = ''; 
    if (meals) {
        meals.forEach(meal => {
            const mealElement = document.createElement('div');
            mealElement.classList.add('meal-item');
            mealElement.innerHTML = `
                <div>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h4>${meal.strMeal}</h4>
                </div>
                <div>
                    <button class="btn btn-info" onclick="viewMealDetails(${meal.idMeal})">View More</button>
                    <button class="btn btn-success" onclick="addToFavorites(${meal.idMeal})">Favorite</button>
                </div>
            `;
            resultsDiv.appendChild(mealElement);
        });
    } else {
        resultsDiv.innerHTML = '<p>No meals found</p>';
    }
}

function viewMealDetails(mealId) {
    window.location.href = `meal.html?id=${mealId}`;
}

function addToFavorites(mealId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
    if (!favorites.includes(mealId)) {
        favorites.push(mealId);
        localStorage.setItem('favoriteMeals', JSON.stringify(favorites));
        alert('Meal added to favorites!');
    } else {
        alert('Meal is already in favorites!');
    }
}

if (window.location.pathname.includes('meal.html')) {
    const mealId = new URLSearchParams(window.location.search).get('id');
    fetchMealsAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`, displayMealDetails);
}

function displayMealDetails(meals) {
    const meal = meals[0];
    const detailsDiv = document.getElementById('meal-details');
    detailsDiv.innerHTML = `
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
    `;
}

if (window.location.pathname.includes('favourites.html')) {
    const favorites = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
    if (favorites.length > 0) {
        favorites.forEach(mealId => {
            fetchMealsAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`, displayFavoriteMeal);
        });
    } else {
        document.getElementById('favorite-meals').innerHTML = '<p>No favorite meals</p>';
    }
}

function displayFavoriteMeal(meals) {
    const meal = meals[0];
    const favDiv = document.getElementById('favorite-meals');
    const mealElement = document.createElement('div');
    mealElement.classList.add('meal-item');
    mealElement.innerHTML = `
        <div>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h4>${meal.strMeal}</h4>
        </div>
        <div>
            <button class="btn btn-danger" onclick="removeFromFavorites(${meal.idMeal})">Remove</button>
        </div>
    `;
    favDiv.appendChild(mealElement);
}


function removeFromFavorites(mealId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
    favorites = favorites.filter(id => id !== mealId);
    localStorage.setItem('favoriteMeals', JSON.stringify(favorites));
    window.location.reload();
}
