import Vue from 'vue'
import Vuex from 'vuex' 
import user from './modules/user.js' 
import yungou from './modules/yungou.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
        user,
        yungou
    }
})  

export default store;