import Vue from 'vue';
import Vuex from 'vuex';
import appStore from "@/_store/modules/appStore";
import trendStore from "@/_store/modules/trendStore";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        appStore: appStore,
        trendStore: trendStore,
    },
});
