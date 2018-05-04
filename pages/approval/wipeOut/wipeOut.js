// pages/approval/ wipeOut/ wipeOut.js
var util = require('../../../utils/util.js');
var judges = require('../../../utils/judge.js');
Page({
  data: {
    array: ['事假', '病假', '婚假', '产假', '丧假', '其他'],
    index: 0,
    flag: true,
    src: '',
    hideImg: 1,
    tempFilePaths: '',
    startdate: '',
    enddate: '',
    judge: '',
    num: '0'
  },
  //打开遮罩
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })

  },
  //选择照片方式
  chooseWxImage: function (type) {
    var that = this;
    console.log(type);
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          tempFilePaths: res.tempFilePaths[0],
        })
      }
    })
  },
  //显示遮罩
  showModel: function () {
    this.setData({ flag: false })
    console.log("show");
  },
  //掩藏遮罩
  hideModel: function () {
    console.log("hide");
    this.setData({ flag: true })
  },
  //类型
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //开始时间
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })

  },
  //截至时间
  bindEndDateChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value);

    that.setData({
      enddate: e.detail.value
    });
    var num1 = judges.num(that.data.startdate, that.data.enddate);
    that.setData({
      num: num1
    });
    console.log(that.data.num);
    wx.navigateTo({
      url: '/pages/approval/addApproval/addApproval?num=' + that.data.num
    })
  },

  //选择图片
  chooseImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        that.setData({
          src: tempFilePaths,
          hideImg: 0
        })
        /* wx.uploadFile({
            //仅为示例，非真实的接口地址
           url: 'https://example.weixin.qq.com/upload',
           filePath: tempFilePaths[0],
           name: 'file',
           formData: {
             'user': 'test'
           },
           success: function (res) {
             var data = res.data
           }
         })*/

      }
    })
  },
  //提交表单数据
  formSubmit: function (e) {
    var that = this;
    //判断时间大小
    var judge1 = judges.judge(that.data.startdate, that.data.enddate);

    that.setData({
      judge: judge1,
      num: num1
    })
    console.log('结果' + that.data.judge);
    if (that.data.judge == false) {
      wx.showToast({
        title: '结束时间不能小于等于开始时间',
        icon: 'none',
        duration: 2000
      })
    }
    console.log('Num:' + that.data.num);
    var formData = e.detail.value; //获取表单所有input的值
    console.log(formData.taskDate);
    /*wx.request({
      url: '',
      data: formData,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
      }
    })*/
  },
  onLoad: function (e) {
    wx.setNavigationBarTitle({
      title: "报销"
    });
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      startdate: time,
      enddate: time,
      num: e.num
    })
    var that = this;
    console.log('开始时间' + that.data.startdate);
    console.log('结束时间' + that.data.enddate);

  }
})