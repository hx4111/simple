<template>
	<div class="goods-list-block">
		<ul class="goods-list">
			<li v-for="item in items">
				<goodsitem :item="item"></goodsitem>
			</li>
		</ul>
	</div>
</template>

<script>
	import Goodsitem from './goodsitem.vue';
	import { fetchApi, CONFIG } from '../config/config.js';

	export default {
		props: {
			periodid: Number,
		},
		data() {
			return {
				items: [],
			}
		},
		created() {
			let listUrl = 'yungou/act/' + CONFIG.ygActId + '/periodicl/' + this.periodid;
			fetchApi(listUrl).then((res) => {
				this.items = res.data;
			})
		},
		components: {
			'goodsitem': Goodsitem
		}
	}
</script>

<style>
	
</style>