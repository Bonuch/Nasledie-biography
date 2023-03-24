export default {
    state: {
        modal: false,
    },
    mutations: {
        setModalActive(state, modal) {
            state.modal = modal
        },
    },
    actions: {
        getModalActive({commit}, modal) {
            commit('setModalActive', modal)
        }
    },
    getters: {
        returnModalActive(state) {
            return state.modal
        }
    }
}
