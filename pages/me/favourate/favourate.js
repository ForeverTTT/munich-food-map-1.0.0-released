// pages/me/favourate/favourate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favoriteRestaurants: [],
    bgImageUrl: '', // 直接使用本地背景图
    isLoading: true // 添加加载状态变量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadBgImage();
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
      if (!item.image || item.image === '/images/restaurant.png') {
        needUpdate = true;
        // 使用正确的默认图片路径
        item.image = '/images/logo.png'; 
      }
      return item;
    });
    
    if (needUpdate) {
      // 更新存储的收藏数据
      wx.setStorageSync('favoriteRestaurants', updatedFavorites);
      console.log('已修复收藏数据中的图片路径');
    }
  },

  loadFavoriteRestaurants: function() {
    this.setData({ isLoading: true });
    
    // 模拟网络请求延迟
    setTimeout(() => {
      const favorites = wx.getStorageSync('favoriteRestaurants') || [];
      
      // 预先设置默认图片，确保UI不会显示损坏的图片
      const preparedFavorites = favorites.map(restaurant => {
        if (!restaurant.image || restaurant.image.includes('cloud://')) {
          return {
            ...restaurant,
            image: '/images/logo.png'
          };
        }
        return restaurant;
      });
      
      this.setData({
        favoriteRestaurants: preparedFavorites,
        isLoading: false
      });
      
      // 加载餐厅图片
      this.loadCloudRestaurantImages();
    }, 500);
  },

  // 从云存储加载餐厅图片
  loadCloudRestaurantImages: function() {
    const favorites = this.data.favoriteRestaurants;
    if (!favorites || favorites.length === 0) return;
    
    // 收集所有需要从云端加载的图片ID
    const cloudIds = [];
    const restaurantIndices = {};  // 用于记录每个ID对应的餐厅索引
    
    favorites.forEach((restaurant, index) => {
      // 尝试多种可能的图片ID来源
      if (restaurant.cloudImageId) {
        cloudIds.push(restaurant.cloudImageId);
        restaurantIndices[restaurant.cloudImageId] = index;
      }
      
      if (restaurant.imageID) {
        cloudIds.push(restaurant.imageID);
        restaurantIndices[restaurant.imageID] = index;
      }
      
      // 基于餐厅名称生成特殊图片路径
      let specialImagePath = null;
      if (restaurant.name === 'Baoz! Bar') {
        specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/bzb.png';
      } else if (restaurant.name === 'BANG') {
        specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/bang.png';
      } else if (restaurant.name && restaurant.name.includes('丝路风味')) {
        specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/slfw.png';
      } else if (restaurant.name && restaurant.name.includes('悦满楼')) {
        specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/yml.png';
      } else if (restaurant.name && restaurant.name.includes('匠心')) {
        specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/jx.png';
      } else if (restaurant.name && restaurant.name.includes('小梅')) {
        specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/xm.png';
      }
      
      if (specialImagePath) {
        cloudIds.push(specialImagePath);
        restaurantIndices[specialImagePath] = index;
      }
      
      // 添加基于ID的备选路径
      if (restaurant.id) {
        const idBasedPath = `cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/${restaurant.id}.jpg`;
        cloudIds.push(idBasedPath);
        restaurantIndices[idBasedPath] = index;
      }
    });
    
    // 如果没有云存储ID，直接返回
    if (cloudIds.length === 0) {
      return;
    }
    
    // 将图片ID分批处理，每批最多20个，减小并发数提高成功率
    const batchSize = 20;
    const batches = [];
    
    for (let i = 0; i < cloudIds.length; i += batchSize) {
      batches.push(cloudIds.slice(i, i + batchSize));
    }
    
    // 处理结果记录
    const successfulUrls = {};
    let completedBatches = 0;
    
    // 处理每一批
    batches.forEach((batchIds, batchIndex) => {
      wx.cloud.getTempFileURL({
        fileList: batchIds,
        success: res => {
          if (res.fileList && res.fileList.length > 0) {
            res.fileList.forEach(file => {
              if (file.fileID && file.tempFileURL) {
                // 记录成功获取的URL
                const index = restaurantIndices[file.fileID];
                if (index !== undefined) {
                  successfulUrls[index] = file.tempFileURL;
                }
              }
            });
          }
        },
        fail: err => {
          console.error(`获取第${batchIndex+1}批次餐厅图片失败:`, err);
        },
        complete: () => {
          completedBatches++;
          
          // 当所有批次处理完成时，更新餐厅图片
          if (completedBatches === batches.length) {
            // 更新所有成功获取到URL的餐厅图片
            for (const index in successfulUrls) {
              const key = `favoriteRestaurants[${index}].image`;
              this.setData({
                [key]: successfulUrls[index]
              });
              
              // 同时更新本地存储
              const favorites = wx.getStorageSync('favoriteRestaurants') || [];
              if (favorites[index]) {
                favorites[index].image = successfulUrls[index];
              }
            }
            
            // 保存更新后的收藏列表
            wx.setStorageSync('favoriteRestaurants', favorites);
          }
        }
      });
    });
  },
  
  // 处理图片加载失败
  onImageError: function(e) {
    try {
      const index = e.currentTarget.dataset.index;
      console.error('餐厅图片加载失败，使用默认图片，索引:', index);
      
      if (index === undefined || index === null) {
        console.error('图片错误处理失败：未找到索引');
        return;
      }
      
      // 确保使用正确的默认图片路径
      const defaultImage = '/images/logo.png';
      
      // 更新UI显示
      const key = `favoriteRestaurants[${index}].image`;
      this.setData({
        [key]: defaultImage
      });
      
      // 更新本地存储
      const favorites = wx.getStorageSync('favoriteRestaurants') || [];
      if (favorites[index]) {
        favorites[index].image = defaultImage;
        wx.setStorageSync('favoriteRestaurants', favorites);
      }
    } catch (error) {
      console.error('处理图片错误失败:', error);
    }
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
        
        // 传递餐厅数据，包括ID以便目标页面可以直接从云加载图片
        res.eventChannel.emit('passShopData', {
          id: restaurant.id,
          name: restaurant.name || '',
          imageUrl: restaurant.image || '', // 使用从云加载的图片
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
      fileList: ['cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42/images/bgimage.png'],
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
          fileList: ['cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42/images/bgimage.png'],
          success: res => {
            if (res.fileList && res.fileList.length > 0) {
              this.setData({
                bgImageUrl: res.fileList[0].tempFileURL
              });
            }
          },
          fail: error => {
            console.error('获取背景图片第二次尝试也失败', error);
            // 使用本地图片作为最后的备选
            this.setData({
              bgImageUrl: '/images/bgimage.png'
            });
          }
        });
      }
    });
  }
})