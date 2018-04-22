// pages/index/index.js

const blockCN = [
  '国内', '国际', '财经', '娱乐', '军事', '体育', '其他'
]

const blockCNs = [
  'gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other'
]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    blockData: [],
    index: 0
  },

  setBlockData() {
    let blockData = []
    for (let i = 0; i < 7; i++) {
      blockData.push({
        blockName: blockCN[i]
      })
    }
    this.setData({ blockData: blockData })
  },

  /*点击板块名称 显示对应板块的列表 */
  onClickListener(e) {
    console.log(e.target.id)
    wx.navigateTo({
      url: '/pages/sub/sub?type=' + blockCNs[e.target.id]
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setBlockData();
  },


})