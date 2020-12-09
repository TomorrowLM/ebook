<template>
	<div>
		<view class="content">
             <view>
                 <camera device-position="back" flash="off" @error="error" style="width: 100%; height: 300px;"></camera>
                 <button type="primary" @click="takePhoto">拍照</button>
                 <view>预览</view>
            
             </view>
		</view>
	</div>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				title: 'mine'
			}
		},
		onLoad() {

		},
		methods: {

		},
		components: {uniNavBar}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
