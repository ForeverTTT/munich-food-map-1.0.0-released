// pages/me/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyRestaurants: [],
    bgImageUrl: '',
    isLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadBgImage();
    this.loadHistoryRestaurants();
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
    this.loadBgImage();
    this.loadHistoryRestaurants();
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

  loadHistoryRestaurants: function() {
    this.setData({ isLoading: true });
    
    // 模拟网络请求延迟
    setTimeout(() => {
      // 获取浏览历史记录
      const history = wx.getStorageSync('historyRestaurants') || [];
      console.log('加载的历史记录:', history);
      
      // 再次确保最新的记录在最上方显示
      // 按时间降序排序 (假设最近的记录在数组前面)
      this.setData({
        historyRestaurants: history,
        isLoading: false
      });
    }, 500);
  },

  removeFromHistory: function(e) {
    const restaurantId = e.currentTarget.dataset.id;
    console.log('正在从历史记录中移除餐厅，ID:', restaurantId);
    
    let history = wx.getStorageSync('historyRestaurants') || [];
    console.log('当前历史记录列表:', history);
    
    // 从历史记录中移除，确保使用字符串比较以解决ID类型不匹配问题
    history = history.filter(item => String(item.id) !== String(restaurantId));
    wx.setStorageSync('historyRestaurants', history);
    
    this.setData({
      historyRestaurants: history
    });
    
    wx.showToast({
      title: '已从历史记录移除',
      icon: 'success',
      duration: 1500
    });
  },

  navigateToShop: function(e) {
    const shopId = e.currentTarget.dataset.id;
    
    // 显示导航中提示
    wx.showLoading({
      title: '正在跳转...',
      mask: true
    });
    
    // 获取当前点击的餐厅数据
    const restaurant = this.data.historyRestaurants.find(item => String(item.id) === String(shopId));
    
    if (!restaurant) {
      wx.hideLoading();
      wx.showToast({
        title: '获取餐厅信息失败',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    console.log('跳转到餐厅详情，数据:', restaurant);

    // 使用事件通道传递完整的餐厅数据
    wx.navigateTo({
      url: `/pages/shop/shop?id=${shopId}`,
      events: {
        // 接收被打开页面返回的数据
        acceptDataFromOpenedPage: function(data) {
          console.log('接收到返回数据:', data);
        }
      },
      success: function(res) {
        // 隐藏加载提示
        wx.hideLoading();
        
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('passShopData', {
          name: restaurant.name || '',
          imageUrl: restaurant.image || '', // 确保图片URL正确传递
          address: restaurant.address || ''
        });
      },
      fail: function(err) {
        // 隐藏加载提示
        wx.hideLoading();
        console.error('页面跳转失败:', err);
        wx.showToast({
          title: '餐厅详情页加载失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  onBack: function() {
    wx.navigateBack();
  },

  onIconError: function(e) {
    console.error('返回图标加载失败');
    // 不做特殊处理，因为我们已经添加了文本作为备用
  },

  // 处理餐厅图片加载错误
  onImageError: function(e) {
    const index = e.currentTarget.dataset.index;
    console.log('餐厅图片加载失败，使用默认图片', e);
    
    // 为避免修改原始数据导致云端同步问题，这里只在UI层面替换图片
    let key = `historyRestaurants[${index}].image`;
    this.setData({
      [key]: '/images/restaurant.png'
    });
  },

  // 从云存储加载背景图
  loadBgImage: function() {
    wx.cloud.getTempFileURL({
      fileList: ['cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42/images/munich.png'],
      success: res => {
        if (res.fileList && res.fileList.length > 0) {
          this.setData({
            bgImageUrl: res.fileList[0].tempFileURL
          });
        }
      },
      fail: err => {
        console.error('获取背景图片失败', err);
        // 失败时尝试使用另一个可能的文件ID
        wx.cloud.getTempFileURL({
          fileList: ['cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42/images/munich.png'],
          success: res => {
            if (res.fileList && res.fileList.length > 0) {
              this.setData({
                bgImageUrl: res.fileList[0].tempFileURL
              });
            }
          },
          fail: error => {
            console.error('获取背景图片第二次尝试也失败', error);
          }
        });
      }
    });
  }
})