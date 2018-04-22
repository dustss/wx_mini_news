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