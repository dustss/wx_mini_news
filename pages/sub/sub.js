// pages/sub/sub.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subBlockNews: [],
    type: 'gj'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.subBlockNews.push({
    //   id: '12345678',
    //   newsTitle: '亚洲媒体高峰会议来了！',
    //   newsTime: '2018-04-06T11:28:25.000Z',
    //   newsFrome: '环球资讯',
    //   newsPicturePath: 'http://inews.gtimg.com/newsapp_bt/0/3199649303/641'     //初始化数据
    // })
    this.setData({
      type: options.type
    })
    this.getSubBlockNews()
  },
  /*点击新闻条目显示详情页面，传入参数 id */
  onClickListener() {
    wx.navigateTo({
      url: '/pages/detail/detail?' + 'id=xxxx'
    })
  },

  /**
   * 从网络侧获取对应板块的新闻列表数据
   */
  getSubBlockNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
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
    for (let i = 0; i < result.length ; i++) {
      subBlockNews.push({
        id:result[i].id,
        newsTitle: result[i].title,
        newsTime: result[i].date,
        newsFrome: result[i].source,
        newsPicturePath:result[i].firstImage              //需要考虑到没有图片的情况
      })
    }
    this.setData({
      subBlockNews: subBlockNews
    })
  },

  /*下拉列表刷新内容 */
  onPullDownRefresh() {
    this.getSubBlockNews(() => {
      wx.stopPullDownRefresh()
    })
  },

})