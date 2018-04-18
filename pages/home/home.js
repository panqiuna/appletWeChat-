// 引入公共方法；
import { fetchData, starToArray } from '../../util/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {
      mivies: [],
      name: '电影'
    },
    comingSoon: {
      movies: [],
      name: '即将上映'
    },
    top250: {
      movies: [],
      name: 'top250'
    }
  },

  // 搜索框(跳转搜索页)
  bindToSearch() {
    wx.navigateTo({
      url: 'search-page/search-page'
    });
  },
  /**生命周期函数--监听页面加载*/
  onLoad: function (options) {
    // 默认显示20条数据 显示6条
    // ?是显示的数据start=0是从第0条开始count=6是显示的条数
    fetchData('https://api.douban.com/v2/movie/in_theaters?start=0&count=6').then(res => {
      this.processData(res,
        '电影', 'inTheaters')
    }),
      // ?是显示的数据start=0是从第0条开始count=6是显示的条数
      fetchData('https://api.douban.com/v2/movie/comimg_soon').then(res => {
        this.processData(res, '即将到来', 'comingSoon')
      }),
      fetchData('https://api.douban.com/v2/movie/top250').then(res => {
        this.processData(res, 'top250', 'top250')
      })
  },
  // 点击更多
  binToMore(e) {
    var val = e.currentTarget.dataset.more;
    wx.navigateTo({
      url: 'detail/detail?type=' + val,
    });
  },

  processData(res, name, type) {//接收响应
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
        // 截取标题
        title: cur.title.length > 6 ? cur.title.slice(0, 6) + '...' : cur.title,
        rating: {

          stars: starToArray.rating.stars,
          average: cur.rating.average
        },
        id: cur.id
      }
      arr.push(tmpl);
    }

    var obj = {};
    // 转化数据
    //以变量的形式传值
    obj[type] = {
      movies: arr,
      name,
    }
    this.setData(obj)
  },
  // 详情页
  bindTDetail() {
    //调到详情页面
    var mid = e.currentTarget.dataset.mid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + mid,
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