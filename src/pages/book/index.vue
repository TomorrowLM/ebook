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
          <img src="./../../static/book-tree.jpg" alt="" />
          <text class="text-center">{{ book.name }}</text>
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
export default {
  data() {
    return {
	  StatusBarHeight:0,
      title: "Hello",
      bookList: [
        { name: "完美世界" },
        { name: "斗罗大陆" },
        { name: "春花秋月知多少" },
        { name: "活着" },
      ],
	  resInfo:''
    };
  },
  onLoad() {
  	console.log('App Launch')
  	const that = this;
  		uni.getSystemInfo({
  			success(res) {
  				that.StatusBarHeight = res.statusBarHeight;
  				console.log(res.statusBarHeight)
  			}
  		})
  },
  activated() {
  //  document.getElementsByClassName('book')[0].style.backgroundColor = 'red'
  // this.$refs.book.style.backgroundColor='red'
 },
  activated() {
    // document.getElementsByClassName('book')[0].style.background = 'white'
    // document.getElementsByTagName('uni-page-wrapper')[0].style.background = 'white'
  },

  // onLoad() {
  //   // location.reload()
  //   console.log(document.getElementsByClassName('book'))
    
  // },
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
.content {
  display: flex;
  flex-direction: row;
  padding-bottom: 14px;
  flex-wrap: wrap;
  font-size: 16px;
}
.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.close {
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
.book-list {
  width: 30%;
  margin-left: 10px;
  background-color: rgb(87, 177, 79);
  float: left;
}
img {
  max-width: 100%;
  width: 100%;
}
.text-center {
  display: block;
  text-align: center;
}
.imgInch {
  width: 100%;
  height: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #365fff, #36bbff);
}
.imgInch img {
  width: 70%;
  height: 80%;
  /* text-align: center; */
  border-radius: 100px;
}
button {
  box-sizing: border-box;
  /* border: 3px solid #55d9e6; */
}
</style>
