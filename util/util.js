// 抓取数据的方法；
function fetchData(url) {
  var promise = new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      // 访问豆瓣的限制
      header: {
        "content-type": 'json'
      },
      success: resolve,
      fail: reject,
    })
  })
  return promise;
}
//星星的个数

function starToArray(score){
  var star=score.slice(0,1);
  for(var i=0;i<star;i++){
    arr.push(i);
  }
  for(var i=0;i<5-star;i++){
    arr.push(0);
  }
  return star;
}
//导出函数
export { fetchData, starToArray }