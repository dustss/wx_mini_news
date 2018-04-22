// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    newsDetail: [],
    newsTitle : "新闻默认标题",
    newsFirstImagePath : 'http://inews.gtimg.com/newsapp_bt/0/3201496222/641',
    newsDate : "2002-08-08",
    newsFrom : "新华社",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    console.log(this.data.id)

    this.getNewsDetail()
  },

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

  setNewsDetail(result) {
    let newsTitle = result.title
    let newsFirstImagePath = result.firstImage
    let newsDate = result.date
    let newsFrom = result.source
    let newsDetail = result.content
    for (let i = 0; i < newsDetail.length; i++) {
      if (newsDetail[i].type == 'p')
      newsDetail.push({
        newsContent: newsDetail[i].text
      })
      else if (newsDetail[i].type == 'image'){
        newsDetail.push({
          newsImagePath: newsDetail[i].image
        })
      } 
      else if (newsDetail[i].type == 'strong'){
        newsDetail.push({
          newsSContent: newsDetail[i].text
        })
      } 
    }
    this.setData({
      newsTitle : newsTitle,
      newsFirstImagePath : newsFirstImagePath,
      newsDate : newsDate,
      newsFrom : newsFrom,
      newsFirstImagePath : newsFirstImagePath,
      newsDetail: newsDetail
    })
  },


})