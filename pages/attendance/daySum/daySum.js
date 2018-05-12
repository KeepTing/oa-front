// pages/attendance/daySum/daySum.js
var util = require('../../../utils/util.js');
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: util.formatTime(new Date()),
    // attenceInfo:[{
    //   username:'ddddd',
    //   startTime:'12:12',
    //   endtime:'23;23',
    //   status:0
    // }],
    a_status:['异常','正常']

  },
  bindDateChange: function (e) {
    var that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      date: e.detail.value
    })
    var searchDate = e.detail.value;
    //根据日期查询日汇总
    wx.request({
      url: host + '/attence/day/list?attenceDate='+searchDate,
      method: 'get',
      header: header,
      dataType: "json",
      success: function (res) {
        console.log(res.data)
        var result = res.data;
        if (result + "" == "no_login") {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else {
          var attenceDayList = result.attenceDayList;
          that.setData({
            attenceInfo: attenceDayList
          })
        }
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.setNavigationBarTitle({
      title: '下属日汇总',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#5077aa',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    var user=wx.getStorageSync("user");
    if(user.role==0){  //管理员可以查看公司所有员工
      //所有员工日汇总
      wx.request({
        url: host + '/attence/day/list',
        method: 'get',
        header: header,
        dataType: "json",
        success: function (res) {
          console.log(res.data)
          var result = res.data;
          if (result + "" == "no_login") {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            var attenceDayList = result.attenceDayList;
            that.setData({
              attenceInfo: attenceDayList
            })
          }
        }
      })
    }else if(user.role==1){ //部门经理只能查看自己部门员工
      //部门员工考勤日汇总
      wx.request({
        url: host + '/attence/day/list?d_id='+user.d_id,
        method: 'get',
        header: header,
        dataType: "json",
        success: function (res) {
          console.log(res.data)
          var result = res.data;
          if (result + "" == "no_login") {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            var attenceDayList = result.attenceDayList;
            that.setData({
              attenceInfo: attenceDayList
            })
          }
        }
      })
    }  //end else
  

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