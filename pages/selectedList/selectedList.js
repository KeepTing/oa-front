// pages/task/selectedList/selectedList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedList: [{
      username: "",
      eid: "",
      status: 0
    }],
    list: ["完成", "未完成"],
  
  },

  staffDetail:function(e){
    wx.navigateTo({
      url: '/pages/me/staffInfo/staffInfo?id='+e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that=this;
  //  var taskid=e.id;
  //  console.log(taskid);
    that.setData({
     selectedList: wx.getStorageSync("toUserList")
   })

    console.log("jjkjkkjkjjkjkjkkjk"+that.data.selectedList);
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