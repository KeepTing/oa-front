var sourceType = [ ['camera'], ['album'], ['camera', 'album'] ]
var sizeType = [ ['compressed'], ['original'], ['compressed', 'original'] ]

Page({
  data: {
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],

    //文件上传七牛云后返回的路径集合
    imgQiniuUrl:[]
  },
  submit: function(){

  },
  sourceTypeChange: function (e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange: function (e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange: function (e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })

        let imgList=that.data.imageList;
        let imgs=new Array();
        for(var i=0;i<imgList.length;i++){
          wx.uploadFile({
            //仅为示例，非真实的接口地址
            url: 'http://127.0.0.1:8080/task/uploadImg',
            filePath: imgList[i],
            name: 'file',
            success: function (res) {

              //返回图片上传七牛后的路径
              var imgUrl = res.data;
              imgs.push(imgUrl);

            }
          })
        }

        that.setData({
          imgQiniuList:imgs
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  }
})
