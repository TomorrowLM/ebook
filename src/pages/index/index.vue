<template>
	<div>
		<uni-nav-bar left-icon="bars" left-text=""  title="书架" fixed="true" color="$uni-color-success" @clickLeft="showDrawer('showLeft')">				
		</uni-nav-bar>
				<uni-drawer ref="showLeft" mode="left" :width="180" @change="change($event,'showLeft')">
					<button @click="goToMine">我的</button>
					
					<view class="close">
						<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70" @click="closeDrawer('showLeft')"><text class="word-btn-white">关闭</text></view>
					</view>
				</uni-drawer>
		<uni-search-bar></uni-search-bar>
		<view class="content">
			<view class="book-list" v-for="(book,index) in bookList" :key="index">
				<view class="book" @click="read(book.name)">
					<img src="./../../static/book-tree.jpg" alt="">
					<text class="text-center">{{book.name}}</text>
				</view>
			</view>			
		</view>
	</div>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	export default {
		data() {
			return {
				title: 'Hello',
				bookList:[
					{name:'完美世界'},
					{name:'斗罗大陆'},
					{name:'春花秋月知多少'},
					{name:'活着'}
				]
			}
		},
		onLoad() {

		},
		methods: {
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			goToMine(){
				uni.switchTab({					
    			url: '/pages/mine/index'
				});
			},
			read(name){
				uni.navigateTo({
    				url: '/pages/read/index?name='+name
				});
			}
		},
		components: {uniNavBar,uniSearchBar,uniDrawer}
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: row;
		padding-bottom: 14px;
		flex-wrap: wrap;
				font-size:16px;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.close{
	position: relative;
    top: 76vh;
	}
	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		height: 40px;
		margin: 25px;
		background-color: #219752;
	}
	.book-list{
		width:30%;
		margin-left:10px;
		background-color: rgb(87, 177, 79);
		float:left;
	}
	img{
		max-width: 100%;
	}
	.text-center{
		display: block;
		text-align: center;  	
	}
</style>
