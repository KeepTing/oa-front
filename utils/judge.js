function judgeTime(startdate, enddate) {
  var startTime = new Date(startdate.replace("//-/g", "//"));
  var endTime = new Date(enddate.replace("//-/g", "//"));

  return startTime < endTime;
}  
function judgeTimeDiffer(startTime, endTime) {
  var startTime = new Date(startTime.replace("//-/g", "//"));
  var endTime = new Date(endTime.replace("//-/g", "//"));

  return parseInt((endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60);
} 
module.exports = {
  judge:judgeTime,
  num: judgeTimeDiffer
}