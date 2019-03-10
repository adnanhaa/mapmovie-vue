<template>
    <div class="content">
        <DetailsNav></DetailsNav>
        <section class="main mt-1">
            <Spinner v-if="isLoading" text='Loading...'/>
            <div v-else-if="item">
                <transition
                        name="slide-fade" appear leave
                        :duration="{ enter: 800, leave: 800 }">
                    <div class="card">
                        <div class="row">
                            <div class= "col-sm-12 col-md-6">
                                <transition name="imgfade">
                                    <ResponsiveEmbed v-if="isVideo" :video="video"></ResponsiveEmbed>
                                    <img
                                        class="card-img-top"
                                        v-on:load="onLoaded"
                                        v-show="loaded"
                                        v-else=""
                                        :src="imageUrl"/>
                                </transition>
                            </div>
                            <div class="col-sm-12 col-md-6 p-3">
                                <h4 class="card-title text_white ml-2">{{item.title === undefined ? item.name : item.title}}</h4>
                                <p class="card-text text_white ml-2">{{item.overview}}</p>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <ErrorView v-else="" message='Oops... '/>
        </section>
    </div>
</template>

<script>
    import BackButton from "@/components/BackButton";
    import Spinner from "@/components/Spinner";
    import ErrorView from "@/components/ErrorView";
    import {apiService} from "@/services/api/apiService";
    import ResponsiveEmbed from "@/components/ResponsiveEmbed";
    import {ApiConstants} from "@/services/api/apiConstants";
    import {mapGetters} from "vuex";
    import DetailsNav from "@/components/DetailsNav";

    export default {
        name: "Details",
        components: {DetailsNav, ResponsiveEmbed, BackButton, Spinner, ErrorView},
        props : {

        },

        data () {
            return {
                isLoading : true,
                item : null,
                videos : [],
                error : null,
                loaded: false,
            }
        },

        computed : {
            ...mapGetters({
                page: 'page',
            }),

            isVideo(){
                return this.videos.length > 0 && this.videos[0] !== undefined;
            },

            video() {
                return this.videos[0];
            },

            imageUrl() {

                const {item} = this;

                let src = item.backdrop_path === null ? item.poster_path : item.backdrop_path;
                let fullPath = ApiConstants.IMAGE_BASE_URL + src;

                if(src == null){
                    fullPath = "/img/noimage.jpg";
                }

                return fullPath;
            }
        },

        methods: {
            onLoaded() {
                this.loaded = true;
            },
        },
        mounted () {
            const {type, id} = this.$route.params;

            let promise = apiService.fetchItemDetails(type, id);
            if(promise !== null){
                promise
                    .then(data => {
                        this.isLoading = false;
                        this.error = false;
                        this.item = data;
                    })
                    .catch(error =>{
                        this.isLoading = false;
                        this.error = error.message;
                        this.item = null;
                    });
            }else {
                this.isLoading = false;
                this.error = true;
            }


            let videoPromise = apiService.fetchItemVideos(type, id);
            if(videoPromise !== null){
                videoPromise
                    .then(this.handleErrors)
                    .then(data => {
                        this.videos = data.results;
                    })
            }
        }
    }
</script>

<style scoped>
    .content{
        min-height: 500px;
    }
    .imgfade-enter-active {
        transition: opacity 3s ease-in-out;
    }

    .imgfade-enter-to {
        opacity: 1;
    }

    .imgfade-enter {
        opacity: 0;
    }
</style>