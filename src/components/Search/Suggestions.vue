<template>
    <ul class="suggestions">
        <li v-for="(word, index) in words"
           :key="index"
           @click="onItemClickHandler(word.name)">{{word.name}}</li>
    </ul>
</template>

<script>
    export default {
        name: "Suggestions",
        props:{
            words : Array,
            onItemClickHandler : Function
        },

    }
</script>

<style scoped>

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