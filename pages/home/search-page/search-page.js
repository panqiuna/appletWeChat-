import { fetchData } from '../../../util/util.js'
Page({
  //避免被赋值
  timer: '',
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    movies: [],
    val:''

  },
  valSearch(e) {//通过事件源拿到值
    var val = e.detail.value;
    if (val) {//如果有值就不获取数据
      this.setData({
        flag: false
      })
      //清楚定时器,防止多次加载，最终只查询一次
      clearTimeout(this.timer);
      //目的是延迟请求数据
      this.timer = setTimeout(() => {//每次查询之前都会把上一次的timer清楚掉
        //调用fetchData
        fetchData('https://apidouban.com/v2/movie/search?q=' + val).then(res => {
          this.processData(res)
        })
      }, 500)

    } else {//否则就获取数据
      //没有数据时也要清除定时器
      clearTimeout(this.timer);
      this.setData({
        flag: true,
        movies: [],
        historys: []//所有的历史
      })
    }

  },
  processData(res) {
    var datas = res.data.subjects;
    var arr = [];
    for (var i = 0; i < datas.length; i++) {
      var cur = datas[i];//每一项
      var tmpl = {};
      tmpl.image = cur.image.small,
        tmpl.title = cur.title,
        tmpl.average = cur.rating.average,
        tmpl.year = cur.year
      //放在循环里循环一次加载一次
      arr.push(tmpl)
    }
    this.setData({
      movies: arr//将数组放到之前初始化的整个数组里
    })
  },
  searchByHistory() {
    var data = e.currentTarget.dataset.history;
    this.setData({
      val,
      flag:false
    });
    fetchData('https://apidouban.com/v2/movie/search?q=' + val).then(res=>{
      this.processData(res);
    })
  },
  //清除历史
  clearHistroy(){
wx.clearStorageSync();
this.setData({
  historys:[]//历史清空
})
  },
  saveStorage(e) {
    var va = e.detail.value;
    //如果输入框有值，历史记录中有值
    // 取历史中的方法
    var historys = wx.getStorageSync('historys') || [];
    // 超找
    var flag = historys.find((item) => {
      return item == val
    })
    //如果没存过就存在历史区
    if (val != '' && !flag) {
      historys.push(val);
      wx.getStorageSync('historys', historys)
      this.setData({
        historys
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //解决默认缓存问题
    var historys = wx.getStorageSync('historys') || [];
    this.setData({
      historys
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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