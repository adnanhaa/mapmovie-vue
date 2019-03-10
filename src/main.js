import Vue from 'vue'
import App from './App.vue'
import route from './router/router.js'
import store from "./_store/store.js";
import './main.css'

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router: route,
    store,

    render: h => h(App, {
        props : {
            message : "footer"
        }
    }),
   /* beforeCreate: function () {
        console.log('beforeCreate: ' + this.message + new Date().toLocaleString());
    },
    created: function () {
        console.log('created: ' + this.message + new Date().toLocaleString());
    },
    beforeMount: function () {
        console.log('beforeMount: ' + this.message + new Date().toLocaleString());
    },
    mounted: function () {
        console.log('mounted: ' + this.message + new Date().toLocaleString());
    },
    beforeUpdate: function () {
        console.log('beforeUpdate: ' + this.message + new Date().toLocaleString());
    },
    updated: function () {
        console.log('updated: ' + this.message + new Date().toLocaleString());
    },
    beforeDestroy: function () {
        console.log('beforeDestroy: ' + this.message + new Date().toLocaleString());
    },
    destroyed: function () {
        console.log('destroyed: ' + this.message + new Date().toLocaleString());
    }*/
});

//.$mount('#app');
