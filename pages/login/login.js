//实例化app
var appInstance = getApp()
Page({
  /* 页面的初始数据*/
  data: {
  },
  formsubmit: function (e) {
    console.log(e);
    if (e.detail.value.phoneNum.length == 0 ||e.detail.value.phoneNum.length == 0) {
      wx.showToast({
        title: '帐号不存在请重新登录！',
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this
      //验证手机号
      wx.request({
        url: 'localhost:8080/user/login',
        data: {
          phoneNum: e.detail.value.phoneNum,
          pwd: e.detail.value.pwd
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          let status = res.data.status;
          if (status == 1) {
            console.log('登录成功')
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                console.log('haha');
                setTimeout(function () {
                  //要延时执行的代码
                  wx.switchTab({
                    url: "../index/index"
                  })
                }, 2000) //延迟时间 
              }
            })


          }
          if (status == 0) {
            console.log('失败');
            wx.showToast({
              title: '帐号不存在请重新登录！',
              icon: 'none',
              duration: 2000
            })
          }

          that.setData({ 
            phoneNum: e.detail.value.phoneNum,
            pwd: e.detail.value.pwd
          });
        }
      });
     
    }
  if(e.detail.value.pwd.length == 0) {
    wx.showToast({
      title: '密码不为空！',
      icon: 'none',
      duration: 2000
    })
  } 

  },
  /*生命周期函数--监听页面加载*/
  onLoad: function () {
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