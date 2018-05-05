// pages/attendance/attendPage/attendPage.js
var util = require('../../../utils/util.js');
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({

  data: {
    time: '',
    timeRange: '',//固定时间
    title: '',//打卡之前的标题
    play: true,//控制页面切换
    icon: "iconcheckmark",//打卡成功图标
    titlesuccess: '',//打卡成功标题
    timesuccess: '',//打卡成功时间
    status: '',//打卡成功情况
    current:0,
    num: 0
  },
  tomodel:function(){
    var that = this;
    wx.showActionSheet({
      itemList: ['打卡记录', '月汇总'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            wx.navigateTo({
              url: '/pages/attendance/attendRecord/attendRecord',
            })
          } else if (res.tapIndex == 1) {
            wx.navigateTo({
              url: '/pages/attendance/monthRecord/monthRecord',
            })
          }
        }
      }
    });
  },
  clickto:function(){
    var that=this;

    var cur=that.data.current;
    var timeRange=that.data.timeRange;
    var title='';
    var status='';
    wx.scanCode({
      success: (res) => {
        console.log(res.result);
        if (res.result){
          var attenceTime=res.result;
          if(cur==0){  //下班打卡
            title = '下班打卡成功';
            if(attenceTime<timeRange){  //打卡时间小于正常下班时间
              status = '早退';
            }else{
              status = '正常';
            }
          }
          else if(cur==1){  //上班打卡
            title = '上班打卡成功';

            if (attenceTime>timeRange) {  //打卡时间大于正常上班时间
              status = '迟到';
            } else {
              status = '正常';
            }

            console.log(status+"sdfdsdfsd");
          }

          that.setData({
            titlesuccess:title,
            play: false,
            timesuccess: res.result,
            status:status
          });
          this.animation.translate(0, -100).step()
          this.setData({
            //输出动画     
            animation: this.animation.export()
          })

          //打卡操作
          wx.request({
            url: host + '/attence/add',
            dataType: 'text',
            method: 'GET',
            header: header,
            data:{
              attenceTime: attenceTime    //打卡时间
            },
            success: function (res) {
              if (res.data == "no_login") {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
              // else if (res.data == "true") {
              //   wx.redirectTo({
              //     url: '/pages/task/taskIndex/taskIndex',
              //   })
              // }
            }
          });


        }       
      }
    })

  },
  onLoad: function (e) {

    var that=this;
    //获取上下班打卡时间及操作（上班或下班）
    wx.request({
      url: host + '/attence/operate',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
      var map=res.data;

        // console.log(res.data)
        if(map!=null && map!=""){

          if(JSON.stringify(map)=="no_login"){
            wx.redirectTo({
              url: 'pages/login/login',
            })
          }
          var operate;
          var time = '';
          var title='';
          if (map.operate == "start") {
            operate = 1;
            time = map.startTime;
            title='上班打卡';
          } else if (map.operate == "end") {
            operate = 0;
            time = map.endTime;
            title = '下班打卡';
          }
          console.log(operate+"   "+time);
          that.setData({
            current: operate,
            timeRange: time,
            title:title
          });
        }
        

      }
    });
   wx.setNavigationBarTitle({
     title: '考勤打卡',
   })
   wx.setNavigationBarColor({
     frontColor: '#ffffff',
     backgroundColor: '#5077aa',
     animation: {
       duration: 400,
       timingFunc: 'easeIn'
     }
   })
   var time=util.Time(new Date());
   this.setData({
     time: time
   });
   countdown(this);
   
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
  
  },

  


})
function countdown(that) {
  var time = setTimeout(function () {
    var time1 = util.Time(new Date());
    that.setData({
      time: time1
    });
    countdown(that);
  }
    , 1000)
}

