// pages/me/favourate/favourate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favoriteRestaurants: [],
    bgImageUrl: '', // 添加背景图URL变量
    isLoading: true // 添加加载状态变量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadBgImage(); // 加载背景图
    this.updateFavoriteImagePaths();
    this.loadFavoriteRestaurants();
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
    this.loadBgImage(); // 每次显示页面时也加载背景图
    this.updateFavoriteImagePaths();
    this.loadFavoriteRestaurants();
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

  updateFavoriteImagePaths: function() {
    // 由于我们已经在restaurants页面设置了正确的图片，这里不需要再修改
    // 但需要检查收藏数据中的图片路径是否完整
    const favorites = wx.getStorageSync('favoriteRestaurants') || [];
    
    let needUpdate = false;
    const updatedFavorites = favorites.map(item => {
      // 确保image字段存在且有效
      if (!item.image) {
        needUpdate = true;
        // 如果没有image字段，使用默认图片
        item.image = '/images/logo.png'; 
      }
      return item;
    });
    
    if (needUpdate) {
      // 更新存储的收藏数据
      wx.setStorageSync('favoriteRestaurants', updatedFavorites);
      console.log('已修复收藏数据中缺失的图片路径');
    }
  },

  loadFavoriteRestaurants: function() {
    this.setData({ isLoading: true });
    
    // 模拟网络请求延迟
    setTimeout(() => {
      const favorites = wx.getStorageSync('favoriteRestaurants') || [];
      this.setData({
        favoriteRestaurants: favorites,
        isLoading: false
      });
    }, 500);
  },

  toggleFavorite: function(e) {
    const restaurantId = e.currentTarget.dataset.id;
    console.log('正在取消收藏餐厅，ID:', restaurantId);
    
    let favorites = wx.getStorageSync('favoriteRestaurants') || [];
    console.log('当前收藏餐厅列表:', favorites);
    
    // 从收藏列表中移除，确保使用字符串比较以解决ID类型不匹配问题
    favorites = favorites.filter(item => String(item.id) !== String(restaurantId));
    wx.setStorageSync('favoriteRestaurants', favorites);
    
    this.setData({
      favoriteRestaurants: favorites
    });
    
    // 更新全局数据以便同步到index页面
    const pages = getCurrentPages();
    const indexPage = pages.find(page => page.route === 'pages/index/index');
    if (indexPage) {
      const restaurants = indexPage.data.restaurants;
      // 确保使用字符串比较
      const restaurantIndex = restaurants.findIndex(r => String(r.id) === String(restaurantId));
      if (restaurantIndex !== -1) {
        // 更新收藏状态
        restaurants[restaurantIndex].favorite = false;
        indexPage.setData({
          restaurants: restaurants
        });
      }
    }
    
    wx.showToast({
      title: '已取消收藏',
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
    const restaurant = this.data.favoriteRestaurants.find(item => String(item.id) === String(shopId));
    
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
        
        // 确保image字段正确传递给imageUrl字段
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
    wx.navigateBack()
  },

  // 从云存储加载背景图
  loadBgImage: function() {
    wx.cloud.getTempFileURL({
      fileList: ['cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/munich.png'],
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