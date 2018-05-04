// pages/notice/noticeItems/noticeItems.js
Page({
  data: {
    rInfo: [{
      id:'',
      srcimg:'/pages/img/tx.jpg',
      name: '王建东',
      time: '2014-12-12',
      title:'断电公关稿',
      content:''
    }]
  },
  navtoDetail: function (e) {

    wx.navigateTo({
      url: "/pages/notice/noticeDetail/noticeDetail?id=" + e.currentTarget.dataset.id 

    })
  },
  onLoad: function (e) {
    var that = this;
    console.log(e);
    wx.setNavigationBarTitle({
      title: e.title
    })
    var header = getApp().globalData.header;
    //公告列表
    // wx.request({
    //   url: 'http://127.0.0.1:8080/task/detail/',
    //         header:header,
    //         method: 'GET',
    //         dataType:'json',
    //         success: function (res) {
    //           console.log(res.data)
    //           that.setData({
    //             rInfo:res.data
    //           });
    //       });
  },
})