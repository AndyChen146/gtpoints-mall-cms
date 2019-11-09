import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

//const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        app,
        user
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ],
    getters,
    //strict: debug,
})

export default store
