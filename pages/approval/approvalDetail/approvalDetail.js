Page({
  data: {
    qjtype:'事假',
    startTime:'2018-12-12',
    endTime:'2018-12-12',
    numTime:'120小时',
    src:'/pages/img/tx.jpg',
    name:'王小婷',
    status:'已同意'
  },

  onLoad: function (e) {
    var that = this;
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#515e66',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    console.log(e);
    wx.setNavigationBarTitle({
      title: '请假详情'
    });
    var header = getApp().globalData.header;
    //发送id根据id查询
    // wx.request({
    //   url: 'http://127.0.0.1:8080/task/detail/'+e.id,
    //         header:header,
    //         method: 'GET',
    //         dataType:'json',
    //         success: function (res) {
    //           console.log(res.data)
    //           that.setData({
    //             id: res.data.t_id,
    //             title: res.data.t_title,
    //             fromPeople: res.data.endTime,
    //             content: res.data.t_desc,
    //             enddate: res.data.endTime,

    //           });
    //          
    //       });

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

  }
})