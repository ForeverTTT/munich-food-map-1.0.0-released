// pages/me/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImageUrl: ''
  },

  /**
   * 返回上一页
   */
  onBack() {
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面加载时执行
    this.loadBgImage();
  },

  // 从云存储加载背景图
  loadBgImage: function() {
    // 直接使用外部URL
    this.setData({
      bgImageUrl: 'https://i.ibb.co/CK88nNPD/munich.png'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面初次渲染完成时执行
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 页面显示时执行
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 页面隐藏时执行
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 页面卸载时执行
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // 用户点击右上角分享时执行
    return {
      title: '关于我们',
      path: '/pages/me/about/about'
    }
  }
})