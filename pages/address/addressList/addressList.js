// pages/addressList/addressList.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 0, d_name: '' },
    ],
  },
  clicktostaff: function (e) {
    wx.navigateTo({
      url: '/pages/address/staffList/staffList?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad: function (e) {
    var that = this;
    var header = getApp().globalData.header; //获取app.js中的请求头
    //发送任务id根据id查询
    wx.request({
      url: host+'/dept/all',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          items: res.data
        });
      }
    });
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
