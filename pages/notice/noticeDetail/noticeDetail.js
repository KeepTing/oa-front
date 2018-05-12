// pages/notice/noticeDetail/noticeDetail.js
const recorderManager = wx.getRecorderManager()
//音频组件控制
const innerAudioContext = wx.createInnerAudioContext()

var sourceType = [['camera'], ['album'], ['camera', 'album']]

var sizeType = [['compressed'], ['original'], ['compressed', 'original']]

var tempFilePath;

var host = getApp().globalData.host;

var header = getApp().globalData.header; //获取app.js中的请求头

var qiniuHost = getApp().globalData.qiniuHost;
Page({
  data: {
    rInfo: [{
      name: '',
      topic: '',
      date: '9'
    }],
    n_id:'',
    title:'',
    fromPeople:'',
    toPeople:'',
    enddate:'',
    content:'',
    voiceUrl: '',
    countIndex: 8,
    currentTab: 0,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    imageList: [
    ],
    yc:true,
    btntext:'显示',
    animation: '',
    currentTab1: 1
  },
  clicktab:function(){
    var that=this;
    that.animation.translate(0, 0).step();
    that.setData({
      //输出动画
      animation: that.animation.export()
    });
    var yc=!that.data.yc;
    console.log("dd"+yc);
    if(yc==false){
     
      that.animation.translate(0, -30).step();
      that.setData({
        //输出动画
        animation: that.animation.export()
      });
      that.setData({
        yc: yc,
        btntext: '隐藏'
      });
    }else{
      that.setData({
        yc: yc,
        btntext: '显示'
      });
      that.animation.translate(0, 0).step();
      that.setData({
        //输出动画
        animation: that.animation.export()
      });
    }
     
  },
  //删除录音
  deleteVoice: function () {

    //this.tempFilePath = '';
    this.setData({
      currentTab: 1,
      voiceUrl: ''
    })

  },
  //选择图片
  chooseImage1: function () {

    var that = this;

    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        console.log(res.tempFilePaths);
        that.setData({
          imageList: res.tempFilePaths
        })
      }
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
  //播放声音
  play: function () {

    innerAudioContext.autoplay = true;
    wx.setStorage({
      key: 'voice',
      data: " ",
    })
    innerAudioContext.src = this.data.voiceUrl,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
  otherOper:function(e){
    var that = this;
    wx.showActionSheet({
      itemList: ['删除公告', '查看通知情况'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
          wx.showModal({
            title: '提示',
            content: '确认删除公告',
            success:function(res){
                if(res.confirm){
                  //删除公告
                  wx.request({
                    url: host + '/notice/delete/' + that.data.n_id,
                    method: 'PUT',
                    header: header,
                    dataType: "text",
                    success: function (res) {
                      console.log(res.data)
                      if (res.data == "true") {
                        wx.showToast({
                          title: '删除成功',
                        })

                        wx.navigateBack({
                          delta: 1
                        })
                      }
                      else if (res.data == "no_login") {
                        wx.redirectTo({
                          url: '/pages/login/login',
                        })
                      }
                    }
                  })
                }
            }
          })
           
          } else if (res.tapIndex == 1) {
            wx.navigateTo({
              url: '/pages/notice/selectedList/selectedList',
            })
          }
        }
      }
    })
  },
  chooseMenu: function (type) {
    wx.showToast({
      title: type,
      icon: 'none',
      duration: 2000
    })
  },
  
  onLoad: function (e) {

    var that = this;
    console.log("公告id" + e.noticeid);
    
    that.setData({
      n_id:e.noticeid
    })
    var user = wx.getStorageSync("user");
    if (user != null) {
      if (user.role == 0 || user.role == 1) {
        console.log(user.role);
        that.setData({
          currentTab1: 0
        })
      }
    }

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#279bee',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    console.log(e);
    wx.setNavigationBarTitle({
      title: '公告详情'
    });
    var header = getApp().globalData.header;
 
    that.setData({
      voiceUrl: "http://p81iiyqk5.bkt.clouddn.com/_task_voice62a9456d-3d83-4524-9cad-0c466d5e9759.mp3"
    });
    console.log("noticeid" + e.noticeid);

    //发送任务id根据id查询
    wx.request({
      url: host + '/notice/detail/' + e.noticeid,
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        var file={};
        var imgs="";
        var voice="";
        if (res.data.n_file != null && res.data.n_file!=""){
          file = JSON.parse(res.data.n_file);
          imgs = file.image;
          voice = file.voice;
          if (voice == null || voice == "") {
            that.setData({
              currentTab: 1
            })
          } 
        }
        

        //获取图片链接
        var imgUrls = imgs.split(",");
        var imgss = [];
        for (var i = 1; i < imgUrls.length; i++) {
          imgUrls[i] = qiniuHost + imgUrls[i];
          imgss.push(imgUrls[i]);
        }

        var userList = res.data.n_toUserList;
        var toUsers = '';
        //console.log(JSON.stringify(userList));
        wx.setStorageSync("toUserList", userList);
        if(userList!=null){
          for (var i = 0; i < userList.length; i++) {
            if (i == userList.length - 1) {
              toUsers += userList[i].username;
            }
            else {
              toUsers = toUsers + userList[i].username + ",";
            }
          }
        }

        that.setData({
          id: res.data.n_id,
          fromPeople: res.data.n_fromUser,
          title: res.data.n_title,
          content: res.data.n_desc,
          enddate: res.data.pubTime,
          imageList: imgss,
          toPeople:toUsers,
          voiceUrl: qiniuHost + voice
        });
        
      }
    });


    //将当前登录用户的公告状态设置为已读
    wx.request({
      url: host + '/notice/read/' + e.noticeid,
      header: header,
      method: 'PUT',
      dataType: 'json',
      success: function (res) {
        var toUserList = wx.getStorageSync("toUserList");
        var user = wx.getStorageSync("user");
        for (var i = 0; i < toUserList.length; i++) {
          if (toUserList[i].username == user.username) {
            toUserList[i].status = 1;
          }
        }

        wx.setStorageSync("toUserList", toUserList);
      }
    })
  
  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 100,
      transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    })

  }
})