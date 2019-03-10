<template>
    <div class="content">
        <ViewNav :page="page" :period="period" :movies="movies" :shows="shows"/>
        <div class="main">
            <!--// TODO export Search to module-->
            <Search
                    placeholder='Search...'
                    :search="search"
                    :handleSearch="handleSearch"
                    :handleSuggestions="handleSuggestions"
                    :suggestions ="suggestions"
                    :minChars="minChars"
                    :time="searchTime"></Search>
            <section>
                <Spinner v-if="isLoading" text="Loading..."></Spinner>
                <ItemList v-else-if="items.length>0"></ItemList>
                <ErrorView v-else="" :message="error"></ErrorView>
            </section>
        </div>
    </div>
</template>

<script>

import ViewNav from "../components/ViewNav";
import ItemList from "../components/ItemList";
import Spinner from "../components/Spinner";
import ErrorView from "../components/ErrorView";
import {mapActions, mapGetters} from "vuex";
import {apiService} from "../services/api/apiService";
import Search from "../components/Search/Search";

export default {
    name: "Home",
    components: {Search, ViewNav, ItemList, Spinner, ErrorView},
    props : {
        title: {
            type: String,
            default: ''
        }
    },

    data: function(){
        return{
            searchTime: 10,
            minChars: 3,
            suggestions: []
        }
    },
    computed: {
        ...mapGetters({
            isLoading: 'isLoading',
            items: 'items',
            error: 'error',
            page: 'page',
            mode: 'mode',
            search: 'search',
            period: 'period',
            movies: 'movies',
            shows: 'shows',
        }),
    },


    watch:{
        $route (to, from){
            this.setRoute(to, from);
        },
        items (){
            // console.log(this.items);
        }
    },

    methods: {
        ...mapActions([
            'setPage',
            'setMode',
            'setSearch',
            'setFilters',
        ]),

         setRoute(to, from) {
            if(to === null && from === null){
                this.prepareFetchData();
                return;
            }
            if (to !== undefined && to.path === "/shows" && from !== undefined && from.path !== "show") {
                this.setPage({page: 'shows'})
            } else if (to !== undefined &&  to.path === "/movies" && this.page !== "movie") {
                this.setPage({page: 'movies'});
            }

            if (to.query !== undefined && Object.keys(to.query).length > 0) {
                let filters = apiService.cleanFilters(to.query);
                // console.log(filters);
                if(filters.period !== undefined){
                    if(this.page === 'shows') filters.shows = 'trending';
                    if(this.page === 'movies') filters.movies = 'trending';
                }
                this.setFilters({filters: filters});
            }
            this.prepareFetchData();

        },

        prepareFetchData(value){
            if(this.mode === 'view'){
                if(this.page === 'shows'){
                    if(this.shows === 'trending'){
                        this.$store.dispatch('fetchDataFor', {page: this.page, period: this.period});
                    }else{
                        this.$store.dispatch('fetchDataBy', {page: this.page, view: this.shows});
                    }
                }else if(this.page === 'movies'){
                    if(this.movies === 'trending'){
                        this.$store.dispatch('fetchDataFor', {page: this.page, period: this.period});
                    }else{
                        this.$store.dispatch('fetchDataBy', {page: this.page, view: this.movies});
                    }
                }
            }else if(this.mode === 'search'){
                if(value !== undefined){
                    this.$store.dispatch('searchData', {page: this.page, value: value});
                }else{
                    this.$store.dispatch('searchData', {page: this.page, value: this.search});
                }
            }
        },

        handleSearch(value) {
          //console.log("Search: "+value);
            if(value.length >= 3){
                this.setMode({mode:'search'});
                this.setSearch({search:value});
                this.prepareFetchData(value);
            }else{
                let needFetch = false;
                if(this.mode == 'search'){
                    needFetch = true;
                }
                this.setMode({mode:'view'});
                this.setSearch({search:''});
                this.suggestions = [];
                if(needFetch){
                    this.prepareFetchData();
                }
            }
        },
        handleSuggestions(value) {
            if(value.length >= 3){
                apiService.fetchKeywords(value)
                    .then(response => response.json())
                    .then(data => {
                        let suggestions = data.results.length > 5 ? data.results.slice(0, 5) : data.results;
                        this.suggestions = suggestions;
                        console.log(suggestions);
                    });
            }
        }

    },

    mounted(){
        //console.log("M", this.$route);
    },

    created() {
        this.setRoute(this.$route);
    },
}
</script>

<style scoped>
    .content{
        min-height: 500px;
    }
</style>