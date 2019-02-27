import request from '../utils/request';

export function gettoday() {
  var now= new Date();
  let year=now.getFullYear();
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var day = ("0" + (now.getDate() )).slice(-2);
  let data=year+'-'+month+'-'+day;
  // console.log(data)
  return request(` http://dailyreport.lyzwhh.top/report/frequency/date/${data}`,{
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'token':JSON.parse(localStorage.getItem("data")).tokenStr
    },
    
  })


}
export function query() {
  return request('/api/users');
}
export function getweek() {
  return request(` http://dailyreport.lyzwhh.top/report/weeklyFrequency`,{
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'token':JSON.parse(localStorage.getItem("data")).tokenStr
    },
    
  })


}