// pages/me/alterTX/alterTX.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头

var qiniuHost = getApp().globalData.qiniuHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:''
  },
  //选择图片
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count:1,
      success: function (res) {
        console.log(res)
        that.setData({
          image: res.tempFilePaths
        })
      }
    })
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: [this.data.image]
    })
  },


  formSubmit: function (e) {
    var that =this;
    console.log(that.data.image)
    //修改头像
    wx.uploadFile({
      url: host + '/user/uploadHead',
      filePath: that.data.image[0],
      name: 'headImg',
      header:header,
      success: function (res) {
        console.log(res.data);
       // var result = res.data + "";
        if (res.data == "no_login") {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else {  //修改成功
          wx.setStorageSync("user", JSON.parse(res.data));
          wx.showToast({
            title: '修改成功',
            success:function(res){
              wx.switchTab({
                url: '/pages/me/meItems/meItems',
                success:function(){
                  wx.reLaunch({
                    url: '/pages/me/meItems/meItems',
                  })
                }
              })
            }
          })         
        }
      }
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var user=wx.getStorageSync("user");
    that.setData({
      image:qiniuHost+user.image
    })
  },

 
})