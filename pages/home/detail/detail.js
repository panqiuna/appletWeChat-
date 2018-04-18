// 抓取数据
import { fetchData, starToArray } from '../../../util/util.js';
// pages/detail/detail.js
Page({
  /**
  * 页面的初始数据
  */
  data: {
    // 如果是对象数据类型的一定要初始为数组类型
    //初始为数组 
    movies: [],
    count:0//加载更多时从第0条开始
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    // 页面初始化options为页面跳转所带来的参数
    var type = options.type;//拿到类型
    var str = '';
    // 判断type的类型
    switch (type) {
      case '电影':
        str = 'https://api.douban.com/v2/movie/in_theaters';
        break;
      case '即将上映':
        str = 'https://api.douban.com/v2/movie/comimg_soon';
        break;
      case 'top250':
        str = 'https://api.douban.com/v2/movie/top250';
        break;
    }
    // 调取数据
    fetchData(str).then(res => {
      this.processData(res)
    });
    this.setData({//保存一个地址
      url:str
    })
  },
  // 加载更多
  lazyLoad(){//加载的是一个地址
  var count=this.data.count+20
  // 更新掉count
  setData({
    count
  })
  //调延迟加载的时候出现loading标志
  wx.showNavigationBarLoading();
  //存一个地址
    fetchData(this.data.url+"?start="+count+"&count=20").then(res=>{
  this.processData(res);
    })
  },
  processData(res) {//接收响应
    var datas = res.data.subjects;
    // movies的数据
    var arr = [];
    //迭代数据
    for (var i = 0; i < datas.length; i++) {
      // 拿出来每一项datas
      var cur = datas[i];
      // 获取的数据
      var tmpl = {
        images: cur.images.medium,
        // 截取标题的长度
        title: cur.title.length > 6 ? cur.title.slice(0, 6) + '...' : cur.title,
        rating: {
          stars: starToArray.rating.stars,
          average: cur.rating.average
        }
      }
      arr.push(tmpl);
    }
    // 判断如果在加载更多的时候有这些数据时就不重新调用这个方法
    if(this.data.movies.length>0){//如果有电影说明延迟加载
      var arr =this.data.movies.concat(arr)
    }
    this.setData({
      // 然后把movies赋给数组，初始化的movies的数组中就有数据了
      movies: arr//每一次调用都重新声明一次
    });
    //加载过后隐藏掉loading的标志
    wx.hideNavigationBarLoading();

  },

  /**生命周期函数--监听页面初次渲染完成**/
  onReady: function () {

  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {

  },

  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {

  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {

  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {

  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }
})
