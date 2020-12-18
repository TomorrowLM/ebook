<template>
  <div>
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
      tabs: [
        "小说",
        "文学",
        "新闻"
	  ],
	  current: 0
    };
  },
  onLoad() {},
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
