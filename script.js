const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealEl = document.getElementById("meals");
const resultHeading = document.getElementsByClassName('result-heading');
const single_mealEl = document.getElementsById('single-meal');


//search meal
function searchMeal(e){
    e.preventDefault();
}
//event listners
submit.addEventListener('submit',searchMeal);
