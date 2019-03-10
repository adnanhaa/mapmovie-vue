<template>
    <div :class="activityStyle">
        <div class="searchBox">
            <div class="searchIcon">
                <i class="fas fa-search"></i>
            </div>
            <input v-model="value"
                   key="search"
                   type="text"
                   :placeholder="placeholder"/>
            <Clear v-if="isClear"
                   text="clear"
                   :clearHandler="clearHandler">
            </Clear>
        </div>
        <Suggestions
                :words="suggestions"
                :onItemClickHandler="handleSuggestionClick">
        </Suggestions>

    </div>
</template>

<script>

    import Suggestions from "@/components/Search/Suggestions";
    import Clear from "@/components/Search/Clear";

    const DEFAULT_TIMEOUT = 500;
    const MIN_CHARS = 1;


    export default {
        name: "Search",
        components: {Clear, Suggestions},
        props: {
            placeholder: String,
            minChars: Number,
            time: Number,
            search: String,
            handleSearch: Function,
            handleSuggestions: Function,
            suggestions: Array,
        },

        data: function(){
          return {
              value : ""
          }
        },

        watch: {
            value(search){
                this.handleChange(search);
            }
        },

        computed: {
            activityStyle() {
                if(this.value === undefined) return 'searchHolder neutral';
                if(this.value.length === 0){
                    return 'searchHolder neutral';
                }else if(this.value.length < 3){
                    return 'searchHolder inactive';
                }else if(this.value.length >= 3){
                    return 'searchHolder active';
                }
                return 'searchHolder neutral';
            },
            isClear(){
                return !(this.value === undefined || this.value.length === 0);
            }

        },

        methods : {

            handleChange(value) {
                //if(this.handleSearch === undefined) return;
                if(value !== undefined && this.checkChars(value.length)){
                    if(this.isTimeout()){
                        this.handleTimeout(value);
                        return;
                    }
                }
                this.handleSearch(value);
            },

            handleSuggestionClick(value) {
                this.value = value;
               // this.handleSearch(value);
               // if(this.handleSuggestions !== undefined){
                    this.handleSuggestions(value);
               // }
            },

            handleTimeout(value) {
                if(this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.handleSearch(value);
                    if(this.handleSuggestions !== undefined){
                        this.handleSuggestions(value);
                    }
                }, this.getTimeout());

                return false;
            },

            isTimeout() {
                return this.time !== undefined;
            },

            getTimeout() {
                if(this.time !== undefined){
                    return this.time;
                }
                return DEFAULT_TIMEOUT;
            },

            checkChars(length) {
                if(this.minChars !== undefined) {
                    return length >= this.minChars;
                }
                return length >= MIN_CHARS;
            },
            clearHandler() {
                this.value = '';
                this.handleSearch('');
            }

        },

        mounted(){
            if(this.search !== undefined && this.search !== ""){
                this.value = this.search;
            }
        }
    }
</script>

<style scoped>

.searchHolder {
    margin: 5px 0;
    padding: 1px;
    border: 1.5px solid #c9c9c9;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 2px #d6d6d6;
    box-sizing: border-box;
}


.neutral{
    border: 1px solid lightgray;
}

.active{
    /*border: 1.5px solid #508eff;*/
    border: 1.5px solid #1ec500;
}

.inactive{
    border: 1.5px solid red;
}

.searchBox {
    display: block;
    height: 35px;
    position: relative;
    padding: 0px 15px;
}



.searchBox input {
    position: absolute;
    top: 0;
    left: 0;
    border: 0px;
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 15px;
    text-align: left;
    border-radius: 5px;
    padding: 0 8px 0 30px;
    box-sizing: border-box;
}

.searchBox input:focus{
    outline: none;
}

.searchIcon {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    padding: 7px;
    color: #dadada;
}

.no-suggestions {
    color: #999;
    padding: 0.5rem;
}

.suggestions {
    margin: 0px;
}

.suggestions li {
    padding: 4px 12px;
    list-style: none;
    margin-top: 0;
    color: #a7a7a7;
}

.suggestions li.active {
    color: #00b6ff;
    cursor: pointer;
}
.suggestions li:hover {
     color: #00b6ff;
     cursor: pointer;
 }

.suggestions li:not(:last-of-type) {
    border-bottom: 1px solid whitesmoke;
}
.suggestions li:first-child {
    border-top: 1px solid #e2e2e2;
}

</style>