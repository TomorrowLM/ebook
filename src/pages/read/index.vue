<template>
	<div>
		<view class="content">
             <view>
                 <p>{{book.name}}</p>
                <read></read>
             </view>
		</view>
	</div>
</template>

<script>
import read from '@/components/read/index'
	export default {      
        data(){
            return {
                book:{
                    name:''
                }
             }
        },    
        onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
            this.book.name = option.name; 
             console.log(option.name); //打印出上个页面传递的参数。 
         },
         components:{read}
}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
