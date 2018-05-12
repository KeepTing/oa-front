// pages/report/reportItems/reportItems.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    array:['周报','月报'],
    Info:[{
      r_id:'',
      fromname:'',
      fromid:'',
      toid:'',
      toname:'',
      type:'',
      createDate:'',
      timeRange:'',
      headImg:'',
      content:''
      }]
  },
  //打开遮罩
  tomodel: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['我发出的', '我接收的'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
            wx.request({
              url: host + '/report/all/' + res.tapIndex,
              header: header,
              method: 'GET',
              dataType: 'json',
              success: function (res) {
                console.log(res.data)
                if (res.data + "" == "no_login") {
                  wx.redirectTo({
                    url: '/pages/login/login',
                  })
                } else {
                  that.setData({
                    Info: res.data
                  })
                  wx.setStorageSync("reportList", res.data);
                }
              }
            });
        }
      }
    })
  },
  navtoDetail:function(e){
    console.log(e.currentTarget.dataset.id+"gfgfgfgfgfgf");
    wx.navigateTo({
      url: "/pages/report/reportDetail/reportDetail?id=" + e.currentTarget.dataset.id
    }) 
  },
  onShow:function(){
    var that = this;
    wx.setNavigationBarTitle({
      title: '汇报列表',
    })

    //获取汇报列表
    wx.request({
      url: host + '/report/all/0',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        if (res.data + "" == "no_login") {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else {
          that.setData({
            Info: res.data
          })
          wx.setStorageSync("reportList", res.data);
        }

      }
    });
  },
  onLoad: function (e) {
    var that=this;
    console.log(e);
    wx.setNavigationBarTitle({
      title: '汇报列表',
    })

    //获取汇报列表
    wx.request({
      url: host + '/report/all/0',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        if(res.data+""=="no_login"){
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }else{
          that.setData({
            Info: res.data
          })
        wx.setStorageSync("reportList", res.data);
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