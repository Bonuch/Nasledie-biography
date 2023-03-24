export default {
    state: {
        active: false
    },
    mutations: {
        setPreloader(state, payload) {
            state.active = payload
        },
    },
    actions: {
        getPreloader({commit}, payload) {
            commit('setPreloader', payload)
        },
    },
    getters: {
        returnPreloaderStatus(state) {
            return state.active
        }
    }
}
