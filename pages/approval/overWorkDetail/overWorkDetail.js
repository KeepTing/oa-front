// pages/approval/overWorkDetail/overWorkDetail.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    array1: ['审批中', '已同意', '驳回'],
    ot_id: '',
    fromname: '',
    startTime: '',
    endTime: '',
    hours: '',

    toHeadImg: '',
    toname: '',

    status: '',
    title: '',
    content: '',
    btn: 0,//底部按钮掩藏
    current: 1,//详细列表显示
    current1: 1,
    reason: '',
    currentDel: "none"
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
      url: host + '/overtime/update',
      header: {
        "Content-Type": "application/json",
        'Cookie': header.Cookie
      },
      method: 'POST',
      data: {
        status: 2,
        reason: that.data.reason,
        ot_id: that.data.ot_id
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
      url: host + '/overtime/update',
      header: {
        "Content-Type": "application/json",
        'Cookie': header.Cookie
      },
      method: 'POST',
      data: {
        status: 1,
        ot_id: that.data.ot_id
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

  //删除
  _delete: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除该审批？',
      success: function (res) {
        if (res.confirm) {
          //删除审批
          wx.request({
            url: host + '/overtime/delete/' + that.data.ot_id,
            header: header,
            method: 'PUT',
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
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
   
  },

  onLoad: function (e) {
    var that = this;
    that.setData({
      ot_id: e.id
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
      url: host + '/overtime/detail/' + e.id,
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log("dsfdsfsdsdfsdf"+JSON.stringify(res.data))
        var overtime = res.data;
        if (overtime != null && overtime != "") {

          that.setData({
            fromname: overtime.fromname,
            startTime: overtime.startTime,
            endTime: overtime.endTime,
            hours: overtime.hours,
            toHeadImg: overtime.toHeadImg,
            toname: overtime.toname,
            content: overtime.content
          });

          var user = wx.getStorageSync("user");
          var status = overtime.status;
          if (status == 0) { //审批中
            if (user.eid == overtime.toid) {  //如果当前用户是审批人
              //显示“同意”、“驳回”按钮
              that.setData({
                btn: 1
              })
            }
          }
          else if (status == 2) { //驳回
            that.setData({
              reason: overtime.reason, //显示驳回原因
              current1: 0
            })
          }

          that.setData({
            status: status
          })

          if (user.eid == overtime.fromid) {
            that.setData({
              currentDel:"block"
            })
          } else {
            that.setData({
              currentDel: "none"
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