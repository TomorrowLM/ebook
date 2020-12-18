<template>
  <view class="body">
    <view class="content">
      <view>
        <p>{{ book.name }}</p>
      </view>
      <button type="primary" @tap="show">弹出</button>
      <view class="t-page">
        <!-- 需要声明 ref  -->
        <t-color-picker
          ref="colorPicker"
          :color="color"
          @confirm="confirm"
        ></t-color-picker>
      </view>

      <wyb-popup
        ref="popup"
        type="bottom"
        height="200"
        width="500"
        radius="0"
        maskAlpha="'0"
        bgColor="white"
        :showCloseIcon="false"
      >
        <view>
          <slider
            @change="sliderChange"
            @changing="sliderChanging"
            step="0.1"
            show-value="true"
          />
          <view class="">
            <uni-pagination total="1000"></uni-pagination>
          </view>
          <view class="read-theme">
            <div class="tab-theme">
              <view class="">
                <uni-icons type="bars" size="20"></uni-icons>
                <p>目录</p>
              </view>
            </div>
            <div class="tab-theme" @click="open">
              <view class="">
                <uni-icons type="star" size="20"></uni-icons>
                <p>主题</p>
              </view>
            </div>
            <div class="tab-theme">
              <view class="">
                <uni-icons type="gear-filled" size="20"></uni-icons>
                <p>设置</p>
              </view>
            </div>
            <div class="tab-theme">
              <view class="">
                <uni-icons type="chat" size="20"></uni-icons>
                <p>标签</p>
              </view>
            </div>
          </view>
        </view>
      </wyb-popup>
    </view>
  </view>
</template>

<script>
import read from "@/common/read/index";
import uniPagination from "@/components/uni-pagination/uni-pagination.vue";
import uniCollapse from "@/components/uni-collapse/uni-collapse.vue";
import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
import popupLayer from "@/components/popup-layer/popup-layer.vue";
import wybPopup from "@/components/uni-wyb-popup/wyb-popup.vue";
import myIcon from "@/components/uni-icon/my-icon.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import colorPicker from "@/components/colorPicker.vue";
import tColorPicker from "@/components/t-color-picker/t-color-picker.vue";
export default {
  data() {
    return {
      book: {
        name: "",
      },
      boolShow: false,
      color: { r: 199, g: 237, b: 204, a: 0.6 },
      pickerStatus: false,
    };
  },
  mounted() {
    this.init();
  },
  updated() {
    let l =
      this.color.r +
      "," +
      this.color.g +
      "," +
      this.color.b +
      "," +
      this.color.a;
    document
      .getElementsByTagName("body")[0]
      .setAttribute("style", "background-color:rgba(" + l + ")");
  },
  methods: {
    init() {
      let l =
        this.color.r +
        "," +
        this.color.g +
        "," +
        this.color.b +
        "," +
        this.color.a;
      document
        .getElementsByTagName("body")[0]
        .setAttribute("style", "background-color:rgba(" + l + ")");
    },
    open() {
      this.$refs.popup.open();
    },
    show() {
      this.$refs.popup.show(); // 或者 boolShow = rue
    },
    close() {
      this.$refs.popupRef.close(); // 或者 boolShow = false
    },
    sliderChange(e) {
      console.log("value 发生变化：" + e.detail.value);
      document.getElementsByClassName(
        "uni-slider-value"
      )[0].textContent = parseFloat(e.detail.value).toFixed(1);
    },
    sliderChanging(e) {
      document.getElementsByClassName(
        "uni-slider-value"
      )[0].textContent = parseFloat(e.detail.value).toFixed(1);
    },
    open(item) {
      // 打开颜色选择器
      this.$refs.colorPicker.open();
      this.$refs.popup.close();
    },
    confirm(e) {
      this.color = e;
      console.log("颜色选择器返回值：" + e);
    },
  },
  onLoad: function (option) {
    //option为object类型，会序列化上个页面传递的参数
    this.book.name = option.name;
    console.log(option.name); //打印出上个页面传递的参数。
  },
  components: {
    read,
    uniPagination,
    uniCollapse,
    uniCollapseItem,
    uniPopup,
    uniPopupMessage,
    uniPopupDialog,
    popupLayer,
    wybPopup,
    myIcon,
    uniIcons,
    colorPicker,
    tColorPicker,
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.read-theme {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 0;
}
div.tab-theme {
  height: 80px;
  width: 20%;
  text-align: center;
}
.tab-theme {
  display: flex;
  align-items: center;
  justify-content: center;
}
.color-p {
  display: none;
}
</style>
