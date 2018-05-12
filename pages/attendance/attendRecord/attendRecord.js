// pages/schedule/meSchedule/meSchedule.js

let chooseYear = null;
let chooseMonth = null;
var util = require('../../../utils/util.js');

var host = getApp().globalData.host;
var header = getApp().globalData.header; //获取app.js中的请求头
const conf = {
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    curYear: '',
    curMonth: '',
    upstatus:'',
    uptime:'',
    downstatus: '',
    downtime: '',
    daynum:''  ,
    days:[]
  },
  onLoad() {
    //进入改页，今天选中
    var num = util.formatDay(new Date());
    num = parseInt(num)-1;
  
    
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#5077aa',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
    wx.setNavigationBarTitle({
      title: '打卡记录'
    });
    const date = new Date();
    const curYear = date.getFullYear();
    const curMonth = date.getMonth() + 1;
    const weeksCh = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(curYear, curMonth);
    this.calculateDays(curYear, curMonth);
    this.setData({
      curYear,
      curMonth,
      weeksCh
    });
    const days = this.data.days;
    console.log("aa" + JSON.stringify(days[num]));
    days[num].choosed = !days[num].choosed;
    console.log("aaaa" + JSON.stringify(days[num]));
    this.setData({
      days: days
    });
    console.log("bb" + days);

    console.log("打开页面时的年月：" + this.data.curYear + "年" + this.data.curMonth + "月");
    var da = util.formatTime(new Date());
    console.log(da);
    var that=this;
    //发送请求，获取今日考勤详情
    wx.request({
      url: host + '/attence/detail/' + da,
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        // console.log(res.data)
        var attence = res.data;
        var startTime='';
        var endTime='';
        var down='';
        var up='';
        if (attence != null && attence != "") {
          if (attence.upstatus != null && attence.upstatus!=""){
            up = attence.upstatus;
          }
          if (attence.startTime != null && attence.startTime!=""){
            startTime = attence.startTime;
          }
          if (attence.downstatus != null && attence.downstatus!=""){
            down = attence.downstatus;
          } 
          if (attence.endTime != null && attence.endTime!=''){
            endTime=attence.endTime;
          }
          that.setData({
            upstatus: up,
            uptime: startTime,
            downstatus: down,
            downtime: attence.endTime,
          });
        }else{
          that.setData({
            upstatus: '',
            uptime: '',
            downstatus: '',
            downtime: '',
          });
        }
      }
    });

  },
  getThisMonthDays(year, month) {
    console.log("得到这个月的天数：" + new Date(year, month, 0).getDate());
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    console.log("得到这个月的第一天是周几：" + new Date(Date.UTC(year, month - 1, 1)).getDay());
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false
      });
    }

    this.setData({
      days
    });
  },
  tapDayItem(e) {
    this.calculateDays(this.data.curYear, this.data.curMonth);
    const idx = e.currentTarget.dataset.idx;
    const days = this.data.days;
    const day = e.currentTarget.dataset.idx + 1;
    console.log(days);

    days[idx].choosed = !days[idx].choosed;
    this.setData({
      days,
    });
   
    var month='';
    var dayy='';
    if (this.data.curMonth<10){
      month = '0' + this.data.curMonth;
    }else{
      month = this.data.curMonth;
    }
    if(day<10){
      dayy='0'+day;
    }else{
      dayy = day;
    }
    
    var d = this.data.curYear + "-" + month + "-" + dayy;

    console.log("选中的日期：" + d);
    var that =this;
    //发送请求，根据日期获取考勤详情
    wx.request({
      url: host+'/attence/detail/'+d,
      header:header,
      method: 'GET',
      dataType:'json',
      success: function (res) {
        // console.log(res.data)
        var attence=res.data;
        var startTime = '';
        var endTime = '';
        var down = '';
        var up = '';
        console.log(JSON.stringify(attence));
        if(attence!=null && attence!=""){
          if(JSON.stringify(attence)=="no_login"){
            wx.redirectTo({
              url: 'pages/login/login',
            })
          }
          // if (attence.upstatus != null && attence.upstatus != "") {
          //   up = attence.upstatus;
          // }
          // if (attence.startTime != null && attence.startTime != "") {
          //   startTime = attence.startTime;
          // }
          // if (attence.downstatus != null && attence.downstatus != "") {
          //   down = attence.downstatus;
          // }
          // if (attence.endTime != null && attence.endTime != '') {
          //   endTime = attence.endTime;
          // }
          that.setData({
            upstatus: attence.upstatus,
            uptime: attence.startTime,
            downstatus: attence.downstatus,
            downtime: attence.endTime,
          });  
        }
        else {
          that.setData({
            upstatus: '',
            uptime: '',
            downstatus: '',
            downtime: '',
          });
        }     
      }
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const curYear = this.data.curYear;
    const curMonth = this.data.curMonth;
    if (handle === 'prev') {
      let newMonth = curMonth - 1;
      let newYear = curYear;
      if (newMonth < 1) {
        newYear = curYear - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        curYear: newYear,
        curMonth: newMonth
      });
    } else {
      let newMonth = curMonth + 1;
      let newYear = curYear;
      if (newMonth > 12) {
        newYear = curYear + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        curYear: newYear,
        curMonth: newMonth
      });
    }
  },

  chooseYearAndMonth() {
    const curYear = this.data.curYear;
    const curMonth = this.data.curMonth;
    let pickerYear = [];
    let pickerMonth = [];
    for (let i = 1900; i <= 2100; i++) {
      pickerYear.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      pickerMonth.push(i);
    }
    const idxYear = pickerYear.indexOf(curYear);
    const idxMonth = pickerMonth.indexOf(curMonth);
    this.setData({
      pickerValue: [idxYear, idxMonth],
      pickerYear,
      pickerMonth,
      showPicker: true,
    });
  },
  pickerChange(e) {
    const val = e.detail.value;
    chooseYear = this.data.pickerYear[val[0]];
    chooseMonth = this.data.pickerMonth[val[1]];
  },
  tapPickerBtn(e) {
    const type = e.currentTarget.dataset.type;
    const o = {
      showPicker: false,
    };
    if (type === 'confirm') {
      o.curYear = chooseYear;
      o.curMonth = chooseMonth;
      this.calculateEmptyGrids(chooseYear, chooseMonth);
      this.calculateDays(chooseYear, chooseMonth);
    }

    this.setData(o);
  },
  onShareAppMessage() {
    return {
      title: '打卡记录',
      desc: '还是新鲜的记录',
      path: 'pages/index/index'
    };
  }
};

Page(conf);
