import {
    DOMelements
} from './base';

//Function that returns input value of the filed
/* 1.Select DOM element
2.Get the value
3. Return the value
*/
export const getInput = () => DOMelements.searchInput.value;
//get input is a one line function so we do not have to write return as it automatically returns 

//Clearing input filed 
/*it is in {brackets} because otherwise there is an implicit return-see notes on getInput,
and we do not want to return anything */
export const clearInput = () => {
    DOMelements.searchInput.value = '';
};

//clearing left side where the recipes are displayed
export const clearResults = () => {
    DOMelements.searchResultsList.innerHTML = '';
}


//Shortening title to 17 char without cutting words
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        //1. we split title by space, that gives us an array that we want to reduce
        /* 2. In .reduce we pass 2 arguments.
        1st is the callback f-c that has the accumulator & the curr value as the input.
        2nd is the initial value of the accumulator, which should be 0 (we will add to it throughout loops)
        */
        title.split(' ').reduce((accumulator, currValue) => {
            if (accumulator + currValue.length <= limit) {
                newTitle.push(currValue);
            }
            //updating the accumuletor after each iteration of this loop
            return accumulator + currValue.length;

        }, 0);

        //return the result of our loop plus 3dots in the end
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

//Printing one single receipe from input filed  (resultsArray) into the UI
const renderRecipe = recipe => {
    const markup = `     <li>
                            <a class="results__link" href="#${recipe.recipe_id}">
                                <figure class="results__fig">
                                    <img src="${recipe.image_url}" alt="${recipe.title}">
                                </figure>
                                <div class="results__data">
                                    <h4 class="results__data">${limitRecipeTitle(recipe.title)}</h4>
                                    <p class="results__author">${recipe.publisher}</p>
                                </div>
                            </a>
                        </li>`;

    DOMelements.searchResultsList.insertAdjacentHTML("beforeend", markup);
};



//renderResults f-c will run through the recipesArray and on each recipe it will call the renderRecipe f-c
export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    //it's enough to write (renderRecipe) and forEach will automatically pass the current element into renderRecipe f-c

    /*Pagination
1. Change rederResults f-c
    -   we are adding page and resultsperpage as argumants
*/

    let start = (page - 1) * resultsPerPage;
    let end = page * resultsPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    //Rendering buttons
    renderButtons(page, recipes.length, resultsPerPage);

};

/** Pagination
 * 2.rendering buttons on the interface
 * create btn creates a next or prev btn 
 */

const createBtn = (pageNr, type) => `
        <button class="btn-inline results__btn--${type}" data-goto=${type ==='prev'? pageNr-1 : pageNr+1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type ==='prev'? pageNr-1 : pageNr+1}</span>
        </button>
`

const renderButtons = (page, totalResults, resultsPerPage) => {

    /* const pages says how many are we going to have 
    we divide the total amount of reults(max 30 i this case) 
    with results per page (10 in this case)
    */

    const pages = Math.ceil(totalResults / resultsPerPage);
    let button;
    if (page === 1 && pages > 1) {
        // we want one btn going to next page
        button = createBtn(page, 'next');
    } else if (page < pages) {
        //we want 2 buttons, one going to next and one to prev site
        button = `
                ${createBtn(page, 'prev')}
                ${createBtn(page, 'next')}
                `;
    } else if (page === pages && pages > 1) {
        // we want one btn going to prev page
        button = createBtn(page, 'prev');
    }

    DOMelements.serachResultsPages.insertAdjacentHTML('afterbegin', button);
};