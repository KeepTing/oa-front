// pages/taskDetail/taskDetail.js
Page({
  data: {
  },
  onLoad: function (e) {
    var that = this
    that.setData({
      title: e.title
    })
    wx.setNavigationBarTitle({
      title: e.title
    })
    }
  
})
