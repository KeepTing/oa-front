// pages/task/addTask/addTask.js
var util = require('../../../utils/util.js');
//录音管理
const recorderManager = wx.getRecorderManager()
//音频组件控制
const innerAudioContext = wx.createInnerAudioContext()

var sourceType = [['camera'], ['album'], ['camera', 'album']]

var sizeType = [['compressed'], ['original'], ['compressed', 'original']]

var tempFilePath;

var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头

var app = getApp();

Page({
  data: {
    vsrc: '/image/yy.png',
    ssrc: '/image/pause.png',
    date: '请选择',
    array: ['普通', '紧急', '非常紧急'],
    index: 0,
    flag: true,
    src: '',
    hideImg: 1,
    tempFilePaths: '',
    voiceUrl: '',
    voice:'',
    imgss:'',
    imageList: [],
    idList:"",
    imgUrl:"",
    countIndex: 8,
    currentTab:1,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]

  },
  //选择图片
  chooseImage: function () {

    var that = this;
    that.setData({
      imgUrl:''
    })
    wx.chooseImage({
     
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
        let imgList = that.data.imageList;

        let imgs = new Array();
        wx.setStorageSync("imgppp", '');
        that.uploadimg({
          url: host + '/task/uploadImg',//这里是你图片上传的接口
          path: imgList//这里是选取的图片的地址数组
        });

      }
    })
  },
  //开始录音的时候
  startRecode: function () {
   
    this.setData({
      vsrc: '/image/yyblue.png'
    });
    const options = {
      // duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
   
    recorderManager.onStart(() => {
      console.log('recorder start');
      wx.showToast({
        title: '录音中',
        icon: "loading",
      })
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },

  //停止录音
  endRecode: function () {
    this.setData({
      vsrc: '/image/yy.png'
    });
    var that=this;
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      this.setData({
        voiceUrl: res.tempFilePath,
        currentTab:0
      })

      //上传录音
      wx.uploadFile({
        url: host + "/task/uploadVoice",//
        filePath: this.tempFilePath,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: function (res) {
          wx.setStorageSync("voice", res.data);
          console.log(res);
          that.setData({
            imgUrl: wx.getStorageSync("imgppp"),
            voice: wx.getStorageSync("voice"),
            idList: wx.getStorageSync('finalUserIdList')
          })
        },
        fail: function (res) {
          console.log(res);
          console.log("上传失败，请检查网络");
        },
      })
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },

  //播放声音
  play: function () {
    innerAudioContext.autoplay = true;
    console.log("===============" + this.tempFilePath);
    innerAudioContext.src = this.tempFilePath,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
  //删除录音
  deleteVoice:function(){

      this.tempFilePath='';
      this.setData({
        currentTab:1,
        voiceUrl:''
      })

  },
  
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  chooseRecord: function () {
    wx.navigateTo({
      url: '/pages/task/taskFileChoose/taskFileChoose',
    })
  },
  clickto: function () {
    wx.navigateTo({
      url: '/pages/dept/dept/dept',
    })
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

  //添加任务
  formSubmit: function (e) {
    var that = this;
    e.detail.value.t_toid=wx.getStorageSync('finalUserIdList')+"";
    if (e.detail.value.t_title == "") {
      wx.showToast({
        icon: "none",
        title: '请输入标题',
      })
    } else if (e.detail.value.t_toid == "") {
      wx.showToast({
        icon: "none",
        title: '请选择发送人',
      })
    }
    else if (e.detail.value.t_desc == "") {
      wx.showToast({
        icon: "none",
        title: '请填写内容',
      })
    } else {
      var formData = e.detail.value; //获取表单所有input的值
      formData = e.detail.value;
      console.log("dsfsdfdsf" + JSON.stringify(formData));
      //发送请求添加任务
      wx.request({
        url: host + '/task/add/',
        data: formData,
        dataType: 'json',
        method: 'POST',
        header: header,
        success: function (res) {

          if (JSON.stringify(res.data) == 'true') {

            //此处跳转问题
            wx.navigateBack({
             delta:1
            })
            // wx.redirectTo({
            //   url: "/" + getCurrentPages().pop().route,
            // })
            //console.log("水电费水电费");
          }
          console.log(res.data)
        }
      })


    }
     
 
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
  onLoad: function (options) {
    var that=this;
    //初始化选中的员工id数组
    // wx.setStorage({
    //   key: 'totalUserIdList',
    //   data: new Array(),
    // })
    wx.setStorageSync('totalUserIdList', new Array());
    wx.setStorageSync("imgs", '');
    wx.setStorageSync("voice", '');
    wx.setNavigationBarTitle({
      title: "新建任务"
    });
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    that.setData({
      date: time
    })
  },
  //多张图片上传
  uploadimg: function (data) {
    console.log(data + "vfetgwrninnrwn");
    var that = this,
      i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
    var imgs = new Array();
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      success: (resp) => {
        var imgs = wx.getStorageSync("imgppp");
        if (imgs == null)
          imgs = '';
        else {
          imgs += ',' + resp.data;
          wx.setStorageSync("imgppp", imgs);
        }

        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp)
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log(imgs + "sdfdfsdfsdfsdfsdfsdf");
          console.log('成功：' + success + " 失败：" + fail);
          wx.showToast({
            title: '上传完成',
          });

          this.setData({
            // imgUrl: JSON.stringify(wx.getStorageSync("imgs")),
            imgUrl: wx.getStorageSync("imgppp"),
            voice: wx.getStorageSync("voice"),
            idList: wx.getStorageSync('finalUserIdList')
          })

        } else {//若图片还没有传完，则继续调用函数
          wx.showToast({
            icon:'loading',
            title: '图片上传中',
          })
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  }
})

