<template>
    <div class="clear"
         @click="clearHandler">
        {{text}}
    </div>
</template>

<script>
    export default {
        name: "Clear",
        props: {
            text: String,
            clearHandler: Function
        }
    }
</script>

<style scoped>
    .clear {
        position: absolute;
        right: 0;
        padding: 3px 12px;
        color: gray;
        font-weight: 300;
        font-size: 15px;
        /*border: 0.5px solid #f4f4f4;*/
        margin: 3px;
        border-radius: 5px;
        cursor: pointer;
        vertical-align: sub;
        box-sizing: border-box;
        background: white;
    }
</style>