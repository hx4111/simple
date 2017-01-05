<template>
	<div>
		<goodslist :periodid="current_p" v-if="current_p"></goodslist>
	</div>
</template>

<script>
	import { CONFIG } from '../../config/config.js';
	
	export default {
		data() {
			return {
				current_p: 0
			}
		},
		created() {
			let currentUrl = 'yungou/act/' + CONFIG.ygActId + '/periodicl/current';
			fetchApi(currentUrl).then( (res) => { 
				this.current_p = res.data.current_p;
			});
		}
	}
</script>

<style lang="less">
	
</style>