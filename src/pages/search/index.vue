<template>
  <div :style="{'padding-top':StatusBarHeight +'px'}">
    <uni-search-bar></uni-search-bar>
    <view class="content">
      <!-- <v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs> -->
	  <v-tabs v-model="current" :scroll="false" :tabs="tabs" @change="changeTab"></v-tabs>
    </view>
	<view v-if="tabIndex=='小说'">
		
		
		<view class="main">
			<view class="book_detail_box">
				<image :src="book_info.image" lazy-load></image>
				<view class="book_detail">
					<text class="book_title">{{book_info.name}}</text>
					<view class="book_author_title">作者：<navigator :url="'/pages/searchRes/searchRes?keyword=' + book_info.author" class="book_author">{{book_info.author}}</navigator></view>
					<text class="book_cate">类别：{{book_info.ltype}}　{{book_info.stype}}</text>
					<view class="rating_title">喜欢人数：
						<text class="rating_score" v-if="book_info.remark">{{book_info.fav_num}}</text>
						<text v-else>没人喜欢T^T</text>
					</view>
				</view>
			</view>
			<scroll-view class="other" scroll-y>
				<view class="other_box">
					<view class="other_title">简　介</view>
					<view class="other_content" v-if="book_info.remark">{{book_info.remark}}</view>
					<view class="other_content" v-else>暂无简介</view>
				</view>
				<view class="other_box">
					<view class="other_title">书源及最新章节</view>
					<view class="other_content">
						<view v-for="(item, index) in book_source_info" :key="index" class="book_source"><text style="color:black;">{{item.site_name}}</text>：{{item.last_chapter_name}}</view>
					</view>
				</view>
				<view class="other_box">
					<view class="other_title">作者书籍<text style="color:#cccccc;font-size:24rpx;"></text></view>
					<scroll-view scroll-x>
						<view  v-if="author_books.length>0">
							<navigator v-for="(item, index) in author_books" :key="index" :url="'/pages/bookinfo/bookinfo?book=' + item.book_id" class="related_book"> 
								<image :src="item.image"></image>
								<view class="related_book_title">{{item.name}}</view>
							</navigator>
						</view>
					  <view v-else class="result_tips">暂无其他书籍</view>
					</scroll-view>
				</view>
				<view class="other_box">
					<view class="other_title">热门评论</view>
					<view v-if="book_reviews.length>0">
						<view v-for="(item, index) in book_reviews" :key="index" class="other_content" style="border-bottom:1px solid #dddddd;display:flex;">
		          <view style="flex:1">
		            <view><image :src="item.avatar" class="avatar"></image></view>
		            <!-- <view class="reviews_title">{{item.nick}}</view> -->
		          </view>
							<view class="reviews_content">{{item.content}}</view>
						</view>
					</view>
					<view v-else class="result_tips">暂无评论</view>
				</view>
			</scroll-view>
		
			<view class="footer">
				<picker class="button" :value="index" range-key="site_name" :range="book_source_info" @change="changeSource">
			    	<view class="select_source">{{index<0 ?"选择书源":book_source_info[index].site_name}}</view>
		  		</picker>
				<view :class="'button ' + add_to_mybooks_style" @tap="add_fun">{{add_book_stat}}</view>
				<view class="button start_read" @tap="startRead">开始阅读</view>
			</view>
		</view>
		
		
	</view>
  </div>
</template>

<script>
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import vTab from '@/components/v-tabs/v-tabs.vue'
export default {
  data() { 
    return {
		book_info: {},
		book_source_info: [],
		// 书源
		author_books: [],
		// 作者其他书籍
		book_reviews: {},
		// 评论
		// select_source_tips: "选择书源",
		index: -1,
		source_id: "",
		mybooks: [],
		add_book_stat: "加入书架",
		add_to_mybooks_style: "add_to_mybooks",
		add_fun: "addToMybooks()",
		get_data_flag: 0,
		token: "",
		userId: "",
		
	  StatusBarHeight:0,
      tabs: [
        "小说",
        "文学",
        "新闻"
	  ],
	  current: 0,
	  tabIndex:'小说',
    };
  },
  onLoad() {
//     uni.downloadFile({
//   url: 'https://uniapp.dcloud.io/api/file/file?id=opendocument',
//   success: function (res) {
//     var filePath = res.tempFilePath;
//     uni.openDocument({
//       filePath: filePath,
//       success: function (res) {
//         console.log('打开文档成功');
//       }
//     });
//   }
// });
  	const that = this;
  		uni.getSystemInfo({
  			success(res) {
  				that.StatusBarHeight = res.statusBarHeight;
  				console.log(res.statusBarHeight)
  			}
  		})
  },
  activated() {
    document.getElementsByTagName('uni-page-wrapper')[0].style.background = 'white'
  },
  methods: {
    changeTab(index) {
      console.log("当前选中的项：" + index);
	  this.tabIndex = this.tabs[index]
    },
  },
  components: { uniSearchBar,vTab },
};
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

/* bookinfo */
.main{
	height: 100%;
	overflow-y: hidden;
}
.book_detail_box{
	height: 28%;
	
}
.book_detail_box image{
	width: 210rpx;
	height: 300rpx;
	margin: 20rpx;
  box-shadow: 0 0 5px #000;
}
.book_detail{
	width: 55%;
	float: right;
	height: 100%;
}
.book_title{
	font-size: 40rpx;
    font-weight: bold;
    display: block;
    margin: 30rpx 0 15rpx 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.book_author_title{
	font-size: 28rpx;
    margin-bottom: 15rpx;
}
.book_author{
	font-size: 28rpx;
    color: #555;
    display: inline;
    font-style: italic;
    text-decoration: underline;
}
.book_cate{
	font-size: 28rpx;
    display: block;
    margin-bottom: 15rpx;
}
.rating_title{
	font-size: 28rpx;
	display: block;
}
.rating_score{
	font-size: 60rpx;
	display: block;
	text-align: center;
	color: #008B8B;
  margin-top: 20rpx;
}
.rating_count{
	font-size: 28rpx;
	color: #888;
	text-align: center;
	display: block;
}

.other{
	height: 62%;
}
.other_title{
	border-left:5px solid #008B8B;
	font-size: 40rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding-left: 20rpx;
}

.other_box{
	margin-top: 20rpx;
	border-bottom:1px solid #dddddd;
}
.other_content{
	padding:40rpx 25rpx 30rpx 25rpx;
	font-size: 30rpx;
	color: #888;
	line-height: 50rpx;
}


.book_source{
	line-height: 80rpx;
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.footer{
	border-top: 1px solid #ccc;
	height: 8%;
}
.button{
	width: 33.333%;
	display: inline-block;
	text-align: center;
	line-height: 100rpx;
	font-size: 36rpx;
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.select_source{
	background-color: white;
	color: #008B8B;
	border-right: 1px solid #ccc;
}
.add_to_mybooks{
	background-color: white;
	color: #008B8B;
}
.added{
	color: #cccccc;
}
.start_read{
	background-color: #008B8B;
	color: white;
}

.related_book{
  	margin: 38rpx;
  	width:175rpx;
  	display: inline-block;
  	font-size: 30rpx;
	color: #888;
	line-height: 50rpx;
}
.related_book image{
	height:250rpx;
	width:175rpx;
	box-shadow:0 0 10px #000;
}
.related_book_title{
	text-align: center;
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.reviews_title{
	color: black;
	font-size: 20rpx;
}
.result_tips{
	text-align: center;
	line-height: 300rpx;
}
.avatar{
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-left: 10rpx;
}
.reviews_content{
  text-align: left;
  color: "#ccc";
  margin-left: 20rpx;
  padding-top: 10rpx;
  flex: 9;
}
/*.show_all{
  float: right;
  margin-right: 20rpx;
}
.show_all image{
  height: 30rpx;
  width: 30rpx;
  line-height: 50rpx;
}
.order{
  float: right;
  font-size: 30rpx;
  color: #888;
  margin-right: 20rpx;
  line-height: 50rpx;
}*/
</style>
