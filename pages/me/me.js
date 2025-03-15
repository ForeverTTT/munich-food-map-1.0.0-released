// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatar: '/images/logo.png',
      username: '用户名',
      userId: '12345678',
      visitCount: 8
    },
    bgImageUrl: '' // 初始为空，将通过云存储获取
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 页面加载时获取用户信息
    this.getUserInfo();
    // 获取背景图
    this.loadBgImage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 每次页面显示时更新访问次数
    this.updateVisitCount();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

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
  onShareAppMessage() {

  },

  // 从云存储获取背景图 - 使用与restaurants界面相同的方法
  loadBgImage: function() {
    wx.cloud.getTempFileURL({
      fileList: ['cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/bgimage.png'],
      success: res => {
        if (res.fileList && res.fileList.length > 0) {
          this.setData({
            bgImageUrl: res.fileList[0].tempFileURL
          });
        }
      },
      fail: err => {
        console.error('获取背景图片失败', err);
      }
    });
  },

  getUserInfo() {
    // 从本地存储获取用户信息，如果存在的话
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({
          userInfo
        });
      }
    } catch (e) {
      console.error('获取用户信息失败', e);
    }
  },

  updateVisitCount() {
    // 增加访问次数并保存
    const userInfo = this.data.userInfo;
    userInfo.visitCount = (userInfo.visitCount || 0) + 1;
    
    this.setData({
      userInfo
    });
    
    try {
      wx.setStorageSync('userInfo', userInfo);
    } catch (e) {
      console.error('保存用户信息失败', e);
    }
  },

  onNavigateToFavorites() {
    wx.navigateTo({
      url: '/pages/favorite/favorite'
    });
  },

  onNavigateToHistory() {
    wx.showToast({
      title: '浏览历史功能开发中',
      icon: 'none',
      duration: 2000
    });
  },

  onNavigateToSettings() {
    wx.showToast({
      title: '设置功能开发中',
      icon: 'none',
      duration: 2000
    });
  },

  onNavigateToAbout() {
    wx.navigateTo({
      url: '/pages/me/about/about'
    });
  }
})