const defaultState = {
    page : 'shows',     // shows, movies
    mode : 'view',      // view, search
    search : '',
    filters : {
        period: 'week',       // week, day
        movies: 'trending',
        shows: 'trending'
    }
};

const actions = {
    setPage : ({commit}, payload) => {
        commit('setPage', payload.page);
    },
    setMode : ({commit}, payload) => {
        commit('setMode', payload.mode);
    },
    setSearch : ({commit}, payload) => {
        commit('setSearch', payload.search);
    },
    setFilters : ({commit}, payload) => {
        commit('setFilters', payload.filters);
    },
};

const mutations = {
    setPage: (state, page) => {
        state.page = page;
    },
    setMode: (state, mode) => {
        state.mode = mode;
    },
    setSearch: (state, search) => {
        state.search = search;
    },
    setFilters : (state, filters) => {
        state.filters = {
            ...state.filters,
            period : filters.period !== undefined ? filters.period : state.filters.period,
            movies : filters.movies !== undefined ? filters.movies : state.filters.movies,
            shows : filters.shows !== undefined ? filters.shows : state.filters.shows,
        }
    },
};

const getters = {
    page : state => state.page,
    mode : state => state.mode,
    search : state => state.search,
    period : state => state.filters.period,
    movies : state => state.filters.movies,
    shows : state => state.filters.shows,
};



export default {
    state: defaultState,
    actions,
    mutations,
    getters,
};