'use strict'
//DOM Query
const searchForm = document.querySelector('.search-form')
const getMealURI = 'https://www.themealdb.com/api/json/v1/1/search.php'
const getMealbyIdURI = 'https://www.themealdb.com/api/json/v1/1/lookup.php'
const meals = document.querySelector('.meals')
const result = document.querySelector('.result')
const error404 = document.querySelector('.error')
const title = document.querySelector('.section-title')

//Get Meals from API
const fetchMeals = async (query) => {
    fetch(getMealURI + query)
        .then(res => res.json())
        .then(data => {
            if (data.meals) {
                result.classList.remove('hidden')
                error404.classList.add('hidden')
                data.meals.forEach(meal => {
                    console.log(meal);
                    updateUI(meal)
                })
            } else {
                result.classList.add('hidden')
                error404.classList.remove('hidden')
            }
        })
        .catch(err => console.log(err))
}

const updateUI = data => {

    //Meal Data
    let id = data.idMeal


    //HTML TEMPLATE
    let html = `
        <div class="card my-4 rounded-3" data-meal-id="${data.idMeal}" data-bs-toggle="modal" data-bs-target="#exampleModal${id}">
            <img src="${data.strMealThumb}" class="card-img-top" alt="${data.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${data.strMeal}</h5>
                <p class="card-text mt-4 small"><span class="text-muted">${data.strMeal}</span> is ${data.strArea.match(/^[aeiou]/gmi) ? 'an' : 'a'} ${data.strArea}, ${data.strCategory} dish.</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Click to know more about this Recipie</small>
            </div>
         </div>

         <div class="modal fade" id="exampleModal${id}" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Meal Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center" id="meals-details">
                    <img class="img-fluid rounded mb-4" src="${data.strMealThumb}" alt="">
                    <h4>${data.strMeal}</h4>
                    <h5 class="pt-3 pb-2">Ingredients</h5>
                    <ul class="list-unstyled ingredients mb-0">
                        <li><i class="icon-check icons"></i> ${data.strIngredient1} --- ${data.strMeasure1}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient2} --- ${data.strMeasure2}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient3} --- ${data.strMeasure3}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient4} --- ${data.strMeasure4}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient5} --- ${data.strMeasure5}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient6} --- ${data.strMeasure6}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient7} --- ${data.strMeasure7}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient8} --- ${data.strMeasure8}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient9} --- ${data.strMeasure9}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient10} --- ${data.strMeasure10}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient11} --- ${data.strMeasure11}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient12} --- ${data.strMeasure12}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient13} --- ${data.strMeasure13}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient14} --- ${data.strMeasure14}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient15} --- ${data.strMeasure15}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient16} --- ${data.strMeasure16}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient17} --- ${data.strMeasure17}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient18} --- ${data.strMeasure18}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient19} --- ${data.strMeasure19}</li>
                        <li><i class="icon-check icons"></i> ${data.strIngredient20} --- ${data.strMeasure20}</li>
                    </ul>
                    <h2 class="text-center mt-4">Detailed Instructions</h2>
                    <p class="text-center lead my-4">${data.strInstructions}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Ok</button>
                    <a href="${data.strYoutube}" target="_blank" class="btn btn-primary">See Video</a>
                </div>
            </div>
        </div>
    </div>
`
    //Insert The HTML
    meals.insertAdjacentHTML('beforeend', html)
}

searchForm.addEventListener('submit', async e => {
    if (searchForm.input.value) {
        e.preventDefault()
        const query = `?s=${searchForm.input.value.trim()}`
        fetchMeals(query)
        meals.innerHTML = ""
        title.textContent = `Showing result for "${searchForm.input.value.trim()}"`
        searchForm.input.value = ""
        searchForm.input.focus()
    } else {
        e.preventDefault()
    }
})
