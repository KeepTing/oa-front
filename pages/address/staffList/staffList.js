// pages/address/staffList/staffList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 0, username: '' },
    ],
  },
  clicktostaff: function (e) {
    wx.navigateTo({
      url: '/pages/me/staffInfo/staffInfo?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad: function (e) {
    var that = this;
    var header = getApp().globalData.header; //获取app.js中的请求头
    //发送任务id根据id查询
    wx.request({
      url: 'http://192.168.0.145:8080/user/list/dept/' + e.id,
      header: header,
      method: 'GET',
      async: false,
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          items: res.data
        });
        wx.setStorageSync("toUserList", res.data);
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