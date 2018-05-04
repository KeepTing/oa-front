  
    function getInfo() {
        var myArray = new Array();
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        d.setFullYear(year, month-1, 1);
        var w1 = d.getDay();
        if (w1 == 0) w1 = 7;
        d.setFullYear(year, month, 0);
        var dd = d.getDate();
        if (w1 != 1) 
        var d1 = 7 - w1 + 2;
        else d1 = 1;
        var week_count = Math.ceil((dd-d1+1)/7);
        for (var i = 0; i < week_count; i++) {
            var monday = d1+i*7;
            var sunday = monday + 6;
            var from = year+"-"+month+"-"+monday;
            var to;
            if (sunday <= dd) {
                to = year+"-"+month+"-"+sunday;
            } else {
                d.setFullYear(year, month-1, sunday);
                to = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"日";
            }
            myArray[i]=from+'至'+to;
            
        }
        return myArray;
   }
var myArray = new Array();
myArray=getInfo();
      module.exports = {
        myArray: myArray
      }
