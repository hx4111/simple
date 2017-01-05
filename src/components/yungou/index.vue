<template>
	<div>
		<div v-if=""></div>
		
		<div class="title">
			
		</div>
	</div>
</template>

<script>
	import GoodsList from '../goodslist.vue'; 
	import Userbg from './userbg.vue';
	import { fetchApi, CONFIG, callAppFunction, setByUserLoginStatus } from '../../config/config.js';
	import $ from 'webpack-zepto'

	export default {
		data() {
			return {
				current_p: 0
			}
		},
		mounted() {
			callAppFunction('setJSCallback', {
                'account_event': 'loginHandler'
            });

			let that = this;
			setByUserLoginStatus({isLogin: loginCallback, unLogin: unloginCallback});
			//未登录回调
		    function unloginCallback() {
		        //设置App里登录后的回调函数
		        window.loginHandler = function (obj) {
		            setByUserLoginStatus({isLogin: loginCallback});
		        }
		    }
	        function jumpLoginPage() {
	            callAppFunction('openLoginPage', {});
	        }

		    //已登录回调
		    function loginCallback(userinfo) {
		    	CONFIG.isLogin = true;
		    	CONFIG.p_userinfo = userinfo;
		    	that.$store.commit('login', userinfo);
		    	fetchApi('user/kubi').then( res => {
		    		if (res.data) {
		    			console.info(res);
		    			that.$store.commit('setKubi', res.data.kubi);
		    		}
		    	})
		    }
			
		},
		components: {
			'userbg': Userbg,
			'goodslist': GoodsList
		}
	}
</script>

<style lang="less">
	@import '../../assets/less/style.less';

	.title {
		border: 1px solid #aeaeae;
		border-width: 0 0 1px;
		text-align: center;

		span {
			border: 1px solid #000;
			border-width: 0 0 1px;
		}
	}
</style>