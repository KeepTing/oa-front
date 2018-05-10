// pages/me/alterPwd/alterPwd.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头

var qiniuHost = getApp().globalData.qiniuHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    againnewpwd:'',
    newpwd:'',
    oldpwd:'',
  
  },
  formSubmit:function(e){
    var oldPass = e.detail.value.oldpwd;
    var newPass = e.detail.value.newpwd;
    var againnewpwd = e.detail.value.againnewpwd;
    if (oldPass != "" && newPass != "" && againnewpwd != "") {

      if (againnewpwd !== newPass) {
        wx.showToast({
          icon: 'none',
          title: '确认密码和新密码不一致',
        })
      } else {
        //发送请求查旧密码
        wx.request({
          url: host + '/user/resetPass',
          data: {
            oldPass: oldPass,
            newPass: newPass
          },
          header: {
            'Content-Type': 'application/json',
            'Cookie': header.Cookie
          },
          method: "POST",
          dataType: 'json',
          success: function (res) {
            console.log(res.data);
            var result = res.data + "";
            if (result == "no_login") {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            } else if (result == "oldPass_error") {
              wx.showToast({
                icon: "none",
                title: '旧密码不正确',
              })
            } else {  //修改成功
              wx.setStorageSync("user", res.data.user);
              wx.showToast({
                title: '修改成功',
              })

              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }

    } else {
      wx.showToast({
        icon: 'none',
        title: '密码有为空的项',
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})