<template>
  <div class="book" ref="book">
	  <div  :style="{'height':StatusBarHeight +'px',backgroundColor:'transparent'}"></div>
    <uni-nav-bar
      left-icon="bars"
      left-text=""
      title="书架"
      fixed="true"
      color="$uni-color-success"
      @clickLeft="showDrawer('showLeft')"
    >
    </uni-nav-bar>
    <uni-drawer
      ref="showLeft"
      mode="left"
      :width="180"
      @change="change($event, 'showLeft')"
    >
      <view class="imgInch" @click="goToMine">
        <cmd-cel-item slot-right>
          <cmd-avatar
            src="https://avatar.bbs.miui.com/images/noavatar_small.gif"
          ></cmd-avatar>
        </cmd-cel-item>
      </view>
      <button @click="goToMine" class="goToMine">本地文件扫描</button>
    </uni-drawer>
    <uni-search-bar clearButton="always"></uni-search-bar>
    <view class="content">
      <view class="book-list" v-for="(book, index) in bookList" :key="index">
        <view class="book" @click="read(book.name)">
          <image src="../../static/book-tree.jpg">
          <text class="text-center">{{ book.title }}</text>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import uniDrawer from "@/components/uni-drawer/uni-drawer.vue";
import cmdAvatar from "@/components/cmd-person_1.1/components/cmd-avatar/cmd-avatar.vue";
import cmdCelItem from "@/components/cmd-person_1.1/components/cmd-cell-item/cmd-cell-item.vue";
import Person from '../../global'
export default {
  data() {
    return {
	  StatusBarHeight:0,
      title: "Hello",
      bookList:this.$store.state.bookshelf,
	    resInfo:''
    };
  },
  watch:{
    bookList:function(newValue,old){
 
    }
  },
  onLoad() {
    console.log(this.$store.state.bookshelf)
  	const that = this;
  		uni.getSystemInfo({
  			success(res) {
  				that.StatusBarHeight = res.statusBarHeight;
  			}
  		})
  },
  methods: {
    showDrawer(e) {
      this.$refs[e].open();
    },
    // 关闭窗口
    closeDrawer(e) {
      this.$refs[e].close();
    },
    // 抽屉状态发生变化触发
    change(e, type) {
      // console.log(Page.path);
      // console.log(
      //   (type === "showLeft" ? "左窗口" : "右窗口") + (e ? "打开" : "关闭")
      // );
      this[type] = e;
    },
    goToMine() {
		//uni-app 中，没有 document。可以使用 plus.globalEvent.addEventListener 来实现
		// plus.globalEvent.addEventListener( "plusready", onPlusReady, false );
		// 扩展API加载完毕，现在可以正常调用扩展API
		// 监听设备网络状态变化事件
		// plus.globalEvent.addEventListener('netchange', function(){});
function onPlusReady() {
	const self = this;
	var url="file:///storage/emulated/0/22.doc"; 
	//将本地URL路径转换成平台绝对路径
	var path=plus.io.convertLocalFileSystemURL(url);
	//将平台绝对路径转换成本地URL路径
	// path=plus.io.convertAbsoluteFileSystem(url);
	console.log(path);    
	//请求本地文件系统对象
	plus.io.requestFileSystem(plus.io.PRIVATE_WWW, function( fs ) {
		console.log(fs.root.fullPath) 
	     fs.root.getFile('../../../../../../Documents/2222.txt',{create:true}, function(fileEntry){
				fileEntry.file( function(file){
					var fileReader = new plus.io.FileReader();
					console.log("getFile:" + JSON.stringify(file));
					fileReader.readAsText(file, 'utf-8');
					fileReader.onloadend = function(evt) {
						console.log("11" + evt);
						console.log("evt.target" + evt.target);
						console.log(evt.target.result);
					}
					console.log(file.size + '--' + file.name);
				} );
			});
		
		}, function ( e ) {
			console.log( "Request file system failed: " + e.message );
		} );

	//通过URL参数获取目录对象或文件对象
plus.io.resolveLocalFileSystemURL(path, function(entry) {
	//entry=DirectoryEntry 文件系统中的目录对象，用于管理特定的本地目录
					// console.log(entry.toLocalURL())
					
					///读取文件  
					
					entry.file(function(file) {
						// console.log(file)
						//文件系统中的读取文件对象，用于获取文件的内容
						var fileReader = new plus.io.FileReader();
						fileReader.readAsText(file, 'GB2312');
						fileReader.onload = function(e) {
						// console.log(e.target.result);
						}
						//以文本格式读取文件数据内容
						
					});
				})
}
onPlusReady()
    },
    read(name) {
      uni.navigateTo({
        url: "/pages/read/index?name=" + name,
      });
    },
  },
  components: { uniNavBar, uniSearchBar, uniDrawer, cmdAvatar, cmdCelItem },
};
</script>

<style scoped>
	@import url("book.css");
</style>
