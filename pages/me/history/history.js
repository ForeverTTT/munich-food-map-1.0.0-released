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
    
    // 使用外部URL图片映射
    const imageUrls = {
      'bzb': "https://i.ibb.co/4hh6mc3/bzb.png",     // 北自拍
      'bang': "https://i.ibb.co/6RNXmkhy/bang.png",  // 帮锅
      'xm': "https://i.ibb.co/dwPxbX3F/xm.png",      // 小马
      'slfw': "https://i.ibb.co/0jKW38Gr/slfw.png",  // 私藏料理
      'mk': "https://i.ibb.co/QjCG2x4n/mk.png",      // 马克思牛肉面
      'lj': "https://i.ibb.co/XfFftpS3/lj.png",      // 菱角湖高级料理
      'jzb': "https://i.ibb.co/hFsF5V4W/jzb.png",    // 匠之本铁板烧
      'jx': "https://i.ibb.co/7thj4232/jx.png",      // 江西菜馆
      'cl': "https://i.ibb.co/d4nkR9vq/cl.png",      // 草榴
      'yml': "https://i.ibb.co/ymgt7g3j/yml.png",    // 悦满楼
      'ygf': "https://i.ibb.co/7JmmgtmZ/ygf.png",    // 杨国福麻辣烫
      'xiangj': "https://i.ibb.co/zVDjdWTj/xiangj.png", // 湘聚
      'wai': "https://i.ibb.co/SDpZwW8k/wai.png",    // Wais Küche
      'sen': "https://i.ibb.co/x8tYbnrh/sen.png",    // SEEN RESTAURANT
      'zl': "https://i.ibb.co/9mnqWtNn/zl.png",      // 张亮麻辣烫
      'yyz': "https://i.ibb.co/pjvMvrTS/yyz.png",    // 悠游之
      'ydw': "https://i.ibb.co/ch9b1BzT/ydw.png",    // 一大碗
      'yanyu': "https://i.ibb.co/4gWccmLR/yanyu.png", // 宴遇中餐馆
      'xysg': "https://i.ibb.co/VcmYydfX/xysg.png",  // 小魚砂鍋
      'xxx': "https://i.ibb.co/HDSqT293/xxx.png",    // 湘香轩
      'xml': "https://i.ibb.co/5XxwDyMY/xml.png",    // 小马龙
      'xj': "https://i.ibb.co/S4dLfjwv/xj.png",      // 湘聚/湘菜
      'unclechen': "https://i.ibb.co/TDGr8ybq/unclechen.png", // Chen's
      'ts': "https://i.ibb.co/6cNX7fTT/ts.png",      // 天山维吾尔餐馆
      'trj': "https://i.ibb.co/xKxZ45JP/trj.png",    // 唐人街
      'tklmg': "https://i.ibb.co/Q0Tz85c/tklmg.png", // TAKLAMAKAN
      'sxc2': "https://i.ibb.co/Q7dHsb9W/sxc2.png",  // 送小厨
      'sxc': "https://i.ibb.co/pvbZ1vvV/sxc.png",    // Song's Kitchen
      'qy': "https://i.ibb.co/tMFw201h/qy.png",      // 柒叶
      'qjbm': "https://i.ibb.co/93m37sZd/qjbm.png",  // 千椒百冒
      'qc': "https://i.ibb.co/39Hj7QSV/qc.png",      // Qin Cheng
      'nhhh': "https://i.ibb.co/GvzZS7YT/nhhh.png",  // 你好成都/你好和合
      'mmb2': "https://i.ibb.co/gLxXgrj3/mmb2.png",  // Mamma Bao
      'mmb1': "https://i.ibb.co/fGxzXx96/mmb1.png",  // Mamma Bao - Adalbertstraße
      'mm': "https://i.ibb.co/KpmwJjCB/mm.png",      // 其他餐厅
      'mlzy': "https://i.ibb.co/nSvwRmc/mlzy.png",   // 麻辣煮義
      'mian': "https://i.ibb.co/HfTZz05y/mian.png",  // Mian Noodles
      'max': "https://i.ibb.co/29SJ0Fy/max.png",     // 马克思牛肉拉面
      'm4l': "https://i.ibb.co/YTVjvcBw/m4l.png",    // 面四郎
      'm3l': "https://i.ibb.co/0p2h6XLR/m3l.png",    // 面三郎
      'm2l': "https://i.ibb.co/bRGFgvXF/m2l.png",    // 面次郎
      'm1l': "https://i.ibb.co/tMfLxFYQ/m1l.png",    // 面太郎
      'lxg': "https://i.ibb.co/RTwYt8F7/lxg.png",    // 老香港
      'luis': "https://i.ibb.co/kgZWyqG4/luis.png",  // Lui's Cake
      'ldhg': "https://i.ibb.co/jCKHphC/ldhg.png",   // 零点火锅
      'ld2': "https://i.ibb.co/Ps3VBr88/ld2.png",    // LeDu - Happy Dumplings
      'ld': "https://i.ibb.co/dS9NmnP/ld.png",       // LeDu Happy Dumplings
      'lc': "https://i.ibb.co/8gP46k51/lc.png",      // 乐茶
      'ks': "https://i.ibb.co/cKgPVTRx/ks.png",      // Kashgar
      'kim': "https://i.ibb.co/KTrKjCM/kim.png",     // 老金韩国料理
      'hai': "https://i.ibb.co/DgrwdjR1/hai.png",    // Hai Seafood Izakaya
      'gshg': "https://i.ibb.co/MkZFMS1m/gshg.png",  // 古蜀火锅
      'gll': "https://i.ibb.co/xqr1tvHc/gll.png",    // 麻辣烫 Gululu
      'fy': "https://i.ibb.co/wF8cXZZY/fy.png",      // 福源酒家
      'fan': "https://i.ibb.co/35PS2qH7/fan.png",    // FAN范
      'ds': "https://i.ibb.co/4RghLqRZ/ds.png",      // 鼎尚中餐
      'cy': "https://i.ibb.co/pvYvvngv/cy.png",      // 茶艺
      'cww': "https://i.ibb.co/tPZN1MM2/cww.png",    // 川味王小面馆
      'cl2': "https://i.ibb.co/d0T6vksw/cl.png",     // 川流
      'chois': "https://i.ibb.co/4vSd4h1/chois.png", // Chois中国的味道火锅店
      'chiachia': "https://i.ibb.co/bjVBWjfL/chiachia.png", // ChiaChia's Cafe
      'chagiya': "https://i.ibb.co/8DK09G6D/chagiya.png",   // Chagiya
      'chen': "https://i.ibb.co/7tmycGZx/chen.png"    // Chen's Nudelbar
    };
    
    // 创建ID到图片URL的映射
    const idToImage = {
      1: imageUrls.gll,       // 麻辣烫 Gululu
      2: imageUrls.zl,        // 张亮麻辣烫
      3: imageUrls.nhhh,      // 你好 成都
      4: imageUrls.trj,       // 唐人街
      5: imageUrls.chagiya,   // Chagiya Asia Tischgrill
      6: imageUrls.yanyu,     // 宴遇中餐馆
      7: imageUrls.gshg,      // 古蜀火锅
      8: imageUrls.ldhg,      // 零点火锅
      9: imageUrls.mian,      // Mian Noodles
      10: imageUrls.mlzy,     // 麻辣煮義
      11: imageUrls.chois,    // Chois中国的味道火锅店
      12: imageUrls.ts,       // 天山维吾尔餐馆
      13: imageUrls.max,      // 马克思牛肉拉面
      14: imageUrls.xiangj,   // 湘聚
      15: imageUrls.sxc,      // Song's Kitchen
      16: imageUrls.m3l,      // 面三郎
      17: imageUrls.ydw,      // 一大碗
      18: imageUrls.hai       // Hai Seafood Izakaya
    };
    
    // 更新每个餐厅的图片URL
    const updatedHistory = [...history];
    
    updatedHistory.forEach((restaurant, index) => {
      let imageSet = false;
      
      // 1. 通过ID直接匹配
      if (restaurant.id && idToImage[restaurant.id]) {
        updatedHistory[index].image = idToImage[restaurant.id];
        imageSet = true;
      }
      
      // 2. 通过餐厅名称匹配
      if (!imageSet) {
        if (restaurant.name === 'Baoz! Bar' || restaurant.name.includes('北自拍')) {
          updatedHistory[index].image = imageUrls.bzb;
          imageSet = true;
        } else if (restaurant.name === 'BANG' || restaurant.name.includes('帮锅')) {
          updatedHistory[index].image = imageUrls.bang;
          imageSet = true;
        } else if (restaurant.name && restaurant.name.includes('丝路风味')) {
          updatedHistory[index].image = imageUrls.slfw;
          imageSet = true;
        } else if (restaurant.name && restaurant.name.includes('悦满楼')) {
          updatedHistory[index].image = imageUrls.yml;
          imageSet = true;
        } else if (restaurant.name && restaurant.name.includes('匠心')) {
          updatedHistory[index].image = imageUrls.jx;
          imageSet = true;
        } else if (restaurant.name && restaurant.name.includes('小梅')) {
          updatedHistory[index].image = imageUrls.xm;
          imageSet = true;
        } else if (restaurant.name && restaurant.name.includes('马克思')) {
          updatedHistory[index].image = imageUrls.max;
          imageSet = true;
        } else if (restaurant.name && restaurant.name.includes('面三郎')) {
          updatedHistory[index].image = imageUrls.m3l;
          imageSet = true;
        } else if (restaurant.name && restaurant.name.includes('湘聚')) {
          updatedHistory[index].image = imageUrls.xiangj;
          imageSet = true;
        }
      }
      
      // 3. 尝试从imageID或cloudImageId中提取文件名
      if (!imageSet) {
        if (restaurant.imageID) {
          const filename = restaurant.imageID.split('/').pop().split('.')[0];
          if (imageUrls[filename]) {
            updatedHistory[index].image = imageUrls[filename];
            imageSet = true;
          }
        }
        
        if (!imageSet && restaurant.cloudImageId) {
          const filename = restaurant.cloudImageId.split('/').pop().split('.')[0];
          if (imageUrls[filename]) {
            updatedHistory[index].image = imageUrls[filename];
            imageSet = true;
          }
        }
      }
      
      // 4. 如果还是没有匹配到，使用默认图片
      if (!imageSet) {
        updatedHistory[index].image = '/images/logo.png';
      }
    });
    
    // 更新所有餐厅图片
    this.setData({
      historyRestaurants: updatedHistory
    });
    
    // 同时更新本地存储
    wx.setStorageSync('historyRestaurants', updatedHistory);
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
    
    // 直接删除，不再显示确认对话框
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
    // 直接使用外部URL
    this.setData({
      bgImageUrl: 'https://i.ibb.co/CK88nNPD/munich.png'
    });
  }
})