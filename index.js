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
                    updateUI(meal)
                })
            } else {
                result.classList.add('hidden')
                error404.classList.remove('hidden')
            }
        })
        .catch(err => console.log(err))
}

const updateUI = (data) => {

    //Meal Data
    let id = data.idMeal
    let ingredients = Object.values(data).splice(9, 20).filter(item => item.trim())
    let measures = Object.values(data).splice(29, 20).filter(item => item.trim())
    const htmlList = []
    for (let i = 0; i < ingredients.length; i++) {
        htmlList.push(`
        <li class="each-ingredient"> 
            <span>${ingredients[i]}</span> <span> ----- </span> <span>${measures[i]}</span>
        </li>`)
    }
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
                    <h5 class="pt-3 pb-2 display-4 text-primary">Ingredients</h5>
                    <ul class="list-unstyled ingredients mb-0">
                        ${htmlList.join(' ')}
                    </ul>
                    <h2 class="text-center mt-4">Detailed Instructions</h2>
                    <p class="text-center lead my-4">${data.strInstructions}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
                    <a href="${data.strYoutube}" target="_blank" class="btn btn-info">Watch Video</a>
                </div>
            </div>
        </div>
    </div>
`
    //Insert The HTML
    meals.insertAdjacentHTML('beforeend', html)
}

searchForm.addEventListener('submit', async e => {
    if (searchForm.input.value.trim()) {
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

