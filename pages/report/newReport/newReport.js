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
    wx.redirectTo({
      url: '/pages/report/addReport/addReport',
    })
  },
  toaddMonth: function (e) {
    wx.redirectTo({
      url: '/pages/report/addMonth/addMonth',
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新建汇报',
    })
  }
})