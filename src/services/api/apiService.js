import {Api, ApiConstants, ApiFilters} from "./apiConstants";

export const apiService = {
    fetchDataBy,
    fetchDataFor,
    searchData,
    cleanFilters,
    fetchKeywords,
    fetchItemDetails,
    fetchItemVideos
};

/*
 * Fetch data for page and period with updateing store
 * @param {string} page
 * @param {string} period
 * @return {function} The function that dispatch action on the thunk middleware and store
 */
function fetchDataFor(page, period){
    return fetchData(_getUrl(page, period));
}
/*
 * Fetch data for page by view with updateing store
 * @param {string} page
 * @param {string} view
 * @return {function} The function that dispatch action on the thunk middleware and store
 */
function fetchDataBy(page, view){
    //console.log("DataBA",_getViewUrl(page, view));
    return fetchData(_getViewUrl(page, view));
}

/*
 * Fetch search data for page by value with updateing store
 * @param {string} page
 * @param {string} value
 * @return {function} The function that dispatch action on the thunk middleware and store
 */
function searchData(page, value){
    return fetchData(_getSearchUrl(page, value));
}

/*
 * Fetch keywords data and return promise
 * @param {string} value
 * @return {Object} Promise
 */
function fetchKeywords(value){
    return fetch(Api.KEYWORD_SEARCH + value);
}

/*
 * Fetch item data by type and return promise
 * @param {type} string
 * @param {number} id
 * @return {Object} Promise
 */
function fetchItemDetails(type, id){
    if(type === "shows"){
        return _fetchShow(id);
    }else if(type === "movies"){
        return _fetchMovie(id);
    }
    return null;
}

/*
 * Fetch videos by item type and return promise
 * @param {type} string
 * @param {number} id
 * @return {Object} Promise
 */
function fetchItemVideos(type, id){
    if(type === "shows"){
        return _fetchShowVideos(id);
    }else if(type === "movies"){
        return _fetchMovieVideos(id);
    }
    return null;
}

/*
 * Fetch TV Show data and return promise
 * @param {number} id
 * @return {Object} Promise
 */
function _fetchShow(id){
    let url = Api.TV + id + ApiConstants.API_KEY + ApiConstants.LANGUAGE_DEFAULT;
    return fetch(url).then(response => response.json());
}

/*
 * Fetch Movie item data and return promise
 * @param {number} id
 * @return {Object} Promise
 */
function _fetchMovie(id){
    let url = Api.MOVIE + id + ApiConstants.API_KEY + ApiConstants.LANGUAGE_DEFAULT;
    return fetch(url).then(response => response.json());
}

/*
 * Fetch TV Show item videos data and return promise
 * @param {number} id TV Show id
 * @return {Object} Promise
 */
function _fetchShowVideos(id){
    let url = Api.TV + id + ApiConstants.VIDEOS + ApiConstants.API_KEY + ApiConstants.LANGUAGE_DEFAULT;
    return fetch(url).then(response => response.json());
}

/*
 * Fetch Movie item videos data and return promise
 * @param {number} id TV Show id
 * @return {Object} Promise
 */
function _fetchMovieVideos(id){
    let url = Api.MOVIE + id + ApiConstants.VIDEOS + ApiConstants.API_KEY + ApiConstants.LANGUAGE_DEFAULT;
    return fetch(url).then(response => response.json());
}


/*
 * Clean filters function - prevent unwanted filters in the store
 * Allowed filters defined in ApiFilters object
 * @return {Object} filter
 */
function cleanFilters(filters){
    const cleaned = {};
    for(const key of Object.keys(filters)){
        if(ApiFilters.hasOwnProperty(key)){
            if(ApiFilters[key].includes(filters[key])){
                cleaned[key] = filters[key];
            }
        }
    }
    return cleaned;
}

/*
 * private helper function
 * @param {string} page
 * @param {string} period
 * @return {String} url
 */
function _getUrl(page, period) {
    if (page === "shows") {
        if(period === "day") return Api.TV_DAY_TRENDING;
        return Api.TV_WEEK_TRENDING;
    }
    if(period === "day") return Api.MOVIE_DAY_TRENDING;
    return Api.MOVIE_WEEK_TRENDING;
}

/*
 * private helper function
 * @param {string} page
 * @param {string} period
 * @return {String} url
 */
function _getViewUrl(page, view) {
    if (view !== "trending") {
        if(page === "shows"){
            if(ApiFilters.shows.includes(view)){
                return Api.TV + view + ApiConstants.API_KEY + ApiConstants.LANGUAGE_DEFAULT;
            }
        }else if(page === "movies"){
            // console.log(ApiFilters.movies);
            if(ApiFilters.movies.includes(view)){
                return Api.MOVIE + view + ApiConstants.API_KEY + ApiConstants.LANGUAGE_DEFAULT;
            }
        }
    }
    return _getUrl(page, 'week');
}


/*
 * private helper function
 * @param {string} page
 * @param {string} value
 * @return {String} url
 */
function _getSearchUrl(page, value) {
    if (page === "shows") return Api.TV_SEARCH + value;
    return Api.MOVIE_SEARCH + value;
}


/*
 * Middleware dispatcher function
 * Instead fetch use cross-fetch or Axios
 * @param {string} url
 * @return {Function} MiddlewareFunction/Object(redux action)
 */
function fetchData(url){
    if(url === null) return;
    return commit => {
        commit('setLoading', true);
        return fetch(url)
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                if(data.results !== undefined){
                    //remove splice after review
                   /* if(data.results.length > 10){
                        data.results.splice(10);
                    }*/

                    commit('setItems', data.results);
                }else{
                    commit('setError', 'Something went wrong with loading data');
                }
            })
            .catch(error => {
                // console.log("CATCH", error);
                commit('setError', error.message);
            })
    }
}

/*
 * Error handler function
 * It's need improve this
 * @param {Object} response
 * @return {Object} response status
 */
function handleErrors(response) {
    if (!response.ok){
        throw Error(response.statusText);
    }
    return response;
}