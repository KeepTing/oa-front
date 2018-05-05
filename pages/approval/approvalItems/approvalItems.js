// pages/approval/approvalItems/approvalItems.js
Page({
  data: {
    navbar: ['进行中', '已完成'],
    currentTab: 0,
    Info: [{
      src:'/pages/img/tx.jpg',
      name: "王笑笑",
      topic:'病假',
      date:'2015-12-12',
      status:'审批中'
    }, {
        src: '/pages/img/tx.jpg',
        name: "王笑笑",
        topic: '病假',
        date: '2015-12-12',
        status: '审批中'
    }]

  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  navtoDetail: function (e) {
    wx.navigateTo({
      url: "/pages/approval/approvalDetail/approvalDetail"
    })
  },
  addApp:function(e) {
    wx.navigateTo({
      url: "/pages/approval/approvalItem/approvalItem"
    })
  },
  onLoad: function (e) {
    console.log(e);
    var that = this
    that.setData({
      title: e.title
    })
    wx.setNavigationBarTitle({
      title: e.title
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#515e66',
    })
  }
})
