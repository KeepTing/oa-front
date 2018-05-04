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
      username: ''
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
      let arr2 = [];  //
      let arr3 = new Array();
      //将未选中的元素设置为选中状态
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked != true) {
          arr[i].checked = true;
        } 
        arr2.push(arr[i]);
        arr3[i] = arr[i].eid;
      }
      //
      // console.log("yyyyyy"+JSON.stringify(arr2));
      that.setData({
        staff: arr2,
        now:arr3
      })
    } else {  //取消全选
      that.setData({
        selectcheck: !that.data.selectcheck,
        select: '全选'
      })
      //取消所有框
      let arr = that.data.staff;
      let arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        arr[i].checked = false;
        arr2.push(arr[i]);
      }

      
      that.setData({
        staff: arr2,
        now: new Array()  //如果是取消全选，将选中的员工id列表设为空
      })
    }
    wx.setStorageSync("nowselect", data);
    
    wx.getStorage({
      key: 'nowselect',
      success: function (res) {
        console.log("all" + res.data);
      }
    })

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
    var header = getApp().globalData.header; //获取app.js中的请求头
    console.log("id" + e.id);
    
    //发送部门id查询部门员工列表
    wx.request({
            url: host+'/user/list/dept/'+e.id,
            header: header,
            method: 'GET',
            async: false,
            dataType:'json',
            success: function (res) {
              
              console.log(res.data)
              // 把要传递的json对象转换成字符串
              var staffInfo =res.data;
              //将员工列表保存到本地

              var deptUserIdList=new Array();
              for(var i in staffInfo){
                deptUserIdList[i]=staffInfo[i].eid;    //将该部门下的所有员工id添加到数组
              }

              wx.setStorageSync('deptUserIdList', deptUserIdList)
              wx.setStorageSync('deptUserList', JSON.stringify(res.data))
              that.setData({
                staff: staffInfo
              });

              var totalUserIdList = wx.getStorageSync('totalUserIdList');

              var ar = that.data.staff;

              var deptUserIdList = wx.getStorageSync('deptUserIdList');
                     
              let repeatUserIdList = new Array(); //重复的员工id列表 

              //遍历已选择的用户id列表
              for (var i = 0; i < totalUserIdList.length; i++) {
                for (var j = 0; j < deptUserIdList.length; j++) {
                  //如果已选择员工id列表中有员工id是本部门的
                  if (totalUserIdList[i] == deptUserIdList[j]) {
                    ar[j].checked = true;
                    repeatUserIdList.push(totalUserIdList[i]);
                    //将已选员工id列表中的该条id删除
                    totalUserIdList.splice(i, 1);
                  }
                }
              }// 
              wx.setStorageSync('totalUserIdList', totalUserIdList);
              wx.setStorageSync('nowselect', repeatUserIdList);
              that.setData({
                staff: ar
              });
            }
        });
     
    
    
 
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
    var totalUseridList = wx.getStorageSync('totalUserIdList');
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
