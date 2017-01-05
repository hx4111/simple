import Vue from 'vue'

/**
 * 用户信息 store
 */

import { CONFIG, setByUserLoginStatus } from '../../config/config.js'

const state = {
	isLogin: false,
	user: {}
}

const getters = {
	getUser: state => state.user,
	isLogin: state => state.isLogin
}

const mutations = {
	setUserLogin (state, { user }) => {
		state.user = user;
		state.isLogin = true;
	},
	setUserKubi (state, { kubi }) => {
		state.user = {...state.user, kubi };
	}
}

const actions = {
	setUser({ commit }) => {
		if (CONFIG.isApp && !CONFIG.isPPTV) {
			setByUserLoginStatus({
				isLogin (user) => {
					commit('setUserLogin', { user });
				}
			})
		} else {
			let comiuser = window.localStorage.getItem('comiuser');
			if (comiuser) {
				commit('setUserLogin', { comiuser });
			}
		}
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}
