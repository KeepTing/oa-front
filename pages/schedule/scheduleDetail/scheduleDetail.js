// pages/schedule/scheduleDetail/scheduleDetail.js
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
  otherOper: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['删除公告', '编辑公示期'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseMenu('删除公告')
          } else if (res.tapIndex == 1) {
            that.chooseMenu('编辑公示期')
          }
        }
      }
    })
  },
  chooseMenu: function (type) {
    wx.showToast({
      title: type,
      icon: 'none',
      duration: 2000
    })
  },
  clickToComment: function (e) {
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
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
      title: '日程详情'
    })
  },
})