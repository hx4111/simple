<template>
	<div class="user-header">
		<div class="user-block">
			<ul class="user-pannel" v-if="isLogin">
				<li>昵称: <span>{{nickname}}</span></li>
				<li>酷币余额: <span>{{kubi}}</span></li>
				<li><img :src="myOrderImg" alt=""></li>
			</ul>
			<div class="unlogin-handle" v-if="!isLogin" @click="toLogin">请您登录</div>
		</div>
	</div>
</template>

<script>
    import { CONFIG, callAppFunction } from '../../config/config.js'

	export default {
		data() {
			return {
                headerBgImg: './assets/images/' + CONFIG.ygActId + '/header-bg.jpg',
                myOrderImg: './assets/images/' + CONFIG.ygActId + '/my-order-btn.png',
			}
		},
		computed: {
			isLogin() {
				return this.$store.state.isLogin;
			},
            nickname() {
            	let user = this.$store.state.user;
            	return user.nickname;
            },
            kubi() {
            	return this.$store.state.kubi;
            }
		},
		methods: {
			toLogin() {
				callAppFunction('openLoginPage', {});
			}
		}
	}
</script>

<style lang="less">
	.user-header {
		width: 100%;
		position: relative;

		.user-bg {

			img {
				width: 100%;
			}
		}

		.viture-btn {
			left: 0;
			width: 10%;
			height: 4rem;
			&.rule-btn {
				top: 32%;
			}
			&.prize-btn {
				top: 55%;
			}
		}

		.user-block {
			position: absolute;
			bottom: 6%;
			width: 100%;
			color: #fff;

			.user-pannel {
				display: flex;
				justify-content: space-around;
				align-items: center;

				li {
					width: 30%;
					text-align: center;
				}
				img {
					width: 100%;
				}
			}

			.unlogin-handle {
				font-size: 1rem;
				text-align: center;
			}
		}

	}

</style>
