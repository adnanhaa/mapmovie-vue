/*
* There is no need to hide API_KEY
*/
export const ApiConstants = {
    URL : "https://api.themoviedb.org/3",
    VERSION : 3,
    API_KEY : "?api_key=7feb4d68b33dea91ddbcc25e1d1eac7f",
    LANGUAGE_DEFAULT : "&language=en-US",
    LANGUAGE : "&language=",

    TRENDING : "/trending",
    TYPE_ALL : "/all",
    TYPE_MOVIE : "/movie",
    TYPE_TV : "/tv",
    PERIOD_DAY : "/day",
    PERIOD_WEEK : "/week",

    SEARCH : "/search",
    SEARCH_QUERY : "&query=",

    KEYWORD : "/keyword",
    VIDEOS : "/videos",

    MOVIE : "/movie/",
    TV : "/tv/",

    IMAGE_BASE_URL : 'https://image.tmdb.org/t/p/w500_and_h282_face/'
};

export const ApiFilters = {
    period : ['week', 'day'],
    movies : ['popular', 'top_rated', 'upcoming', 'now_playing'],
    shows : ['popular', 'top_rated', 'airing_today', 'on_the_air'],
};


/*
* api endpoints
*/
export const Api = {
    MOVIE_WEEK_TRENDING : ApiConstants.URL
        + ApiConstants.TRENDING
        + ApiConstants.TYPE_MOVIE
        + ApiConstants.PERIOD_WEEK
        + ApiConstants.API_KEY,

    TV_WEEK_TRENDING : ApiConstants.URL
        + ApiConstants.TRENDING
        + ApiConstants.TYPE_TV
        + ApiConstants.PERIOD_WEEK
        + ApiConstants.API_KEY,

    MOVIE_DAY_TRENDING : ApiConstants.URL
        + ApiConstants.TRENDING
        + ApiConstants.TYPE_MOVIE
        + ApiConstants.PERIOD_DAY
        + ApiConstants.API_KEY,

    TV_DAY_TRENDING : ApiConstants.URL
        + ApiConstants.TRENDING
        + ApiConstants.TYPE_TV
        + ApiConstants.PERIOD_DAY
        + ApiConstants.API_KEY,

    MOVIE_SEARCH : ApiConstants.URL
        + ApiConstants.SEARCH
        + ApiConstants.TYPE_MOVIE
        + ApiConstants.API_KEY
        + ApiConstants.SEARCH_QUERY,

    TV_SEARCH : ApiConstants.URL
        + ApiConstants.SEARCH
        + ApiConstants.TYPE_TV
        + ApiConstants.API_KEY
        + ApiConstants.SEARCH_QUERY,

    KEYWORD_SEARCH : ApiConstants.URL
        + ApiConstants.SEARCH
        + ApiConstants.KEYWORD
        + ApiConstants.API_KEY
        + ApiConstants.SEARCH_QUERY,

    MOVIE : ApiConstants.URL + ApiConstants.MOVIE,
    TV : ApiConstants.URL + ApiConstants.TV,
};