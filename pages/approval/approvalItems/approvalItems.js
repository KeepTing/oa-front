// pages/approval/approvalItems/approvalItems.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    navbar: ['我提交的', '我审批的'],
    currentTab: 0,
    current:0,
    // Info: [{
    //   approval_id:'',
    //   headImg:'',
    //   fromUser: "",
    //   type:'',
    //   createTime:'',
    //   status:'3'
    // }],
    // Info1: [{
    //   approval_id:'',
    //   headImg: '',
    //   fromUser: "",
    //   type: '',
    //   createTime: '',
    //   status: '3'
    // }]

  },
  navbarTap: function (e) {
    var that=this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx==1){
      //获取审批列表(我审批的)
      wx.request({
        url: host + '/approval/list?type=1',
        header: header,
        method: 'GET',
        dataType: 'json',
        success: function (res) {

          console.log(res.data)
          var approvals = res.data;
          if (approvals != null && approvals != "") {
            that.setData({
              Info1: approvals,
              current: 1
            })
          }
        }
      });
    } else if (e.currentTarget.dataset.idx == 0){
      //获取审批列表（我申请的）
      wx.request({
        url: host + '/approval/list?type=0',
        header: header,
        method: 'GET',
        dataType: 'json',
        success: function (res) {

          console.log(res.data)
          var approvals = res.data;
         // if (approvals != null && approvals != "") {
            that.setData({
              Info: approvals,
              current: 1
            })
          //}
        }
      });
    }
  },
  navtoDetail: function (e) {
    console.log(e);
    console.log(e.currentTarget.dataset.id+"sdfdsfsdfds");

    var typeApproval = e.currentTarget.dataset.typeapproval;
    console.log(typeApproval+"mmmmmmmmmmmmm");
    if (typeApproval=="请假"){
      wx.navigateTo({
        url: "/pages/approval/approvalDetail/approvalDetail?id=" + e.currentTarget.dataset.id
      })
    }
    if (typeApproval == "报销") {
      wx.navigateTo({
        url: "/pages/approval/expanseDetail/expanseDetail?id=" + e.currentTarget.dataset.id
      })
    }
    if (typeApproval == "加班") {
      wx.navigateTo({
        url: "/pages/approval/overWorkDetail/overWorkDetail?id=" + e.currentTarget.dataset.id
      })
    }
    if (typeApproval == "补卡") {
      wx.navigateTo({
        url: "/pages/approval/replaceCardDetail/replaceCardDetail?id=" + e.currentTarget.dataset.id
      })
    }
   
  },
  addApp:function(e) {
    wx.navigateTo({
      url: "/pages/approval/approvalItem/approvalItem"
    })
  },
  toclick:function (e) {
    var that=this;
    //获取审批列表
    wx.request({
      url: host + '/approval/list?type=1',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {

        console.log(res.data)
        var approvals = res.data;
       // if (approvals != null && approvals != "") {
          that.setData({
            Info1: approvals,
            current:1
          })
       // }
      }
    });
  },
onShow:function(){
    
    var that = this
    wx.setNavigationBarTitle({
      title: '审批列表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#515e66',
    })

    //获取审批列表
    wx.request({
      url: host + '/approval/list?type=0',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {

        console.log(res.data)
        var approvals = res.data;
        if (approvals != null && approvals != "") {
          that.setData({
            Info: approvals
          })
        }
      }
    });
  },
  onLoad: function (e) {
   // console.log(e);
    var that = this
    wx.setNavigationBarTitle({
      title: '审批列表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#515e66',
    })

    //获取审批列表
    wx.request({
      url: host + '/approval/list?type=0',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {

        console.log(res.data)
        var approvals=res.data;
        if(approvals!=null && approvals!=""){
            that.setData({
              Info:approvals
            })
        }
      }
    });
  },

  onPullDownRefresh: function () {
    //wx.startPullDownRefresh();
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      console.log(getCurrentPages().pop().route);
      wx.redirectTo({
        url: "/" + getCurrentPages().pop().route,
      })
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  }
})
