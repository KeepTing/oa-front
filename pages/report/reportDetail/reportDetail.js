// pages/report/reportDetail/reportDetail.js
Page({
  data: {
    rInfo: [{
      name: '王建东',
      topic: '月报',
      date: '3-9'
    }, {
      name: '胡建东',
      topic: '月报',
      date: '3-9'
    }]
  },
  onLoad: function (e) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#279bee',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    var that = this;
    console.log(e);
    wx.setNavigationBarTitle({
      title:'汇报详情'
    })
  },
})