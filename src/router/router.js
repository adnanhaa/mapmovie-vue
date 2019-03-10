import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Details from '../pages/Details.vue'

Vue.use(VueRouter);

const routes = [
    {
        path : "/",
        component : Home
    },
    {
        path : "/:page",
        component : Home
    },
    {
        path : "/:type/:id",
        component : Details
    }
];


export default new VueRouter({
    routes
});