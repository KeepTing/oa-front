// pages/notice/noticeItems/noticeItems.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    rInfo: [{
      id:'',
      headImg:'',
      fromUser: '',
      createTime: '',
      title:'',
    }],
    currentTab: 1
  },
  navtoDetail: function (e) {

    wx.navigateTo({
      url: "/pages/notice/noticeDetail/noticeDetail?noticeid=" + e.currentTarget.dataset.id 

    })
  },
  clicktoadd: function () {

    wx.setStorageSync("totalUserIdList", []);
    wx.navigateTo({
      url: '/pages/notice/addNotice/addNotice',
    })
  },
  onLoad: function (e) {
    var that = this;
    console.log(e);
    wx.setNavigationBarTitle({
      title: "公告列表"
    })

    var user=wx.getStorageSync("user");
    if(user!=null){
      if(user.role==0 || user.role==1){
        console.log(user.role);
          that.setData({
            currentTab:0
          })
      }
    }

    //公告列表
    wx.request({
      url: host+'/notice/all',
      header:header,
      method: 'GET',
      dataType:'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          rInfo:res.data
        });
      }    
    });
  },
})