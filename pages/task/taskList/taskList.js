// pages/task/taskList/taskList.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头

Page({
  data: {
    navbar: ['进行中', '已完成'],
    currentTab: 0,
    // taskInfo: [{
    //   t_id:"",
    //   t_title: "",
    //   endTime: ''
    // }],
    // taskInfo1: [{
    //   t_id: "",
    //   t_title: "",
    //   endTime: ''
    // }],
    id:''

  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
 
  onLoad: function (e) {

    var that = this//不要漏了这句，很重要
    that.setData({
      title: e.title
    });
    wx.setNavigationBarTitle({
      title: e.title
    });
    //获取id
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log("value"+res.data);
        that.data.id = res.data;
        //根据title查询任务列表
        if (e.title == "今日待办") {
          console.log(that.data.id);
          //发送请求查询今日待办中进行中的任务
          wx.request({
            url:host+'/task/todayTask?status=0',
            header: header,
            dataType:'json',
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
          //发送请求查询今日待办中已完成的任务
          // wx.request({
          //   url: host + '/task/todayTask?status=1',
          //   header: header,
          //   dataType: 'json',
          //   method: 'GET',
          //   success: function (res) {

          //     console.log(res.data)
          //     // 把要传递的json对象转换成字符串
          //     var taskInfo = res.data;
          //     console.log(taskInfo);
          //     that.setData({
          //       taskInfo1: taskInfo
          //     });
          //   }
          // });
          

        }
        if (e.title == "全部") {
          //发送请求查询全部中进行中的任务
          wx.request({
            url: host+'/task/allTask?status=0',
            header: header,
            method: 'GET',
            dataType:'json',
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
          //发送请求查询全部中已完成的任务
          wx.request({
            url: host + '/task/allTask?status=1',
            header: header,
            method: 'GET',
            dataType: 'json',
            success: function (res) {
              console.log(res.data)
              // 把要传递的json对象转换成字符串
              var taskInfo = res.data;
              console.log(taskInfo);
              that.setData({
                taskInfo1: taskInfo
              });
            }
          });

        }
        if (e.title == "分配给我") {
          //分配给我
          wx.request({
            url: host+'/task/toMeTask?status=0',
            header:header,
            dataType:'json',
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
          //分配给我
          wx.request({
            url: host + '/task/toMeTask?status=1',
            header: header,
            dataType: 'json',
            method: 'GET',
            success: function (res) {
              console.log(res.data)
              // 把要传递的json对象转换成字符串
              var taskInfo = res.data;
              console.log(taskInfo);
              that.setData({
                taskInfo1: taskInfo
              });
            }
          });

        }
        if (e.title == "我验收的") {
          //发送请求查询我验收的中进行中的任务
          wx.request({
            url: host+'/task/fromMeTask?status=0',
            header: header,
            method: 'GET',
            dataType:'json',
            success: function (res) {
              //console.log(res.data)
              // 把要传递的json对象转换成字符串
              var taskInfo = res.data;
              console.log("00000000"+taskInfo);
              that.setData({
                taskInfo: taskInfo
              });
            }
          });
          //发送请求查询我验收的中已完成的任务
          wx.request({
            url: host + '/task/fromMeTask?status=1',
            header: header,
            method: 'GET',
            dataType: 'json',
            success: function (res) {
              // console.log(res.data)
              // 把要传递的json对象转换成字符串
              var taskInfo = res.data;
              console.log("111111"+taskInfo);
              that.setData({
                taskInfo1: taskInfo
              });
            }
          });

        }

      }
    })
    
  },
})
