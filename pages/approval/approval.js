// pages/approval/approval.js
Page({
  data: {
    path: ''
  },
  upload: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          path: tempFilePaths
        })
      }
    })
  }
})