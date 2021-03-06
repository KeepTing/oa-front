// pages/task/taskDetail/taskDetail.js
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
    id: 0,
    title: "",
    fromPeople: "",
    toPeople: "",
    array: ['普通', '紧急', '非常紧急'],
    index: 0,
    date: '',
    content: "",
    voiceUrl: '',
    countIndex: 8,
    currentTab: 0,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    imageList:[],
    ilist:[],
    completeTab:1,
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

  //打开遮罩
  tomodel: function () {
    var that = this;
    var user=wx.getStorageSync("user");

    console.log(that.data.fromPeople+"jjjjjjjjjjjjj"+user.username);
    // if(that.data.fromPeople==user.username){
    //   that.setData({
    //     ilist :['确认完成', '删除任务']
    //   });
    
    // }else{
    //   that.setData({
    //     ilist: ['确认完成']
    //   });
    // }

    wx.showActionSheet({
      itemList: that.data.ilist,
      itemColor: "#CED63A",
      success: function (res) {
      
        if (!res.cancel) {
          var typeOp=that.data.ilist[res.tapIndex];
          that.chooseMenu(typeOp);
            // that.chooseMenu('确认完成')
      }
    }
    })
  },

  chooseMenu: function (type) {
    var that=this;
    console.log(type);
    if(type=='删除任务'){
      //删除任务
      wx.request({
        url: host + '/task/delete/'+that.data.id,
        dataType: 'text',
        method: 'PUT',
        header, header,
        success: function (res) {
            if(res.data=="no_login"){
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }
            else if(res.data=="true"){
              wx.showToast({
                title: '删除成功',
              })

              wx.navigateBack({
                delta: 2
              })
          }
        }
      });
    }

    if (type == '确认完成'){
      wx.request({
        url: host + '/task/complete/' + that.data.id,
        dataType: 'text',
        method: 'put',
        header:header,
        success: function (res) {
          if (res.data == "no_login") {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
          else if (res.data == "true") {

            wx.navigateBack({
              delta:2,
            })

         
          }
        }
      });
    }
    wx.showToast({
      title: type,
      icon: 'none',
      duration: 2000
    })
  },

  clickto: function () {
    wx.navigateTo({
      url: '/pages/selectedList/selectedList?id='+this.data.id,
    })
  },

  onLoad: function (e) {
    var that = this;
    console.log("onload" + that.data.imgList);
    var header = getApp().globalData.header; //获取app.js中的请求头

    wx.setNavigationBarTitle({
      title: '任务详情'
    })
    console.log("taskid" + e.taskid);

    //发送任务id根据id查询
    wx.request({
      url: host+'/task/detail/'+e.taskid,
      header:header,
      method: 'GET',
      dataType:'json',
      success: function (res) {
        console.log(res.data)

        var users = res.data.t_toUserList;
        var user=wx.getStorageSync("user");
        wx.setStorageSync("toUserList", res.data.t_toUserList);
        
        console.log(users);
        //记录完成任务人数
        var count=0;   
        //遍历接收人列表
        for (var i = 0; i < users.length; i++) {
           //如果任务已完成
          if (users[i].status == 1) {
            count++;
             //如果接收人列表中是我，则隐藏底部导航
            if (users[i].eid == user.eid) {
              that.setData({
                completeTab: 1  
              })
            }
          }   
          //如果任务未完成
          else if (users[i].status == 0) {
            //如果接收人列表中有我，则显示底部导航
            if (users[i].eid == user.eid) {
              that.setData({
                completeTab: 0,
                ilist: ['确认完成']
              })
            }
          }
        }


        //如果发送人是我
        if(user.username==res.data.t_fromUser){
          //如果所有负责人的任务已完成
          if (count==users.length) {
            that.setData({
              completeTab: 0,
              ilist: ['删除任务']
            })
          }
          //如果有负责人没完成任务
          else {
            that.setData({
              completeTab: 0,
              ilist: ['确认完成','删除任务']
            })
          }
        }
        var file = JSON.parse(res.data.t_file);
        var imgs=file.image;
        var voice=file.voice;
        if(voice==null ||voice==""){
          that.setData({
            currentTab:1
          })
        }

        //获取图片链接
        var imgUrls=imgs.split(",");
        var imgss=[];
        for(var i=1;i<imgUrls.length;i++){
          imgUrls[i]=qiniuHost+imgUrls[i];
          imgss.push(imgUrls[i]);
         
        }

        that.setData({
          id: res.data.t_id,
          fromPeople: res.data.t_fromUser,
          title: res.data.t_title,
          content: res.data.t_desc,
          date: res.data.endTime,
          index: res.data.type,
          imageList:imgss,
          voiceUrl:qiniuHost+voice
        });
       
        // console.log(JSON.stringify();
        
      }
    });
  }
})