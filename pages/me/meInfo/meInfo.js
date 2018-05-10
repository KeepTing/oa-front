// pages/me/meInfo/meInfo.js
var util = require('../../../utils/util.js');
var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头

var qiniuHost = getApp().globalData.qiniuHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    image:'',
    username:'',//姓名
    array:['男','女'],//性别
    index:0,
    phone:'',//手机号
    account:'',//帐号
    password:'',//密码
    email:'',//邮箱
    qq:'',//qq
    birthday:'',//出生日期
    address:'',
    company:'',
    c_id:'',
    dept:'',
    d_id:'',
    job:'',
    idcard:'',
    entryDate: '',
    date: '',
    formalDate: '',
    array1: ['未婚', '已婚','离婚','丧偶'],
    index1: 0,
    eid:'',
    role:['管理员','部门经理','普通员工'],
    indexrole:0,



  
  },
  //sex
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  marry: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  //出生
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //入职日期
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      entryDate: e.detail.value
    })
  },
  //转正日期
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      formalDate: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that=this;
    // e.detail.value.sex = that.data.array[that.data.index];
    var formdate=e.detail.value;
    //更新个人信息
    wx.request({
      url: host + '/user/update',
      header: {
        'Content-Type': 'application/json',
        'Cookie': header.Cookie
      },
      data:formdate,
      method: "POST",
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        if(res.data!=null){
          if (res.data + "" == "no_login") {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
          else {
              wx.setStorageSync("user", res.data);
              wx.showToast({
                title: '保存成功',
                success:function(){
                  wx.switchTab({
                    url: '/pages/me/meItems/meItems',
                  })
                }
              })
          }
        }
        
      }
    })
  },
  onLoad: function (options) {
    var that =this;

    var user=wx.getStorageSync("user");
    that.setData({
      id:user.id,
      image:user.image,
      username: user.username,//姓名
      index: user.sex,
      phone: user.phone,//手机号
      account: user.account,//帐号
      password: user.password,//密码
      email: user.email,//邮箱
      qq: user.qq,//qq
      birthday: user.birthday,//出生日期
      address: user.address,
      job: user.job,
      idcard:user.idcard,
      entryDate: user.entryDate,
      formalDate: user.formalDate,
      index1: user.is_marry,
      eid: user.eid,
      d_id:user.d_id,
      c_id:user.c_id,
      indexrole: user.role,
    })
    //根据id查询部门
    wx.request({
      url: host + '/dept/get/'+user.d_id,
      header: header,
      method: "GET",
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        that.setData({
          dept:res.data.d_name  
        })
      }
    })

    //根据id查询公司
    wx.request({
      url: host + '/company/get/' + user.c_id,
      header: header,
      method: "GET",
      dataType: 'json',
      success: function (res) {
        console.log("dffsfdfsfds"+res.data);
        that.setData({
          company: res.data.cName
        })
      }
    })

    
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