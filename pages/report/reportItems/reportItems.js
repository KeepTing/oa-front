// pages/report/reportItems/reportItems.js
Page({
  data: {
    Info:[{
      name:'王建东',
      topic:'月报',
      date:'3-9'
      },{
        name: '胡建东',
        topic: '月报',
        date: '3-9'
      }]
  },
  navtoDetail:function(e){
    wx.navigateTo({
      url: "/pages/report/reportDetail/reportDetail"
    }) 
  },
  onLoad: function (e) {
    var that=this;
    console.log(e);
    wx.setNavigationBarTitle({
      title: e.title
    })
  }
})