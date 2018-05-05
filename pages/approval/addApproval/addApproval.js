// pages/approval/addApproval/addApproval.js
var util = require('../../../utils/util.js');
var judges = require('../../../utils/judge.js');

var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    array: ['事假', '病假', '婚假', '产假', '丧假', '其他'],
    timeArray:['0:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
    timeArray1: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    index: 0,
    index1: 0,
    index2: 0,
    flag: true,
    src: '',
    hideImg: 1,
    tempFilePaths: '',
    startdate: '',
    enddate: '',
    judge: '',
    num: '0',
    topeople:'',//审批人
    toid:0,
    start:'',//最终的开始时间
    end:'',//最终的结束时间
  },

  //类型
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //开始时间
  bindStartDateChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      startdate: e.detail.value
    });
    var startDate = that.data.startdate;
    var endDate = that.data.enddate;
    var endTime = that.data.timeArray1[that.data.index2];
    var startTime = that.data.timeArray[that.data.index1];
    var start = startDate + " " + startTime;
    var end = endDate + " " + endTime;
    var judge1 = judges.judge(start, end); //判断时间大小
    var num1 = judges.num(start, end);
    if (judge1 == false) {
      wx.showToast({
        title: '结束时间不能小于等于开始时间',
        icon: 'none',
        duration: 1000
      });
      that.setData({
        start: start,
        num: 0
      });
    } else {
      that.setData({
        start: start,
        num: num1 
      });
    }
    console.log("天数" + num1);
    console.log('结果' + judge1);

  },
  //开始时间选择器
  bindPickerChangeTime:function(e) {
    var that=this;
    that.setData({
      index1: e.detail.value
    })
    var startDate = that.data.startdate;
    var endDate = that.data.enddate;
    var endTime = that.data.timeArray1[that.data.index2];
    var startTime = that.data.timeArray[that.data.index1];
    var start = startDate + " " + startTime;
    var end = endDate + " " + endTime;
    var judge1 = judges.judge(start, end); //判断时间大小
    var num1 = judges.num(start, end);
    if (judge1 == false) {
      wx.showToast({
        title: '结束时间不能小于等于开始时间',
        icon: 'none',
        duration: 1000
      });
      that.setData({
        start: start,
        num: 0
      });
    } else {
      that.setData({
        start: start,
        num: num1 
      });
    }
    console.log("天数" + num1);
    console.log('结果' + judge1);

  },
  //截至时间
  bindEndDateChange: function (e) {
    var that=this;
    that.setData({
      enddate: e.detail.value
    });
    var startDate = that.data.startdate;
    var endDate = that.data.enddate;
    var endTime = that.data.timeArray1[that.data.index2];
    var startTime = that.data.timeArray[that.data.index1];
    var start = startDate + " " + startTime;
    var end = endDate + " " + endTime;
    var judge1 = judges.judge(start, end); //判断时间大小
    var num1 = judges.num(start, end);
    if (judge1 == false) {
      wx.showToast({
        title: '结束时间不能小于等于开始时间',
        icon: 'none',
        duration: 1000
      });
      that.setData({       
        end:end,
        num: 0
      });
    }else{
      that.setData({
        end: end,
        num:num1
      }); 
    }  
    console.log("天数" + num1);
    console.log('结果' + judge1);
  },
  bindPickerChangeTime1: function (e) {
    var that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      index2: e.detail.value
    });
    var startDate = that.data.startdate;
    var endDate = that.data.enddate;
    var endTime = that.data.timeArray1[that.data.index2];
    var startTime = that.data.timeArray[that.data.index1];
    var start = startDate + " " + startTime;
    var end = endDate + " " + endTime;
    var judge1 = judges.judge(start, end); //判断时间大小
    var num1 = judges.num(start, end);
    if (judge1 == false) {
      wx.showToast({
        title: '结束时间不能小于等于开始时间',
        icon: 'none',
        duration: 1000
      });
      that.setData({
        end: end,
        num: 0
      });
    } else {
      that.setData({
        end: end,
        num: num1
      });
    }
    console.log("天数" + num1);
    console.log('结果' + judge1);
  },
  //选择审批人
 clickto:function(){
   wx.navigateTo({
     url: '/pages/approval/selectedList/selectedList',
   })
 },

  //提交表单数据
  formSubmit: function (e) {
    var that = this;
    // var startDate = that.data.startdate;
    // var startTime = that.data.timeArray[that.data.index1];
    // console.log("start:" + startDate +" "+ startTime);
    console.log("提交start:"+that.data.start);



    var formData = e.detail.value; //获取表单所有input的值
    console.log(formData.taskDate);
    /*wx.request({
      url: '',
      data: formData,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
      }
    })*/
  },
  onLoad: function (e) {
    var that = this;
    wx.setNavigationBarTitle({
      title: "请假"
    });
   
    //获取当前用户的上级
    wx.request({
      url: host + '/user/getSuper',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {

        console.log(res.data)
        var superUser=res.data;
        if(superUser!=null){
          wx.setStorageSync("superUser", superUser);
        }

        that.setData({
          topeople:superUser.username,
          toid:superUser.eid
        })

      }
    });



    var time = util.formatTime(new Date()); 
    that.setData({
      startdate: time,//设置初始值
      enddate: time,//设置初始值
      topeople: time //填入审批人姓名
    })
    //进入页面未选择开始时间
    var startDate = that.data.startdate;
    var startTime = that.data.timeArray[that.data.index1];
    console.log("start:" + startDate + " " + startTime);
    var start = startDate + " " + startTime;
    that.setData({
      start: start
    });
    console.log("onload start:" + that.data.start);
  }
})