// pages/addTask/addTask.js
var util = require('../../utils/util.js');  
Page({
  data: {
    date:'请选择',
    array: ['普通', '紧急', '非常紧急'],
    index:0,
    flag:true,
    src:'',
    hideImg:1,
    tempFilePaths: ''
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
  //优先级
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //截至时间
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //提交表单数据
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value; //获取表单所有input的值
    console.log(formData.taskName);  
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
  chooseImg:function(e){
    var that=this;
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
          hideImg:0
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
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "新建任务"
    });
     // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      date: time
    })  
  }
})