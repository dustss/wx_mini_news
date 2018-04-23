// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1523074607690,
    newsDetail: [],
    newsTitle: "新闻默认标题",
    newsDate: "2002-08-08",
    newsFrom: "新华社",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getNewsDetail()
  },

  /**获取新闻详情 */
  getNewsDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        this.setNewsDetail(res.data.result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  /**列表数据刷新 */
  setNewsDetail(result) {
    this.setData({
      newsTitle: result.title,
      newsDate: result.date.substr(0, 10) + " " + result.date.substr(11, 8),
      newsFrom: result.source,
    })
    let newsDetail = result.content
    for (let i = 0; i < newsDetail.length; i++) {
      if (newsDetail[i].type == 'p')
        newsDetail.push({
          newsContent: newsDetail[i].text
        })
      else if (newsDetail[i].type == 'image') {
        newsDetail.push({
          newsImagePath: newsDetail[i].src
        })
      }
      else if (newsDetail[i].type == 'strong') {
        newsDetail.push({
          newsSContent: newsDetail[i].text
        })
      }
      this.setData({
        newsDetail: newsDetail
      })
    }
    this.setData({
      readCount: result.readCount
    })
  },

  /*下拉列表刷新内容 */
  onPullDownRefresh() {
    this.getNewsDetail(() => {
      wx.stopPullDownRefresh()
    })
  },

})