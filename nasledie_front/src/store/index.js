import Vue from 'vue'
import Vuex from 'vuex'
import postBiography from "./postBiography";
import preloader from "@/store/preloader";
import modal from './modal'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        postBiography,
        preloader,
        modal,
    }
})
