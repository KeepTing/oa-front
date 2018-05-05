// pages/attendance/monthRecord/monthRecord.js
var util = require('../../../utils/util.js');

var host = getApp().globalData.host;
var header = getApp().globalData.header; //获取app.js中的请求
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    attenceAllDays:0,
    lateDays:0,
    earlyDays:0,
    upDays:0,
    downDays:0,
    absenceDays:0
  },
  bindDateChange: function (e) {
    var that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      date: e.detail.value
    })
    var dateTime=e.detail.value;
    //根据日期获取当月考勤记录
    wx.request({
      url: host + '/attence/num/' + dateTime,
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        var aNum = res.data;
        if (aNum != null && aNum != "") {
          that.setData({
            attenceAllDays: aNum.attenceAllDays,
            lateDays: aNum.lateDays,
            earlyDays: aNum.earlyDays,
            upDays: aNum.upDays,
            downDays: aNum.downDays,
            absenceDays: aNum.absenceDays
          })
        } else {
          that.setData({
            attenceAllDays: 0,
            lateDays: 0,
            earlyDays: 0,
            upDays: 0,
            downDays: 0,
            absenceDays: 0
          })
        }

      }
    });


  },
  onLoad: function (options) {

    var that=this;
    var time = util.formatMonth(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  

    that.setData({
      date:time
    })
    
    //根据日期获取当月考勤记录
    wx.request({
      url: host + '/attence/num/'+time,
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        var aNum=res.data;
        if(aNum!=null && aNum!=""){
          that.setData({
            attenceAllDays: aNum.attenceAllDays,
            lateDays: aNum.lateDays,
            earlyDays: aNum.earlyDays,
            upDays: aNum.upDays,
            downDays: aNum.downDays,
            absenceDays: aNum.absenceDays
          })
        }else{
          that.setData({
            attenceAllDays: 0,
            lateDays: 0,
            earlyDays: 0,
            upDays: 0,
            downDays: 0,
            absenceDays: 0
          })
        }

      }
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#5077aa',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
    wx.setNavigationBarTitle({
      title:'月汇总'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})