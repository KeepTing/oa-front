// pages/report/newReport/newReport.js
Page({
  data: {
    flag: false
  },
  a: function () {
    this.setData({ flag: false })
  },
  b: function () {
    wx.switchTab({
      url: "/pages/index/index"
    })

  },
  toaddweek:function(e){
    wx.navigateTo({
      url: '/pages/report/addReport/addReport?title=周报',
    })
  },
  toaddMonth: function (e) {
    wx.navigateTo({
      url: '/pages/report/addReport/addReport?title=月报',
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新建汇报',
    })
  }
})