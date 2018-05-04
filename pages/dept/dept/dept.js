// pages/dept/dept/dept.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_all: false,
    middlearr: [],
    select: '全选',
    selectcheck: false,
    flag: '',
    selected: [{
      name: ''
    }],
    items: [
      { id: 0, d_name: '' },
    ],
 
  },
  clicktostaff: function (e) {
    var staffinfo = JSON.stringify(this.data.staff);
    // console.log("122" + this.data.flag);
    // console.log("12211" + e.currentTarget.dataset.check);
    if (this.data.flag) { }
    wx.navigateTo({
      url: '/pages/dept/staff/staff?id=' + e.currentTarget.dataset.check,
    })
  },
  selectAll: function (e) {
    let that = this;
    if (that.data.select == "全选") {
      that.setData({
        selectcheck: !that.data.selectcheck,
        select: '取消全选'
      })
    } else {
      that.setData({
        selectcheck: !that.data.selectcheck,
        select: '全选'
      })
 



    }
    console.log(that.data.items);
  },


 
  onLoad: function (e) {
    var that=this;
    //发送任务id根据id查询
    wx.request({
      url: host+'/dept/all',
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        
        console.log(res.data)
        that.setData({
          items: res.data
        });
       
      }
    });
    console.log(this.data.items);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setStorageSync("finalUserIdList",wx.getStorageSync("totalUserIdList"));
    // wx.getStorage({
    //   key: 'totalUserIdList',
    //   success: function(res) {
    //     wx.setStorage({
    //       key: 'finalUserIdList',
    //       data: res.data,
    //     })
    //   },
    // })
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
