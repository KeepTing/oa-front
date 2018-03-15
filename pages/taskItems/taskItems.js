// pages/taskItems/taskItems.js
Page({
  data: {
    navbar: ['进行中', '已完成'],
    currentTab: 0 ,
    taskInfo: [{
      title: "任务标题1",
      dateTime: '截至时间1'
    }, {
      title: "任务标题2",
      dateTime: '截至时间2'
    }] 
    
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  taskDetailClick:function(e){
    wx.navigateTo({
      url: "/pages/taskDetail/taskDetail?title=任务详情" 
    })  
  },
  onLoad: function (e) {
    console.log(e);
    var that = this//不要漏了这句，很重要
    // 把接收到的字符串转换成json对象
    var taskInfo = JSON.parse(e.taskInfo);
    console.log(taskInfo);
    that.setData({
      title: e.title
    })
    wx.setNavigationBarTitle({
      title: e.title
    })
    if (e.title=="今日待办"){
      that.setData({
        taskInfo: taskInfo
      })
    }
  }
})
