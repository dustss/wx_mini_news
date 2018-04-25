// pages/detail/detail.js

const URI_NEWS_DETAIL = 'https://test-miniprogram.com/api/news/detail'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1523074607690,
    newsDetail: [],
    newsTitle: "新闻默认标题",
    newsDate: "2008-08-08",
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
      url: URI_NEWS_DETAIL ,
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
      newsTitle: result.title||"有什么东西阻碍了加载...默认标题",              //空值处理
      newsDate: (result.date||"2008-08-08").substr(0, 10) + " " + (result.date||"08:08:08").substr(11, 8),
      newsFrom: result.source ||"",
    })
    let newsDetail = result.content
    for (let i = 0; i < newsDetail.length; i++) {
      if (newsDetail[i].type == 'p')
        newsDetail.push({
          newsContent: newsDetail[i].text||""
        })
      else if (newsDetail[i].type == 'image') {
        newsDetail.push({
          newsImagePath: newsDetail[i].src || ""
        })
      }
      else if (newsDetail[i].type == 'strong') {
        newsDetail.push({
          newsSContent: newsDetail[i].text || ""
        })
      }
      this.setData({
        newsDetail: newsDetail
      })
    }
    this.setData({
      readCount: result.readCount||"-13579"
    })
  },

  /*下拉列表刷新内容 */
  onPullDownRefresh() {
    this.getNewsDetail(() => {
      wx.stopPullDownRefresh()
    })
  },

})