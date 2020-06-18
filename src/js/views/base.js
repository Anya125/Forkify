export const DOMelements = {
    //Object with all DOM elements
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResultsList: document.querySelector('.results__list'),
    searchResults: document.querySelector('.results'),
    serachResultsPages: document.querySelector('.results__pages'),
}

//145 loading spiner
//is in base as it will be displayed both in searchView and in the middle of the page
export const renderLoader = parent => {
    const loader = `
      <div class="loader">
         <svg>
              <use href="img/icons.svg#icon-cw"></use>
         </svg>
      </div>`;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {

    //we need to target loader here as it is not existing from the beginnig
    const loader = document.querySelector('.loader');

    //if loader is displayed remove it
    if (loader) loader.parentElement.removeChild(loader);
};