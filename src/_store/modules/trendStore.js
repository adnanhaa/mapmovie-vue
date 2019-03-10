import {apiService} from "../../services/api/apiService";

const defaultState = {
    isLoading : false,
    items : [],
    error : null,
    loadedAt : 0
};

const actions = {
    fetchDataFor : ({commit}, payload) => {
        apiService.fetchDataFor(payload.page, payload.period)(commit);
    },
    fetchDataBy : ({commit}, payload) => {
        apiService.fetchDataBy(payload.page, payload.view)(commit);
    },
    searchData : ({commit}, payload) => {
        //console.log(payload);
        apiService.searchData(payload.page, payload.value)(commit);
    },
};

const mutations = {
    setLoading: (state, bool) => {
        state.isLoading = bool;
        state.error = null;
    },

    setError : (state, error) => {
        state.error = error;
        state.isLoading = false;
    },

    setItems : (state, items) => {
        state.items = items;
        state.isLoading = false;
        state.error = null;
    }
};

const getters = {
    isLoading : state => state.isLoading,
    items: state => state.items,
    error: state => state.error,
};



export default {
    state: defaultState,
    actions,
    mutations,
    getters,
};