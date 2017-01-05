<template>
	<div class="goods-item">
		<div class="item-left">
			<img :src="item.cover_1" alt="">
		</div>
		<div class="item-right">
			<div class="item-title">{{item.title}}</div>
			<div class="item-sold-block">
				<div>
					<span>已售{{item.yabao.sold}}</span>
					<span>剩余{{item.yabao.total - item.yabao.sold}}</span>
				</div>
				<div class="total-pannel"><span class="sold-pannel" :style="soldPannelWidth"></span></div>
			</div>
			<div class="item-buy-btn">
				<button class="btn buy-btn" :class="isActiveBuyBtn">立即购买</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['item'],
		data() {
			return {
				
			}
		},
		method: {
			soldPannelWidth() {
				return 'width:' + (this.item.yabao.sold / this.item.yabao.total).toFixed(2) + '%';
			},
			isActiveBuyBtn() {
				return (this.item.yabao.total - this.item.yabao.sold) > 0 ? 'active' : '';
			}
		}
	}
</script>

<style lang="less">
	.goods-item {
		padding: .3rem;
		background-color: #F3CDFF;
		display: flex;
		justify-content: space-around;
		color: #C3112D;

		.item-left {
			width: 30%;

			img {
				width: 100%;
			}
		}

		.item-right {
			width: 70%;
			padding: .2rem .3rem;
			font-size: .6rem;
		
			.item-title {
				font-size: .8rem;
				font-weight: bold;
			}
		}

	}
</style>