// pages/approval/expanseDetail/expanseDetail.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    array: ['差旅费', '交通费', '招待费', '礼品费', '通讯费'],
    re_id:'',
    fromname: '',
    status: '',
    type: 0,
    re_time: '',
    money:'',

    toHeadImg: '',
    toname: '',

    status: '',
    title: '',
    content: '',
    btn: 0,//底部按钮掩藏
    current: 1,//详细列表显示
    current1: 1,
    reason: '',
    currentDel: "none",
  },
  reason: function (e) {
    this.setData({
      reason: e.detail.value
    });
  },
  OK: function () {
    var that = this;
    //驳回
    wx.request({
      url: host + '/reimburse/update',
      header: {
        "Content-Type": "application/json",
        'Cookie': header.Cookie
      },
      method: 'POST',
      data: {
        status: 2,
        reason: that.data.reason,
        re_id: that.data.re_id
      },
      dataType: 'text',
      success: function (res) {
        var result = res.data;
        if (result != null && result != '') {
          if (result == "no_login") {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
          else if (result == "true") {
            wx.showToast({
              title: '审批成功',
            })
            wx.navigateBack({
              delta: 1
            })
          }
        }
      }
    });

  },

  noClickto: function () {
    this.setData({
      current: 0,
      btn: 0
    });
  },

  //批准请求
  yesClickto: function () {
    var that = this;

    //批准
    wx.request({
      url: host + '/reimburse/update',
      header: {
        "Content-Type": "application/json",
        'Cookie': header.Cookie
      },
      method: 'POST',
      data: {
        status: 1,
        re_id: that.data.re_id
      },
      dataType: 'text',
      success: function (res) {
        var result = res.data;
        if (result != null && result != '') {
          if (result == "no_login") {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
          else if (result == "true") {
            wx.showToast({
              title: '审批成功',
            })

           wx.navigateBack({
             delta:1
           })
          }
        }
      }
    });
  },


  //删除
  _delete: function () {
    var that = this;
    //删除审批
    wx.request({
      url: host + '/reimburse/delete/' + that.data.re_id,
      header: header,
      method: 'DELETE',
      dataType: 'text',
      success: function (res) {
        var result = res.data;
        console.log(result)

        if (result == "no_login") {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
        else if (result == "true") {
          wx.showToast({
            title: '删除成功',
          })
          wx.navigateBack({
            delta: 1
          })
        }
      }
    });
  },
  onLoad: function (e) {
    var that = this;
    that.setData({
      re_id: e.id
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#515e66',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    console.log(e);
    wx.setNavigationBarTitle({
      title: '请假详情'
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#515e66',
    })
    var header = getApp().globalData.header;
    //发送id根据id查询
    wx.request({
      url: host + '/reimburse/detail/' + e.id,
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        var reimburse = res.data;
        if (reimburse != null && reimburse != "") {

          that.setData({
            fromname: reimburse.fromname,
            type: reimburse.type,
            re_time: reimburse.re_time,
            money: reimburse.money,
            toHeadImg: reimburse.toHeadImg,
            toname: reimburse.toname,
            content: reimburse.content
          });

          var user = wx.getStorageSync("user");
          var status = reimburse.status;
          if (status == 0) { //审批中
            if (user.eid == reimburse.toid) {  //如果当前用户是审批人
              //显示“同意”、“驳回”按钮
              that.setData({
                btn: 1
              })
            }
          }
          else if (status == 2) { //驳回
            that.setData({
              reason: reimburse.reason, //显示驳回原因
              current1: 0
            })
          }

          that.setData({
            status: status
          })
          if (user.eid == reimburse.fromid) {
            that.setData({
              currentDel: "block"
            })
          } else {
            that.setData({
              currentDel:"none"
            })
          }
        }
      }
    })

  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 100,
      transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    })

  }
})