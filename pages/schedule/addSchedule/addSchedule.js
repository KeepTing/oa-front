// pages/schedule/addSchedule/addSchedule.js
var util = require('../../../utils/util.js');
var dateTimePicker = require('../../../utils/dateTimePicker.js');
Page({
  data: {
    index: 0,
    flag: true,
    src: '',
    hideImg: 1,
    tempFilePaths: '',
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    startDate:''
  },
  onLoad: function (e) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj2 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    var lastArray2 = obj2.dateTimeArray.pop();
    var lastTime2 = obj2.dateTime.pop();

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      dateTimeArray2: obj2.dateTimeArray,
      dateTime2: obj2.dateTime

    });
  

    wx.setNavigationBarTitle({
      title: '新建日程',
    })
  },


  changeDateTime1:function(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTime2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dateTime2: e.detail.value
    })
  },
  changeDateTimeColumn1:function(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });

  },
  changeDateTimeColumn2: function (e) {
    var arr = this.data.dateTime2, dateArr = this.data.dateTimeArray2;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray2: dateArr,
      dateTime2: arr
    });

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
  //提交表单数据
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value; //获取表单所有input的值
    console.log(formData);
    /*wx.request({
      url: '',
      data: formData,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
      }
    })*/
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
  }

})
