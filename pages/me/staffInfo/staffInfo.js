// pages/me/meInfo/meInfo.js

var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头

var qiniuHost = getApp().globalData.qiniuHost;
Page({

  data: {
    navbar: ['进行中', '已完成'],
    navbar1: ['全部', '考勤','公告','任务','日程','分享'],
    currentTab: 0,
    currentTab1: 0,
    phoneNum:'',
    name:'',
    post:'',
    dept:'',
    headImg:'',
    eid:'111',
    address:''

  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  navbarTap1: function (e) {
    this.setData({
      currentTab1: e.currentTarget.dataset.idx
    })
  },
  addDirectory:function(e){
    wx.addPhoneContact({
      firstName:this.data.name,   //名字
      mobilePhoneNumber: this.data.phoneNum,    //手机号
      success: function () {
        console.log('添加成功')
      }
    })
  },
  calling: function () {
    console.log("拨打电话成功！")
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum, 
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  onLoad: function (e) {
   var that=this;
    wx.setNavigationBarTitle({
      title: "信息详情"
    }),
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3399e4',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }

    })
    console.log(e.id);
    var userList=[];
    userList = wx.getStorageSync("toUserList");
    for(var i=0;i<userList.length;i++){
      var user = userList[i];
      if(user.eid==e.id){
        that.setData({
          name: user.username,
          phoneNum: user.phone,
          dept: user.d_name,
          post: user.job,
          headImg: qiniuHost + user.headImg,
          address:user.address
        });
      }
    }

    
  
  }




})