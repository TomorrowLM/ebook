<template>
  <div :style="{'padding-top':StatusBarHeight +'px'}">
    <uni-search-bar></uni-search-bar>
    <view class="content">
      <!-- <v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs> -->
	  <v-tabs v-model="current" :scroll="false" :tabs="tabs" @change="changeTab"></v-tabs>
    </view>
  </div>
</template>

<script>
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import vTab from '@/components/v-tabs/v-tabs.vue'
export default {
  data() {
    return {
	  StatusBarHeight:0,
      tabs: [
        "小说",
        "文学",
        "新闻"
	  ],
	  current: 0
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
</style>
