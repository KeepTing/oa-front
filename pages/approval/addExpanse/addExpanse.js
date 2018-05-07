// pages/approval/addExpanse/addExpanse.js
var util = require('../../../utils/util.js');
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    array: ['差旅费', '交通费','招待费','礼品费','通讯费'],
    index: 0,
    date: '',
    topeople: '徐富豪',//审批人
    toid:''
  },

  //类型
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //选择审批人
  clickto: function () {
    wx.navigateTo({
      url: '/pages/approval/selectedList/selectedList',
    })
  },
  //提交表单数据
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value; 
    if (e.detail.value.re_money.length==0){
      wx.showToast({
        icon:'none',
        title: '请填写报销金额',
      })
    } else if (e.detail.value.re_desc.length == 0){
      wx.showToast({
        title: '请填写报销说明',
      })
    }else{
      //提交报销审批
      wx.request({
        url: host + '/reimburse/add',
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
              wx.redirectTo({
                url: '/pages/approval/approvalItems/approvalItems',
              })
            }
          }

        }
      });
    }
    
  },
  onLoad: function (e) {
    var that = this;
    wx.setNavigationBarTitle({
      title: "补卡"
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#515e66',
    })
    var time = util.formatTime(new Date());
    that.setData({
      date: time,//设置初始值
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
          wx.setStorageSync("superUser", superUser);
          that.setData({
            o_toid: superUser.eid
          })
        }

        that.setData({
          topeople: superUser.username,
          toid: superUser.eid
        })

      }
    });
  }
})