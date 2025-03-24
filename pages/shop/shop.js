// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImageUrl: '',
    shopData: {
      id: '',
      name: '',
      imageUrl: '',
      address: '',
      phone: '',
      price: 0,
      rating: 0,
      hours: '',
      tags: [],
      description: '',
      cuisine: '',
      transport: {
        subway: '',
        bus: ''
      }
    },
    loading: true,
    error: false,
    isFavorite: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.loadShopData(options.id);
      this.loadBgImage();
      this.checkFavoriteStatus(options.id);
    } else {
      this.setData({
        loading: false,
        error: true
      });
    }
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

  saveToHistory: function(shopData) {
    if (!shopData || !shopData.id) {
      console.warn('保存历史记录: 无效的餐厅数据', shopData);
      return;
    }

    console.log('正在保存餐厅到浏览历史:', shopData);
    
    // 获取现有历史记录
    let historyRestaurants = wx.getStorageSync('historyRestaurants') || [];
    
    // 检查餐厅是否已在历史记录中
    const existingIndex = historyRestaurants.findIndex(item => String(item.id) === String(shopData.id));
    
    // 如果已存在，则移除旧的记录
    if (existingIndex !== -1) {
      historyRestaurants.splice(existingIndex, 1);
    }
    
    // 添加新的餐厅记录到列表开头（最新访问的在前面）
    historyRestaurants.unshift({
      id: shopData.id,
      name: shopData.name,
      image: shopData.imageUrl,
      imageID: shopData.imageID || null,
      cloudImageId: shopData.cloudImageId || null,
      address: shopData.address
    });
    
    // 限制历史记录数量为最近8个
    if (historyRestaurants.length > 8) {
      historyRestaurants = historyRestaurants.slice(0, 8);
    }
    
    // 保存更新后的历史记录到本地存储
    wx.setStorageSync('historyRestaurants', historyRestaurants);
    console.log('历史记录已更新，当前数量:', historyRestaurants.length);
  },

  loadShopData: function(shopId) {
    // 设置加载超时处理
    let timeoutId = setTimeout(() => {
      this.setData({
        loading: false,
        error: true
      });
      wx.showToast({
        title: '数据加载超时',
        icon: 'none',
        duration: 2000
      });
    }, 5000); // 5秒超时

    // 获取餐厅详情数据
    const restaurantDetails = {
      '1': {
        phone: '无',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-21:30',
        tags: ['麻辣烫', '中式料理', '经济实惠'],
        description: 'Gululu Mini Hot Pot 提供正宗的麻辣烫，食材新鲜，口味地道。适合朋友聚餐和快速就餐。',
        cuisine: '麻辣烫',
        transport: {
          subway: 'U3线到Olympiazentrum站',
          bus: '144/180路到奥林匹克公园站'
        }
      },
      '2': {
        phone: '+49 89 37454752',
        price: 15,
        rating: 4.5,
        hours: '周六至周日 9:30-20:00',
        tags: ['麻辣烫', '中式料理', '连锁店'],
        description: '张亮麻辣烫是中国知名连锁麻辣烫品牌，提供各种蔬菜、肉类、豆制品等食材，顾客可自由选择，汤底麻辣鲜香。',
        cuisine: '麻辣烫'
      },
      '3': {
        phone: '+49 89 12262573',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-21:00',
        tags: ['川菜', '麻辣', '中餐'],
        description: '你好成都餐厅提供正宗四川风味，麻辣鲜香，菜品丰富多样，包括经典川菜及特色小吃。',
        cuisine: '川菜'
      },
      '4': {
        phone: '+49 160 95881606',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-22:00',
        tags: ['中餐', '家庭聚餐', '经济实惠'],
        description: '唐人街餐厅提供多种中式美食，包括粤菜、川菜等多个地方风味，适合家庭聚餐和朋友聚会。',
        cuisine: '中餐馆'
      },
      '5': {
        phone: '+49 89 28855860',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:30-21:30',
        tags: ['烧烤', '韩式', '聚餐'],
        description: 'Chagiya提供正宗的亚洲风味烧烤，以韩式烧烤为主，顾客可以在餐桌上自己烹饪新鲜食材，体验独特的用餐乐趣。',
        cuisine: '烧烤店'
      },
      '6': {
        phone: '+49 89 12345678',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-22:30',
        tags: ['中餐馆', '家常菜', '聚餐'],
        description: '宴遇中餐馆提供地道的中国家常菜，口味正宗，环境舒适，是朋友聚餐的理想场所。',
        cuisine: '中餐馆'
      },
      '7': {
        phone: '+49 89 23456789',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 12:00-23:00',
        tags: ['火锅', '川菜', '聚餐'],
        description: '古蜀火锅提供正宗的四川火锅体验，汤底麻辣鲜香，食材新鲜丰富，适合亲友聚餐。',
        cuisine: '火锅'
      },
      '8': {
        phone: '+49 89 34567890',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 17:00-23:00',
        tags: ['火锅', '夜宵', '聚餐'],
        description: '零点火锅以其深夜营业时间和丰富的食材选择闻名，提供多种口味的汤底，满足不同食客的需求。',
        cuisine: '火锅'
      },
      '9': {
        phone: '+49 89 45678901',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 12:00-22:00',
        tags: ['面馆', '中式简餐', '经济实惠'],
        description: 'Mian Noodles专注于提供各种风味的中式面条，从兰州拉面到担担面，每一碗都充满了家乡的味道。',
        cuisine: '面馆'
      },
      '10': {
        phone: '+49 89 56789012',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 12:00-22:00',
        tags: ['干锅', '麻辣烫', '川菜'],
        description: '麻辣煮義融合了四川麻辣烫和干锅的精髓，提供独特的川式烹饪体验，麻辣鲜香，回味无穷。',
        cuisine: '干锅麻辣烫'
      },
      '11': {
        phone: '+49 89 67890123',
        price: 45,
        rating: 4.5,
        hours: '周一至周日 17:00-23:00',
        tags: ['火锅', '高档餐厅', '商务宴请'],
        description: 'Chois中国的味道火锅店将传统火锅与现代餐饮完美结合，提供高品质的食材和精致的用餐环境。',
        cuisine: '火锅'
      },
      '12': {
        phone: '+49 89 78901234',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 12:00-22:00',
        tags: ['新疆菜', '民族特色', '烤肉'],
        description: '天山维吾尔餐馆提供正宗的新疆美食，包括手抓饭、烤羊肉串和各种特色面食，让您感受丝绸之路的美食文化。',
        cuisine: '新疆菜'
      },
      '13': {
        phone: '+49 89 89012345',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-22:00',
        tags: ['拉面', '牛肉面', '中式简餐'],
        description: '马克思牛肉拉面以其独特的牛肉汤底和手工拉制的面条闻名，每一碗都散发着浓郁的牛肉香气。',
        cuisine: '拉面'
      },
      '14': {
        phone: '+49 89 90123456',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:30-22:30',
        tags: ['湘菜', '辣味', '特色菜'],
        description: '湘聚餐厅提供地道的湖南美食，以麻辣鲜香的口味著称，特色菜品包括剁椒鱼头、湘味小炒肉等。',
        cuisine: '湘菜'
      },
      '15': {
        phone: '+49 89 01234567',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-21:00',
        tags: ['台湾菜', '家常菜', '简餐'],
        description: 'Song\'s Kitchen提供道地的台湾家常菜，从卤肉饭到珍珠奶茶，带给您浓浓的台湾风味。',
        cuisine: '台湾菜'
      },
      '16': {
        phone: '+49 89 12345670',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-22:00',
        tags: ['面馆', '简餐', '经济实惠'],
        description: '面三郎专注于提供各种风味的亚洲面条，从日式拉面到中式炸酱面，种类丰富，口味正宗。',
        cuisine: '面馆简餐'
      },
      '17': {
        phone: '+49 89 23456701',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-22:00',
        tags: ['面馆', '简餐', '经济实惠'],
        description: '一大碗以其分量十足的面食赢得了众多食客的喜爱，提供多种中式面条和配料选择，满足不同口味的需求。',
        cuisine: '面馆简餐'
      },
      '18': {
        phone: '+49 89 34567012',
        price: 35,
        rating: 4.5,
        hours: '周一至周日 17:00-23:00',
        tags: ['海鲜', '中式料理', '高档餐厅'],
        description: 'Hai Seafood Izakaya提供新鲜的海鲜料理，融合中式和日式烹饪技法，为食客带来独特的美食体验。',
        cuisine: '中式海鲜'
      },
      '19': {
        phone: '+49 89 45670123',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 10:00-22:00',
        tags: ['新疆菜', '面馆', '特色料理'],
        description: 'TAKLAMAKAN餐厅提供正宗的新疆维吾尔美食，招牌菜品包括大盘鸡、手抓饭和拉条子等传统特色菜。',
        cuisine: '新疆菜面馆'
      },
      '20': {
        phone: '+49 89 56701234',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:30-22:00',
        tags: ['冒菜', '川菜', '麻辣'],
        description: '千椒百冒以其独特的冒菜制作工艺闻名，麻辣鲜香的汤底和丰富的配料选择，带来地道的四川味道。',
        cuisine: '冒菜川菜'
      },
      '46': {
        phone: '+49 89 65789012',
        price: 35,
        rating: 4.5,
        hours: '周一至周日 11:00-23:00',
        tags: ['中餐馆', '高档餐厅', '商务宴请'],
        description: '悠游之餐厅融合了中式烹饪和西式用餐体验，提供精致的中式料理和舒适的就餐环境，是商务聚餐和特殊场合的理想选择。',
        cuisine: '中餐馆'
      }
    };

    // 对所有餐厅应用默认详情
    const defaultDetails = {
      phone: '无',
      price: 15,
      rating: 4.5,
      hours: '周一至周日 11:00-22:00',
      tags: ['中餐', '经济实惠'],
      description: '提供正宗的中式美食，口味地道，价格实惠，环境舒适。',
      cuisine: '中餐馆',
      transport: {
        subway: 'U1/U2/U3线到Marienplatz站',
        bus: '100/150路到中心广场站'
      }
    };

    // 尝试从本地存储或全局数据获取餐厅基本信息
    let restaurantData = null;
    try {
      const allRestaurants = wx.getStorageSync('allRestaurants') || getApp().globalData.restaurants || [];
      restaurantData = allRestaurants.find(r => String(r.id) === String(shopId));
    } catch (e) {
      console.error('获取存储的餐厅数据失败', e);
    }

    // 如果从本地缓存或全局数据未找到餐厅，尝试从通道获取
    if (!restaurantData) {
      try {
        // 从首页获取基本信息
        const eventChannel = this.getOpenerEventChannel();
        
        // 检查eventChannel是否存在且具有on方法
        if (eventChannel && typeof eventChannel.on === 'function') {
          console.log('尝试从eventChannel获取餐厅数据');
          eventChannel.on('passShopData', (data) => {
            // 清除超时计时器
            clearTimeout(timeoutId);
            console.log('接收到餐厅数据:', data);
            this.processAndDisplayRestaurantData(data, shopId, restaurantDetails, defaultDetails);
          });
          return; // 等待事件回调
        } else {
          console.warn('eventChannel不存在或没有on方法');
        }
      } catch (e) {
        console.error('获取eventChannel失败', e);
      }
    }

    // 如果有缓存数据或eventChannel失败，直接处理数据
    this.processAndDisplayRestaurantData(restaurantData || {}, shopId, restaurantDetails, defaultDetails);
    clearTimeout(timeoutId);
  },

  // 处理并显示餐厅数据
  processAndDisplayRestaurantData: function(data, shopId, restaurantDetails, defaultDetails) {
    // 获取已有详情或使用默认详情
    const details = restaurantDetails[shopId] || defaultDetails;
    
    // 为缺少交通信息的餐厅生成随机交通指南
    if (!details.transport) {
      const subway = ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8'];
      const subwayStations = ['Marienplatz', 'Hauptbahnhof', 'Sendlinger Tor', 'Münchner Freiheit', 'Odeonsplatz'];
      const bus = ['100', '150', '52', '68', '132', '190', '57', '44'];
      const busStations = ['中心广场站', '主火车站', '市政厅站', '大学区站', '购物中心站'];
      
      details.transport = {
        subway: `${subway[Math.floor(Math.random() * subway.length)]}线到${subwayStations[Math.floor(Math.random() * subwayStations.length)]}站`,
        bus: `${bus[Math.floor(Math.random() * bus.length)]}/${parseInt(bus[Math.floor(Math.random() * bus.length)]) + 10}路到${busStations[Math.floor(Math.random() * busStations.length)]}`
      };
    }
    
    // 组合完整的餐厅数据
    const shopData = {
      id: shopId,
      name: data.name || '未知餐厅',
      imageUrl: data.image || data.imageUrl || '/images/logo.png',
      imageID: data.imageID || null,
      cloudImageId: data.cloudImageId || null,
      address: data.address || '地址未知',
      phone: details.phone || '无',
      price: details.price || 15,
      rating: details.rating || 4.5,
      hours: details.hours || '周一至周日 11:00-22:00',
      tags: details.tags || ['中餐', '经济实惠'],
      description: details.description || '提供正宗的中式美食，口味地道，价格实惠，环境舒适。',
      cuisine: details.cuisine || '中餐馆',
      transport: details.transport || {
        subway: 'U1线到Marienplatz站',
        bus: '100/150路到中心广场站'
      }
    };
    
    // 加载餐厅图片
    this.loadShopImage(shopData);
    
    // 更新页面数据
    this.setData({
      shopData: shopData,
      loading: false,
      error: false
    }, () => {
      // 保存到浏览历史
      this.saveToHistory(shopData);
      
      // 记录加载完成的数据
      console.log('餐厅数据加载完成:', shopData);
    });
  },

  // 加载餐厅图片
  loadShopImage: function(shopData) {
    if (!shopData) return;

    // 先设置默认图片，确保界面有内容显示
    if (!shopData.imageUrl || shopData.imageUrl.indexOf('cloud://') !== -1) {
      shopData.imageUrl = '/images/logo.png';
      this.setData({
        'shopData.imageUrl': shopData.imageUrl
      });
    }

    // 尝试从多个来源加载图片
    let imageIds = [];
    
    // 添加原有的图片ID
    if (shopData.cloudImageId) {
      imageIds.push(shopData.cloudImageId);
    }
    
    if (shopData.imageID) {
      imageIds.push(shopData.imageID);
    }
    
    // 根据餐厅ID和名称构建可能的图片路径
    const shopId = shopData.id;
    const firstLetter = shopData.name ? shopData.name.charAt(0).toLowerCase() : '';
    
    // 特殊餐厅图片路径处理
    let specialImagePath = null;
    if (shopData.name === 'Baoz! Bar') {
      specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/bzb.png';
    } else if (shopData.name === 'BANG') {
      specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/bang.png';
    } else if (shopData.name.includes('丝路风味')) {
      specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/slfw.png';
    } else if (shopData.name.includes('悦满楼')) {
      specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/yml.png';
    } else if (shopData.name.includes('匠心')) {
      specialImagePath = 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/jx.png';
    }
    
    if (specialImagePath) {
      imageIds.push(specialImagePath);
    }
    
    // 如果没有图片ID，直接返回
    if (imageIds.length === 0) {
      return;
    }
    
    // 获取图片临时URL
    wx.cloud.getTempFileURL({
      fileList: imageIds,
      success: res => {
        if (res.fileList && res.fileList.length > 0) {
          // 找到第一个成功的临时URL
          for (let i = 0; i < res.fileList.length; i++) {
            if (res.fileList[i].tempFileURL) {
              shopData.imageUrl = res.fileList[i].tempFileURL;
              this.setData({
                'shopData.imageUrl': shopData.imageUrl
              });
              console.log('成功加载餐厅图片:', shopData.imageUrl);
              break;
            }
          }
        }
      },
      fail: err => {
        console.error('获取餐厅云存储图片失败:', err);
      }
    });
  },

  checkFavoriteStatus: function(shopId) {
    console.log('检查收藏状态 shopId:', shopId, typeof shopId);
    const favorites = wx.getStorageSync('favoriteRestaurants') || [];
    console.log('当前收藏列表:', favorites);
    
    // 确保使用==比较，因为可能有字符串和数字类型的ID
    const isFavorite = favorites.some(item => String(item.id) === String(shopId));
    console.log('是否已收藏:', isFavorite);
    
    this.setData({
      isFavorite: isFavorite
    });
  },

  toggleFavorite: function() {
    const shopId = this.data.shopData.id;
    console.log('切换收藏状态 shopId:', shopId, typeof shopId);
    
    let favorites = wx.getStorageSync('favoriteRestaurants') || [];
    console.log('收藏前列表:', favorites);
    
    // 确保使用字符串比较
    const isFavorited = favorites.some(item => String(item.id) === String(shopId));
    
    if (isFavorited) {
      favorites = favorites.filter(item => String(item.id) !== String(shopId));
    } else {
      favorites.unshift({
        id: shopId,
        name: this.data.shopData.name,
        image: this.data.shopData.imageUrl,
        address: this.data.shopData.address
      });
    }
    
    console.log('收藏后列表:', favorites);
    wx.setStorageSync('favoriteRestaurants', favorites);
    
    this.setData({
      isFavorite: !isFavorited
    });
    
    // 更新全局数据以便同步到index页面
    const pages = getCurrentPages();
    const indexPage = pages.find(page => page.route === 'pages/index/index');
    if (indexPage) {
      console.log('找到index页面，更新数据');
      const restaurants = indexPage.data.restaurants;
      // 确保使用字符串比较
      const restaurantIndex = restaurants.findIndex(r => String(r.id) === String(shopId));
      if (restaurantIndex !== -1) {
        // 更新收藏状态
        restaurants[restaurantIndex].favorite = !isFavorited;
        indexPage.setData({
          restaurants: restaurants
        });
        // 重新应用过滤器以更新显示
        indexPage.applyFilters();
        console.log('index页面数据已更新');
      } else {
        console.log('未找到对应餐厅, shopId:', shopId);
      }
    } else {
      console.log('未找到index页面');
    }
    
    // 即使index页面不在页面栈中，也确保下次打开时能正确显示
    // index页面会在onShow方法中调用loadFavoriteStatus方法
    
    wx.showToast({
      title: isFavorited ? '已取消收藏' : '已添加收藏',
      icon: 'success',
      duration: 1500
    });
  },

  callShop: function() {
    if (this.data.shopData.phone && this.data.shopData.phone !== '无') {
      wx.makePhoneCall({
        phoneNumber: this.data.shopData.phone,
        fail: function() {
          wx.showToast({
            title: '拨号失败',
            icon: 'none'
          });
        }
      });
    } else {
      wx.showToast({
        title: '该餐厅暂无电话',
        icon: 'none'
      });
    }
  },

  openGoogleMaps: function() {
    const address = this.data.shopData.address;
    if (!address) {
      wx.showToast({
        title: '地址信息不存在',
        icon: 'none'
      });
      return;
    }

    // 编码地址为URL安全格式
    const encodedAddress = encodeURIComponent(address);
    
    // 创建谷歌地图URL
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    // 使用微信内置浏览器打开URL
    wx.showModal({
      title: '打开地图',
      content: '是否使用谷歌地图查看位置？',
      success: function(res) {
        if (res.confirm) {
          wx.showToast({
            title: '正在打开地图...',
            icon: 'loading',
            duration: 1000
          });
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/webview/webview?url=${encodeURIComponent(mapUrl)}`,
              fail: function() {
                // 如果没有webview页面，则直接使用系统浏览器打开
                wx.setClipboardData({
                  data: mapUrl,
                  success: function() {
                    wx.showModal({
                      title: '链接已复制',
                      content: '地图链接已复制到剪贴板，请手动粘贴到浏览器中打开',
                      showCancel: false
                    });
                  }
                });
              }
            });
          }, 1000);
        }
      }
    });
  },

  navigateBack: function() {
    wx.navigateBack();
  },

  navigateTo: function(e) {
    const page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: `/pages/${page}/${page}`
    });
  },

  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    wx.switchTab({
      url: `/pages/${tab}/${tab}`
    });
  },

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
        // 失败时使用本地图片作为备选
        this.setData({
          bgImageUrl: '/images/bgimage.png'
        });
      }
    });
  },

  onImageError: function(e) {
    console.error('餐厅图片加载失败，使用默认图片');
    this.setData({
      'shopData.imageUrl': '/images/logo.png'
    });
  }
})