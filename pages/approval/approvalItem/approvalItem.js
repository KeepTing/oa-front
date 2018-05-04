// pages/approval/approvalItem/approvalItem.js
Page({
  data: {
    info:[
      {title:'请假'},
      {title:'调休'},
      ]
  },
  clickto:function(e){
    if (e.target.dataset.title=='请假'){
      wx.navigateTo({
        url: '/pages/approval/addApproval/addApproval',
      })
    }
    console.log(e.target.dataset.title);
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发审批',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#515e66',
    })
  }
})