//index.js
//获取应用实例
const app = getApp()
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    flag: true,
    current:1
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
  toattence: function (e) {
    wx: wx.navigateTo({
      url: '/pages/attendance/attendPage/attendPage'
    })
  },
  toapproval: function (e) {
    wx: wx.navigateTo({
      url: '/pages/approval/approvalItem/approvalItem'
    })
  },
  noticeList: function (e) {
    wx: wx.navigateTo({
      url: '/pages/notice/noticeItems/noticeItems'
    })
  },
  approalList: function (e) {
    wx: wx.navigateTo({
      url: '/pages/approval/approvalItems/approvalItems'
    })
  },
  navtoDetail: function (e) {
    console.log(e);
    console.log(e.currentTarget.dataset.id + "sdfdsfsdfds");

    var typeApproval = e.currentTarget.dataset.typeapproval;
    console.log(typeApproval + "mmmmmmmmmmmmm");
    if (typeApproval == "请假") {
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
  onShow:function(){

    var that = this;

    var user = wx.getStorageSync("user");
    if (user.role < 2) {  //管理员和部门经理有审批权限
      that.setData({
        current: 0
      })
    }
    //console.log("index获取到的用户名："+e.userName);
    wx.setNavigationBarTitle({
      //e.userName+"的工作台"
      title: "我的工作台"
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#279bee',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    //发送请求查询全部中已完成的公告
    wx.request({
      url: host + '/notice/all',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)

        var user = wx.getStorageSync("user");
        var notices = res.data;
        var noticeList = [];
        for (var i = 0; i < notices.length; i++) {
          if (notices[i].n_toid == user.eid && notices[i].status == 0) {
            noticeList.push(notices[i]);
          }
        }

        //  console.log(taskInfo);
        that.setData({
          noticeInfo: noticeList
        });
      }
    });


    //发送请求查询“待我审批”的审批
    wx.request({
      url: host + '/approval/list?type=1',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)

        var user = wx.getStorageSync("user");
        var approvals = res.data;
        var approvalList = [];
        for (var i = 0; i < approvals.length; i++) {
          if (approvals[i].status == 0) {  //审批中的
            approvalList.push(approvals[i]);
          }
        }

        //  console.log(taskInfo);
        that.setData({
          approvalInfo: approvalList
        });
      }
    });

    //发送请求查询今日待办中未完成的任务
    wx.request({
      url: host + '/task/todayTask?status=0',
      header: header,
      dataType: 'json',
      method: 'GET',
      success: function (res) {

        console.log(res.data)
        // 把要传递的json对象转换成字符串
        var taskInfo = res.data;
        console.log(taskInfo);
        that.setData({
          taskInfo: taskInfo
        });
      }
    });
  },
  onLoad: function (e) {

    var that=this;

    var user=wx.getStorageSync("user");
    if(user.role<2){  //管理员和部门经理有审批权限
      that.setData({
        current:0
      })
    }
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

    //发送请求查询全部中已完成的公告
    wx.request({
      url: host + '/notice/all',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        
        var user=wx.getStorageSync("user");
        var notices = res.data;
        var noticeList=[];
        for(var i=0;i<notices.length;i++){
          if(notices[i].n_toid==user.eid && notices[i].status==0){
            noticeList.push(notices[i]);
          }
        }

      //  console.log(taskInfo);
        that.setData({
          noticeInfo:noticeList
        });
      }
    });
  

    //发送请求查询“待我审批”的审批
    wx.request({
      url: host + '/approval/list?type=1',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)

        var user = wx.getStorageSync("user");
        var approvals = res.data;
        var approvalList = [];
        for (var i = 0; i < approvals.length; i++) {
          if (approvals[i].status == 0) {  //审批中的
            approvalList.push(approvals[i]);
          }
        }

        //  console.log(taskInfo);
        that.setData({
          approvalInfo: approvalList
        });
      }
    });

    //发送请求查询今日待办中未完成的任务
    wx.request({
      url: host + '/task/todayTask?status=0',
      header: header,
      dataType: 'json',
      method: 'GET',
      success: function (res) {

        console.log(res.data)
        // 把要传递的json对象转换成字符串
        var taskInfo = res.data;
        console.log(taskInfo);
        that.setData({
          taskInfo: taskInfo
        });
      }
    });
  },

  onPullDownRefresh: function () {
    //wx.startPullDownRefresh();
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/index/index',
      })
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  }
})
