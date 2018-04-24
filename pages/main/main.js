
const blockCN = [
  '国内', '国际', '财经', '娱乐', '军事', '体育', '其他'
]

const blockCNs = [
  'gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other'
]

const NEWS_URI = 'https://test-miniprogram.com/api/news/list'

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    blockData: [],
    selectedID: 1,
    subBlockNews: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setBlockData()
    this.getSubBlockNews(this.data.selectedID)
  },

  /**
   * 填充tab的板块名称
   */
  setBlockData() {
    let blockData = []
    for (let i = 0; i < blockCN.length; i++) {
      blockData.push({
        blockName: blockCN[i]
      })
    }
    this.setData({ blockData: blockData })
  },

  /**
   * 点击tab 选择相应板块 
   */
  onBlockSelect(e) {
    var ID = e.currentTarget.id
    if (this.selectedID === ID) { return false }
    this.setData({ selectedID: ID })
    this.getSubBlockNews(ID)
  },

  /**
   * 从网络侧获取对应板块的新闻列表数据
   */
  getSubBlockNews(id) {
    wx.request({
      url: NEWS_URI,
      data: { "type": blockCNs[id] },
      success: res => {
        this.setSubBlockNews(res.data.result)
      },
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
    this.getSubBlockNews(this.data.selectedID)
  },

  /*点击新闻条目显示详情页面，传入参数 id */
  onFurtherInfo(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + this.data.subBlockNews[e.currentTarget.id].newsID
    })
  },



})