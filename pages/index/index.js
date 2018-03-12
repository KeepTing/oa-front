//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function (e) {
    //console.log("index获取到的用户名："+e.userName);
    wx.setNavigationBarTitle({
      //e.userName+"的工作台"
      title:"我的工作台"
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#279bee',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
})
