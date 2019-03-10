<template>
    <div>
        <div class="row">
            <Item
                v-for="(item, index) in items"
                :key="index+1"
                :item="item"
                :page="page"/>
        </div>
        <Pagination
                :page="9"
                :pages="23"
                :range="5"
                :clickHandler="clickHandler">
        </Pagination>
    </div>
</template>

<script>
    import Item from "@/components/Item";
    import Pagination from "@/components/Pagination";
    import {mapGetters} from "vuex";
    export default {
        name: "ItemList",
        components: {Pagination, Item},
        props : {

        },
        computed: {
            ...mapGetters({
                items: 'items',
                page: 'page',
            }),
        },
        methods: {
            clickHandler: function(page){
                console.log("EVENT", page);
            }
        }
    }
</script>

<style scoped>

</style>