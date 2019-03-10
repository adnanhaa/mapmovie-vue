<template>
    <nav class="navbar border-top" style="background-color: #29313e;padding-left:5px;padding-right:5px;">
        <div class="" role="toolbar" style="width:100%; display: flex;">

            <div class="justify-content-between" style="width:100%; display: flex;">
                <div class="btn-group">
                    <router-link
                            :class="isViewActive('popular')"
                            :to="'/' + page + '?' + page + '=popular'">Popular</router-link>
                    <router-link
                            :class="isViewActive('top_rated')"
                            :to="'/' + page + '?' + page + '=top_rated'">Top rated</router-link>
                    <router-link
                            v-if="page === 'movies'"
                            :class="isViewActive('upcoming')"
                            :to="'/' + page + '?' + page + '=upcoming'">Upcoming</router-link>
                    <router-link
                            v-else-if="page === 'shows'"
                            :class="isViewActive('airing_today')"
                            :to="'/' + page + '?' + page + '=airing_today'">Airing today</router-link>
                  <!--  <div class="btn-group" role="group">
                        <div id="btnGroupDrop1" class="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Upcoming
                        </div>
                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <router-link
                                    class="dropdown-item"
                                    :to="'/' +page+ '?movies=upcoming'">Upcoming</router-link>
                            <router-link
                                    class="dropdown-item"
                                    :to="'/' +page+ '?movies=now_playing'">Now Playing</router-link>
                            <router-link
                                    class="dropdown-item"
                                    :to="'/' +page+ '?movies=latest'">Latest</router-link>
                        </div>
                    </div>-->
                </div>

                <div class="btn-group">
                    <router-link
                            :class="isPeriodActive('week')"
                            :to="'/' + page + '?period=week'">Week</router-link>
                    <router-link
                            :class="isPeriodActive('day')"
                            :to="'/' + page + '?period=day'">Day</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'ViewNav',
        props : {
            movies: String,
            shows: String
        },
        computed: {
            ...mapGetters({
                page: 'page',
                period: 'period'
            })
        },
        methods : {
          isActive(link){
              return this.page === link ? 'ml-2 btn btn-outline-primary btn-sm active' : 'ml-2 btn btn-link btn-sm';
          },

          isPeriodActive(period){
              if(this.page === 'movies' && this.movies === 'trending'){
                return this.period === period ? 'btn btn-outline-success btn-sm active' : 'btn btn-light btn-sm';
              }else if(this.page === 'shows' && this.shows === 'trending'){
                return this.period === period ? 'btn btn-outline-success btn-sm active' : 'btn btn-light btn-sm';
              }else{
                  return 'btn btn-light btn-sm';
              }
          },

          isViewActive(view){
              if(this.page === 'shows'){
                  return this.shows === view ? 'btn btn-outline-success btn-sm active' : 'btn btn-secondary btn-sm';
              }else if(this.page === 'movies'){
                  return this.movies === view ? 'btn btn-outline-success btn-sm active' : 'btn btn-secondary btn-sm';
              }else{
                  return 'btn btn-secondary btn-sm';
              }
          },
        }
    }
</script>
