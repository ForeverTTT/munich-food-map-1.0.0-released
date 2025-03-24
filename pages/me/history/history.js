// pages/me/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyRestaurants: [],
    bgImageUrl: '/images/munich.png',
    isLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadBgImage();
    this.updateHistoryImagePaths();
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
    this.updateHistoryImagePaths();
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

  updateHistoryImagePaths: function() {
    // 检查浏览历史数据中的图片路径是否完整
    const history = wx.getStorageSync('historyRestaurants') || [];
    
    let needUpdate = false;
    const updatedHistory = history.map(item => {
      // 确保image字段存在且有效
      if (!item.image || item.image === '/images/restaurant.png') {
        needUpdate = true;
        // 使用正确的默认图片路径
        item.image = '/images/logo.png'; 
      }
      return item;
    });
    
    if (needUpdate) {
      // 更新存储的浏览历史数据
      wx.setStorageSync('historyRestaurants', updatedHistory);
      console.log('已修复浏览历史数据中的图片路径');
    }
  },

  loadHistoryRestaurants: function() {
    this.setData({ isLoading: true });
    
    // 模拟网络请求延迟
    setTimeout(() => {
      // 获取浏览历史记录
      const history = wx.getStorageSync('historyRestaurants') || [];
      console.log('加载的历史记录:', history);
      
      // 预先设置默认图片，确保UI不会显示损坏的图片
      const preparedHistory = history.map(restaurant => {
        if (!restaurant.image || restaurant.image.includes('cloud://')) {
          return {
            ...restaurant,
            image: '/images/logo.png'
          };
        }
        return restaurant;
      });
      
      this.setData({
        historyRestaurants: preparedHistory,
        isLoading: false
      });
      
      // 加载餐厅图片
      this.loadCloudRestaurantImages();
    }, 500);
  },
  
  // 从云存储加载餐厅图片
  loadCloudRestaurantImages: function() {
    const history = this.data.historyRestaurants;
    if (!history || history.length === 0) return;
    
    // 收集所有需要从云端加载的图片ID
    const cloudIds = [];
    const restaurantIndices = {};  // 用于记录每个ID对应的餐厅索引
    
    history.forEach((restaurant, index) => {
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
          console.error(`获取第${batchIndex+1}批次历史餐厅图片失败:`, err);
        },
        complete: () => {
          completedBatches++;
          
          // 当所有批次处理完成时，更新餐厅图片
          if (completedBatches === batches.length) {
            // 更新所有成功获取到URL的餐厅图片
            for (const index in successfulUrls) {
              const key = `historyRestaurants[${index}].image`;
              this.setData({
                [key]: successfulUrls[index]
              });
              
              // 同时更新本地存储
              const history = wx.getStorageSync('historyRestaurants') || [];
              if (history[index]) {
                history[index].image = successfulUrls[index];
                wx.setStorageSync('historyRestaurants', history);
              }
            }
          }
        }
      });
    });
  },
  
  // 处理图片加载失败
  onImageError: function(e) {
    try {
      const index = e.currentTarget.dataset.index;
      console.error('历史餐厅图片加载失败，使用默认图片，索引:', index);
      
      if (index === undefined || index === null) {
        console.error('图片错误处理失败：未找到索引');
        return;
      }
      
      // 确保使用正确的默认图片路径
      const defaultImage = '/images/logo.png';
      
      // 更新UI显示
      const key = `historyRestaurants[${index}].image`;
      this.setData({
        [key]: defaultImage
      });
      
      // 更新本地存储
      const history = wx.getStorageSync('historyRestaurants') || [];
      if (history[index]) {
        history[index].image = defaultImage;
        wx.setStorageSync('historyRestaurants', history);
      }
    } catch (error) {
      console.error('处理图片错误失败:', error);
    }
  },

  removeFromHistory: function(e) {
    const restaurantId = e.currentTarget.dataset.id;
    console.log('正在从历史记录中移除餐厅，ID:', restaurantId);
    
    wx.showModal({
      title: '确认移除',
      content: '确定要从浏览历史中移除此餐厅吗？',
      success: (res) => {
        if (res.confirm) {
          let history = wx.getStorageSync('historyRestaurants') || [];
          // 从本地存储中移除
          history = history.filter(item => String(item.id) !== String(restaurantId));
          wx.setStorageSync('historyRestaurants', history);
          
          // 更新UI
          this.setData({
            historyRestaurants: history
          });
          
          wx.showToast({
            title: '已删除',
            icon: 'success',
            duration: 1500
          });
        }
      }
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
            // 使用本地图片作为最后的备选
            this.setData({
              bgImageUrl: '/images/munich.png'
            });
          }
        });
      }
    });
  }
})