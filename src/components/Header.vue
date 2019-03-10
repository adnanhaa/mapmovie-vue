<template>
    <header>
        <nav class="navbar " style="background-color: #1A212C;">
            <div class="" style="width:100%; display: flex;">
                <div class="btn btn-link btn-sm mr-1 pointer">
                    <i class="fas fa-bars fa-lg text_white"></i>
                </div>
                <div class="justify-content-between" style="width:100%; display: flex;">

                    <div class="">
                        <router-link
                                :class="isActive('shows')"
                                to="/shows">TV Shows</router-link>
                        <router-link
                                :class="isActive('movies')"
                                to="/movies">Movies</router-link>
                    </div>

                </div>
                <div class="btn btn-link btn-sm mr-1 pointer">
                    <i class="fas fa-user fa-lg text_white"></i>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
    import Modal from './Dialog';
    import {mapGetters} from "vuex";
    export default {
        name: 'Header',
        components: {Modal},
        props : {},
        data: function(){
          return {
              modal: false
          }
        },
        computed: {
            ...mapGetters({
                page: 'page',
                period: 'period'
            })
        },
        methods : {
          isActive(link){
              return this.page === link ? 'ml-2 btn btn-outline-success btn-sm text_white active' : 'ml-2 btn btn-link btn-sm text_white ';
          },

          isPeriodActive(period){
              return this.period === period ? 'btn btn-light btn-sm active' : 'btn btn-light btn-sm';
          }
        }
    }
</script>
