<template>
    <div class='embed'>
        <iframe
                :src = "getVideoUrl"
                :frameBorder='0'
                :allowFullScreen='1'
                width='auto'></iframe>
    </div>
</template>

<script>
    export default {
        name: "ResponsiveEmbed",
        props: {
            video: Object,
        },
        computed : {
            getVideoUrl() {
                console.log(this.video);
                const {site, key} = this.video;
                switch(site){
                    case "YouTube" : return 'https://www.youtube.com/embed/'
                        +key+'?autoplay=1';
                    //&enablejsapi=1&showinfo=0&controls=1&fs=1&wmode=transparent&amp;origin=http%3A%2F%2Flocalhost
                }
                return "";
            }
        }
    }
</script>

<style scoped>
    .embed {
        width: 100%;
        border-radius: 0;
        margin: 0;
        box-shadow: #dadada 0 0 0;
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 25px;
        height: 0;
        background: black;
        border-bottom: 1px solid #dadada;
    }
    .embed iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>