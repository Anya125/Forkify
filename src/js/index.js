import Search from './models/Search';
//142. Search Controller
/** Global State of the app const=state{}
 * -Search Object
 * -Current receipe Object
 * -Shopping List Object
 * -Liked recipies 
 */

// The state object:
const state = {};

//142 4:54 function the defines what happens when the code is submitted
const controlSearch = async () => {
    //1. get query from the wiev
    const query = 'pizza' //ToDo

    //2. Cretaing a new search object if there is a query
    if (query) {
        // 2a. New search object and add it to state
        state.search = new Search(query); //?? coto jest state.search it is a new instance based on the search class
        /*A new Search object is created every time you search for a recipe. 
        The state object is a store for all data used in the application. 
        To store the information about the search, and its result, we put the search object as a property of the state.*/

        //3. Prepare user interface for whats going to happen (show loading icon etc)

        //4. Search for recipies -it returns a promise
        await state.search.getResults();

        //6. Render results on UI 
        /*We want this to happen when we recive info from getResults() - when the promise is fullfiulled*/
        console.log(state.search.resultsArray);
    }
};

//142 addEventListener 'submit' with callback function in which we pass event object
document.querySelector('.search').addEventListener('submit', e => {
    //prevent page from reloading
    e.preventDefault();
    controlSearch();
})




// const search = new Search('pizza');
// console.log(search);