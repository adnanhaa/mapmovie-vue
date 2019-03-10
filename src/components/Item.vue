<template>
    <router-link
            class=" col-md-4 col-sm-6 col-xs-12"
            :to="page +'/'+ item.id">
        <transition
                name="slide-fade" appear leave
                :duration="{ enter: 800, leave: 800 }">
            <div class="card mb-2">
                <transition name="imgfade">
                    <img class="card-img-top"
                         v-on:load="onLoaded" v-show="loaded"
                         :src="getFullPath(item)"
                         @load=""/>
                </transition>
                <div class="card-body p-1">
                    <div class="p-1">
                        <div class="float-left mr-3">
                            <canvas width=40 height=40 v-generate="item.vote_average"></canvas>
                        </div>
                        <div class="">
                            <h6 class="text-white mb-1">{{item.title === undefined ? item.name : item.title}}</h6>
                            <h6 class="text-white mb-0">{{date}}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </router-link>
</template>

<script>
    import {ApiConstants} from "@/services/api/apiConstants";

    export default {
        name: "Item",
        props : {
            page : String,
            item : Object
        },
        data: function(){
          return {
              loaded : false
          }
        },
        computed: {
            date : function() {
                if(this.item){
                    let dateString = this.item.release_date === undefined ? this.item.first_air_date.split('-') : this.item.release_date.split('-');
                    if(dateString.length === 3){
                        return dateString[2]+'.'+dateString[1]+'.'+dateString[0]+'.';
                    }
                    //return (dt.getDay()+1)+'.'+(dt.getMonth()+1)+'.'+dt.getFullYear()+'.';
                }
            },
        },
        methods: {
            onLoaded() {
                this.loaded = true;
            },
            getFullPath : function() {
                let src = this.item.backdrop_path === null ? this.item.poster_path : this.item.backdrop_path;
                let fullPath = ApiConstants.IMAGE_BASE_URL + src;

                if(src == null){
                    fullPath = "/img/noimage.jpg";
                }

                return fullPath;
            },

            getLink: () => {
                const { page, item } = this;
                return '/'+ page +'/'+item.id
            },

        },
        directives: {
            generate (canvas, rate) {
                let rateColor = "white";

                if(rate.value  > 6) {
                    rateColor = rate.value  > 8 ? "#14c500" : "#fae600";
                }else{
                    rateColor = rate.value  > 3 ? "#4a75fa" : "#ff0009";
                }

                const ctx = canvas.getContext('2d');
                ctx.webkitImageSmoothingEnabled=true;

                let s = 20;
                ctx.beginPath();
                ctx.fillStyle = "#1a212c";
                ctx.arc(s, s, s, 0, Math.PI*2, false);
                ctx.fill();

                ctx.beginPath();
                ctx.strokeStyle = "#3a4312";
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.arc(s, s, s*0.8, 0, Math.PI*2, false);
                ctx.stroke();

                let ctr = 270 * (rate.value/10);
                let startAngle = (Math.PI/180) * -90;
                let endAngle = (Math.PI/180) * ctr;

                ctx.beginPath();
                ctx.strokeStyle = rateColor;
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.arc(s, s, s*0.8, startAngle, endAngle, false);
                ctx.stroke();

                ctx.font = "15px bold sans-serif";
                ctx.fillStyle = "white";

                rate.value = rate.value.toFixed(1);
                if(rate.value == 0){
                    rate.value = "NR";
                }

                ctx.fillText(rate.value, 10, 25);

            }
        }
    }
</script>

<style scoped>
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