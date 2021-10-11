class BaseRequest {
  /**
   * 获取头部
   */
  getHeader(user) {
    if (!user) return {
      ver: "5.0",
      pt: "ios",
      packge: "quanminxiaoshuo"
    };
    return {
      ver: "5.0",
      pt: "ios",
      packge: "quanminxiaoshuo",
      token: user.token,
      user: user.userId
    };
  }

  /**
   * GET请求
   */
  get(url, user, success) {
    var that = this;
    uni.request({
      url,
      header: that.getHeader(user),
      success: res => {
        if (res.data.code != 1) {
          uni.hideLoading();
          uni.showModal({
            title: res.data.msg
          });
          return;
        }

        success(res);
      },
      fail: () => {
        uni.hideLoading();
        uni.showModal({
          title: "网络错误，请稍后再试"
        });
      }
    });
  }
  /**
   * POST请求
   */


  post(url, data, user, success) {
    var that = this;
    uni.request({
      url,
      data,
      header: that.getHeader(user),
      method: 'POST',
      success: res => {
        if (res.data.code != 1) {
          uni.hideLoading();
          uni.showModal({
            title: res.data.msg
          });
          return;
        }

        success(res);
      },
      fail: () => {
        uni.hideLoading();
        uni.showModal({
          title: "网络错误，请稍后再试"
        });
      }
    });
  }

}

;
export default BaseRequest;