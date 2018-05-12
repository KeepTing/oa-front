// pages/report/reportDetail/reportDetail.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    type:'',
    r_id:'',
    date:'',
    frompeople:'',
    topeople:'',
    content:'',
    array: ['周报', '月报'],

  },
  //打开遮罩
  tomodel: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            wx.showModal({
              title: '提示',
              content: '确定要删除该条汇报？',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  wx.request({
                    url: host + '/report/delete/' + that.data.r_id,
                    header: header,
                    method: 'PUT',
                    dataType: 'json',
                    success: function (res) {
                      console.log(res.data)
                      if (res.data + "" == "no_login") {
                        wx.redirectTo({
                          url: '/pages/login/login',
                        })
                      } else {
                        wx.showToast({
                          title: '删除成功',
                        })

                        wx.navigateBack({
                          delta: 1
                        })
                      }
                     
                     
                   
                      // getCurrentPages().splice(getCurrentPages().length - 1, 1);
                     
                    }
                  });
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          
          } 
        }
      }
    })
  },
  onLoad: function (e) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#279bee',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    var that = this;
    console.log(e);
    wx.setNavigationBarTitle({
      title:'汇报详情'
    })

    that.setData({
      r_id:e.id
    })

    var r_id=e.id;
    console.log(r_id+"sdfsdfsdf");
    var reportList=wx.getStorageSync("reportList");
    for(var i=0;i<reportList.length;i++){
        if(r_id==reportList[i].r_id){
            that.setData({
              type: reportList[i].type,
              date: reportList[i].timeRange,
              frompeople: reportList[i].fromname,
              topeople: reportList[i].toname,
              content: reportList[i].content
            })
        }
    }
  },
})