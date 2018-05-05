// pages/dept/staff/staff.js
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  data: {
    select: '全选',
    selectcheck: false,
    now: {},
    staff: [{
      eid: 0,
      username: '',
      d_name:''
    }]

  },
  //全选
  selectAll: function (e) {
    
    let that = this;
    // console.log("kkkkkkkkk" + JSON.stringify(that.data.staff));
    if (that.data.select == "全选") {
      that.setData({
        selectcheck: !that.data.selectcheck,
        select: '取消全选'
      })
      //选中所有框
      let arr = that.data.staff;  
      let arr2 = new Array();
      //将未选中的元素设置为选中状态
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked != true) {
          arr[i].checked = true;
        } 
        arr2[i] = arr[i].eid;
      }
      //
      // console.log("yyyyyy"+JSON.stringify(arr2));
      that.setData({
        staff: arr,
        now:arr2
      })
    } else {  //取消全选
      that.setData({
        selectcheck: !that.data.selectcheck,
        select: '全选'
      })
      //取消所有框
      let arr = that.data.staff;
      //let arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        arr[i].checked = false;
       // arr2.push(arr[i]);
      }

      
      that.setData({
        staff: arr,
        now: new Array()  //如果是取消全选，将选中的员工id列表设为空
      })
    }
   wx.setStorageSync("nowselect", that.data.now);
    
    // wx.getStorage({
    //   key: 'nowselect',
    //   success: function (res) {
    //     console.log("all" + res.data);
    //   }
    // })

  },
  checkboxChange: function (e) {
    var that = this;
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)


    that.data.now.length = e.detail.value.length;
    console.log("length" + that.data.now.length);
    let arr3=new Array();
    for (var i = 0; i < e.detail.value.length; i++) {
      arr3[i] = e.detail.value[i];
    }

    that.setData({
      now:arr3
    });

    wx.setStorageSync("nowselect", that.data.now);
  },

  //页面加载事件
  onLoad: function (e) {
    wx.setStorageSync('nowselect', {});
  
    var that=this;
    var users=wx.getStorageSync("toUsers");
    that.setData({
      staff:users
    })
    
    var userAll=that.data.staff;

    var totalUserIdList=wx.getStorageSync("totalUserIdList");
    for(var i=0;i<totalUserIdList.length;i++){
      for(var j=0;j<userAll.length;j++){
        if(totalUserIdList[i]==userAll[j].eid){
          userAll[j].checked=true;
          //totalUserIdList.splice(i,1);
        }
      }
    }

    that.setData({
      staff: userAll,
    })

    wx.setStorageSync("nowselect", totalUserIdList);
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

    var lastUserIdList = wx.getStorageSync('nowselect');
    var totalUseridList = [];
    for (var i = 0; i < lastUserIdList.length; i++) {
      totalUseridList.push(lastUserIdList[i] + "");
    }
    wx.setStorageSync('totalUserIdList', totalUseridList);
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
