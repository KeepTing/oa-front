//实例化app
var header = getApp().globalData.header; //获取app.js中的请求头
var host = getApp().globalData.host;
var appInstance = getApp()
Page({
  /* 页面的初始数据*/
  data: {
  },
  formsubmit: function (e) {
    console.log(e);
    if (e.detail.value.phone.length == 0 || e.detail.value.password.length == 0) {
      wx.showToast({
        title: '帐号不存在请重新登录！',
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this
      wx.setStorage({
        key: "phone",
        data: e.detail.value.phone
      })



      var loginForm = e.detail.value;

      //验证手机号
      wx.request({
        url: host+'/user/login',
        data:loginForm,
        header:header,
        dataType:"json",
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          var result=res.data+"";
          if (result == "false") {
            wx.showToast({
              icon:'none',
              title: '用户名或密码错误',
            })
          }
          else {
            console.log('登录成功')
             getApp().globalData.header.Cookie = 'JSESSIONID=' + res.data.sessionId;
            // console.log("======"+res.data.sessionId)
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                console.log('haha');
                setTimeout(function () {
                  //要延时执行的代码
                  wx.setStorage({
                    key: 'user',
                    data: res.data.user,
                  })
                  wx.switchTab({
                    url: "../index/index"
                  })
                }, 2000) //延迟时间 
              }
            })
          }
          if (res.data == "false") {
            console.log('失败');
            wx.showToast({
              title: '帐号不存在请重新登录！',
              icon: 'none',
              duration: 2000
            })
          }

          that.setData({ 
            phone: e.detail.value.phone,
            password: e.detail.value.password
          });
        }
      });
     
    }
  if(e.detail.value.password.length == 0) {
    wx.showToast({
      title: '密码不为空！',
      icon: 'none',
      duration: 2000
    })
  } 

  },
  /*生命周期函数--监听页面加载*/
  onLoad: function () {

   // console.log("09:00">"12:00");
},
  /*生命周期函数--监听页面初次渲染完成 */
  onReady: function () {},
  /* 生命周期函数--监听页面显示*/
  onShow: function () {
    wx.setNavigationBarTitle({
      title: "登录-微办公平台"
    })
  },
  /*生命周期函数--监听页面隐藏*/
  onHide: function () {},
  /* 生命周期函数--监听页面卸载*/
  onUnload: function () {},
  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},
  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {},
  /*用户点击右上角分享*/
  onShareAppMessage: function () {}
})