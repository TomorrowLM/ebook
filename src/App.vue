<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const that = this;
				uni.getSystemInfo({
					success(res) {
						that.globalData.statusBarHeight = res.statusBarHeight;
						console.log(res.statusBarHeight)
					}
				})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onInit: () => {
			console.log('1')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
