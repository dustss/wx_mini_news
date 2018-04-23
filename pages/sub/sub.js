// pages/sub/sub.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subBlockNews: [],
    "type": 'gj'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "type": options.type
    })
    this.getSubBlockNews()
  },

  /*点击新闻条目显示详情页面，传入参数 id */
  onFurtherInfo(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + this.data.subBlockNews[e.currentTarget.id].newsID
    })
  },

  /**
   * 从网络侧获取对应板块的新闻列表数据
   */
  getSubBlockNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        "type": this.data.type
      },
      success: res => {
        this.setSubBlockNews(res.data.result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  /**
   * 设置子版块新闻列表内容
   */
  setSubBlockNews(result) {
    let subBlockNews = []
    for (let i = 0; i < result.length; i++) {
      subBlockNews.push({
        newsID: result[i].id || "12345678",
        newsTitle: result[i].title || "标题加载中...",
        newsTime: (result[i].date || "2008-08-08").substr(0, 10),            
        newsFrom: result[i].source,
        newsPicturePath: result[i].firstImage || '/images/logo_black_trans.png'     //空值处理
      })
      this.setData({
        subBlockNews: subBlockNews
      })
    }
  },

  /*下拉列表刷新内容 */
  onPullDownRefresh() {
    this.getSubBlockNews(() => {
      wx.stopPullDownRefresh()
    })
  },

})