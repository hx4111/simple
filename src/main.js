import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router.js'
import store from './vuex/store.js'
import $ from 'webpack-zepto'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes
})

new Vue({
	router,
	store
}).$mount('#app')