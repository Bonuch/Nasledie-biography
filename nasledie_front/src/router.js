import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/HomeView')
        },
        // {
        //     path: '/biography/edit',
        //     name: 'biography/edit',
        //     component: () => import('./components/editPage/EditMain')
        // },
    ]
})

// router.beforeEach(async (to, from, next) => {
//     next()
// })
//
// export default router
