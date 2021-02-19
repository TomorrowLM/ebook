<template>
  <view>
    <view class="person-head">
      <cmd-avatar
        src=""
        @click="fnInfoWin"
        size="lg"
        :make="{ 'background-color': '#fff' }"
      ></cmd-avatar>
      <view class="person-head-box">
        <view class="person-head-nickname"></view>
        <view class="person-head-username" v-if="!username"
          >ID：
          <span @click="login" v-if="!username">登陆</span>
          <span @click="register">/注册</span>
        </view>
        <view class="person-head-username" v-if="username"
          >ID：
          <span>{{ username }}</span>
        </view>
      </view>
    </view>
    <view class="person-list">
      <cmd-cell-item title="我的书籍" slot-left arrow @click="openBooklist">
        <cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="我的收藏" slot-left arrow>
        <cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="消息通知" slot-left arrow>
        <cmd-icon type="message" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="系统设置" slot-left arrow>
        <cmd-icon type="settings" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="意见反馈" slot-left arrow>
        <cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
    </view>
  </view>
</template>

<script>
import cmdAvatar from "@/components/cmd-person_1.1/components/cmd-avatar/cmd-avatar.vue";
import cmdIcon from "@/components/cmd-person_1.1/components/cmd-icon/cmd-icon.vue";
import cmdCellItem from "@/components/cmd-person_1.1/components/cmd-cell-item/cmd-cell-item.vue";

export default {
  components: {
    cmdAvatar,
    cmdCellItem,
    cmdIcon,
  },
  data() {
    return {
      username: localStorage.getItem("username"),
    };
  },
  onShow() {
    console.log(1);
    this.username = localStorage.getItem("username");
  },
  methods: {
    /**
     * 打开用户信息页
     */
    fnInfoWin() {
      uni.navigateTo({
        url: "/pages/user/info/info",
      });
    },
    login() {
      uni.navigateTo({
        url: "/pages/user/login/login",
      });
    },
    register() {
      uni.navigateTo({
        url: "/pages/user/register/register",
      });
    },
    openBooklist() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
  },
};
</script>

<style>
.person-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 150px;
  padding-left: 20px;
  background: linear-gradient(to right, #365fff, #36bbff);
}

.person-head-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px;
}

.person-head-nickname {
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}

.person-head-username {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}

.person-list {
  line-height: 0;
}
</style>
