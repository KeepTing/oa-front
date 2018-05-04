//录音管理
const recorderManager = wx.getRecorderManager()
//音频组件控制
const innerAudioContext = wx.createInnerAudioContext()
var tempFilePath;
Page({
  data: {

  },
  //开始录音的时候
  startRecode: function () {
    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //暂停录音
  pause: function () {
    recorderManager.onPause();
    console.log('暂停录音')
  },
  //停止录音
  endRecode: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      wx.setStorage({
        key: 'voice',
        data: this.tempFilePath,
      })
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },
  //播放声音
  play: function () {
    innerAudioContext.autoplay = true;
    console.log("==============="+this.tempFilePath);
    wx.setStorage({
      key: 'voice',
      data: this.tempFilePath,
    })
    innerAudioContext.src = this.tempFilePath,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
  //上传录音
  upload: function () {
    var voiceUrl = this.tempFilePath;
    console.log("99999999"+voiceUrl);
    wx.uploadFile({
      url: "http://192.168.0.145:8080/task/uploadVoice",//
      filePath: this.tempFilePath,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000,
        })
        console.log("dsffsdfsdfsd"+this.tempFilePath);
        wx.getStorage({
          key: 'voice',
          success: function(res) {
            console.log("898989"+res.data);
            wx.setStorage({
              key: 'voiceUrl',
              data: res.data,
            })
          },
        })
      
        wx.navigateTo({
          url: '/pages/task/addTask/addTask',
        })
      },
      fail: function (res) {
        console.log(res);
        console.log("上传失败，请检查网络");
      },
      complete: function (res) {

      }
    })
  },
  onLoad: function () {

  },
})