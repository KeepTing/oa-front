//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    flag: true
  },
  a: function () {
    this.setData({ flag: false })
  },
  b: function () {
    this.setData({ flag: true })
  } ,
  toaddTask:function(e){
    wx:wx.navigateTo({
      url: '/pages/task/addTask/addTask'
    })
  },
  toaddReport:function(e){
    wx: wx.navigateTo({
      url: '/pages/report/newReport/newReport'
    })
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
