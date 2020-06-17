//140 Axios instead of fetch cause fetch does not work with older browsers
import axios from "axios";

export default class Search {
    //to create a class we need to use a constructor and in it we pass the properties that we want the new object to have
    constructor(query) {
        this.query = query;
    }

    //141 we are adding method to get receipe (a function that we created in 140)
    //we want to use query from the object that is why we deleted query from getResults() and we changed to this.query in const results.
    async getResults() {
        try {
            const results = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.resultsArray = results.data.recipes
            //console.log(`${this.resultsArray} results Array from Search.js `);
        } catch (error) {
            alert(error);
        }
    }
}