// pages/report/addReport/addReport.js
var util = require('../../../utils/util.js'); 
var getWeek = require('../../../utils/getWeek.js'); 
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    index: 0,
    flag: true,
    array:[],
    toid:'',
    topeople:'',//汇报给
  },
  onLoad: function (e) {
    var that = this; 
    wx.setNavigationBarTitle({
      title: "周报"
    })
    console.log(getWeek.myArray);
    that.setData({
        array: getWeek.myArray
    })
    //获取当前用户的上级
    wx.request({
      url: host + '/user/getSuper',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {

        console.log(res.data)
        var superUser = res.data;
        if (superUser != null) {
          that.setData({
            topeople: superUser.username,
            toid: superUser.eid
          })
        }
      }
    });

  },
  bindWeekChange: function (e) {
    console.log("week")
    this.setData({
      index: e.detail.value
    })
  },
 
  //提交表单数据
  formSubmit: function (e) {
    var that = this;
    e.detail.value.r_toid=that.data.toid;
    e.detail.value.type = 0;
    e.detail.value.timeRange = that.data.array[that.data.index];
    var formData = e.detail.value; //获取表单所有input的值
    console.log(formData);
    //提交汇报
    wx.request({
      url: host + '/report/add',
      header: header,
      method: 'POST',
      data: formData,
      dataType: 'text',
      success: function (res) {
        var result = res.data;
        if (result != null) {
          if (result == "no_login") {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
          else if (result == "true") {
            wx.navigateBack({
              delta:2
            })
          }
        }

      }
    });
  }
 
})
