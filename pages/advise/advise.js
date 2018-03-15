// pages/advise/advise.js
Page({
  onLoad: function (e) {
    this.setData({
      title: e.title
    })
    wx.setNavigationBarTitle({
      title: e.title
    })
  }
})