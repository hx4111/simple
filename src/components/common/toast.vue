<template>
	<div class="toast-block">
		<transition name="fade"> 
			<div class="toast-inner" v-show="toast.isActive">
				{{toastStrOrCode}}
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: {
			toast: {
				type: Object,
				default: {
					toastCode: 0,
					toastStr: '',
					isActive: false,
					timeout: 2000,
				}
			}
		},
		computed: {
			toastStrOrCode() {
				let msg = '';
				if (this.toast.toastCode) {
					switch(this.toast.toastCode) {
						case 1002: 
							msg = '酷币余额不足';
							break;
						case 1003: 
							msg = '参数错误';
							break;
						default:
						 	msg = this.toast.toastStr;
						 	break;
					}
					return msg;
				} else {
					return this.toast.toastStr;
				}
			},
		},
		updated() {
			if (this.isActive) {
				setTimeout(() => {
					this.toast.isActive = false;
				}, this.timeout);
			}
		}
	}
</script>

<style lang="less">
	.toast-block {
	    position: fixed;
	    bottom: 5%;
	    left: 0;
	    width: 100%;
	    z-index: 100;

		.toast-inner {
			padding: 5px 10px;
			margin: 0 auto;
			width: 60%;
			border-radius: 10px;
			font-size: .8rem;
			text-align: center;
			background-color: rgba(0, 0, 0, .6);
			color: #fff;
		}
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s ease;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}

</style>