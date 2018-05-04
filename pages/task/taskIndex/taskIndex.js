// pages/task/taskIndex/taskIndex.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    taskInfo: [{
      title: "任务标题3",
      dateTime: '截至时间3'
    }, {
      title: "任务标题2",
      dateTime: '截至时间2'
    }],
    today:0,
    all:0,
    tome:0,
    fromme:0
  },
  onLoad: function (e) {
    var that = this
    wx.setNavigationBarTitle({
      title:"任务分类"
    })
  
    //发送请求，查看每个分类的条数
      wx.request({
          url: host+'/task/num',
          dataType:'json',
          method: 'get',
          header,header,
          success: function (res) {
            //console.log("=======" + res.data.todayTasksNum);
            that.setData({
              today: res.data.todayTasksNum,
              all: res.data.allTasksNum,
              tome: res.data.toMeTasksNum,
              fromme:res.data.fromMeTasksNum
            });
          }
        });
    
  }

})