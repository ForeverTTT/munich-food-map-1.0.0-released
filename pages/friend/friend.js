// pages/friend/friend.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: [],
    bgImageUrl: '',
    isLoading: true,
    userInfo: {},
    // 筛选条件
    selectedDate: '',
    selectedPeople: '2',
    peopleRange: ['1', '2', '3', '4', '5', '6', '7', '8'],
    mealTimeRange: ['午餐', '晚餐', '下午茶', '宵夜'],
    selectedMealTime: '午餐',
    selectedMealTimeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadBgImage();
    this.loadUserInfo();
    this.setDefaultDate();
    this.loadPosts();

    // 如果有分享进入的帖子ID
    if (options.post_id) {
      setTimeout(() => {
        this.scrollToPost(options.post_id);
      }, 500);
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
    this.loadPosts();
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
    this.loadPosts();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    if (res.from === 'button') {
      const id = res.target.dataset.id;
      const post = this.data.posts.find(item => item._id === id);
      
      if (post) {
        return {
          title: `${post.username}想和你一起吃饭，${post.date} ${post.mealTime}`,
          path: `/pages/friend/friend?post_id=${post._id}`,
          imageUrl: '../../images/share-image.png' // 需要替换为实际的分享图
        };
      }
    }
    
    return {
      title: '美食地图 - 寻找饭搭子',
      path: '/pages/friend/friend',
      imageUrl: '../../images/share-image.png' // 需要替换为实际的分享图
    };
  },

  // 滚动到指定帖子
  scrollToPost: function(postId) {
    const posts = this.data.posts;
    const index = posts.findIndex(p => p._id === postId);
    
    if (index > -1) {
      // 找到了帖子
      // 使用选择器，滚动到该帖子
      wx.createSelectorQuery()
        .select(`#post-${postId}`)
        .boundingClientRect(rect => {
          wx.pageScrollTo({
            scrollTop: rect.top,
            duration: 300
          });
        })
        .exec();
    }
  },

  setDefaultDate: function() {
    // 设置默认日期为今天
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    this.setData({ selectedDate: dateStr });
  },

  loadUserInfo: function() {
    // 从本地存储获取用户信息
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({ userInfo });
      } else {
        this.setData({
          userInfo: {
            username: '美食达人',
            userId: new Date().getTime().toString().slice(-8)
          }
        });
        wx.setStorageSync('userInfo', this.data.userInfo);
      }
    } catch (e) {
      console.error('获取用户信息失败', e);
    }
  },

  loadPosts: function() {
    this.setData({ isLoading: true });
    
    const db = wx.cloud.database();
    db.collection('friend')
      .orderBy('createTime', 'desc')
      .get()
      .then(res => {
        console.log('获取饭搭子帖子成功:', res.data);
        
        // 处理每个帖子，标记是否是当前用户发布的
        const posts = res.data.map(post => {
          return {
            ...post,
            isOwnPost: post.userId === this.data.userInfo.userId
          };
        });
        
        this.setData({
          posts: posts,
          isLoading: false
        });
        
        // 缓存帖子数据用于离线状态
        this.savePostsToCache(posts);
      })
      .catch(err => {
        console.error('获取饭搭子帖子失败:', err);
        this.setData({ isLoading: false });

        // 从本地缓存加载帖子
        try {
          const cachedPosts = wx.getStorageSync('cached_posts');
          if (cachedPosts && cachedPosts.length > 0) {
            this.setData({
              posts: cachedPosts.map(post => ({
                ...post,
                isOwnPost: post.userId === this.data.userInfo.userId
              }))
            });
            wx.showToast({
              title: '已加载缓存数据',
              icon: 'none'
            });
          } else {
            wx.showToast({
              title: '加载失败，请重试',
              icon: 'none'
            });
          }
        } catch (e) {
          console.error('读取缓存帖子失败', e);
          wx.showToast({
            title: '加载失败，请重试',
            icon: 'none'
          });
        }
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
      }
    });
  },
  loadEmptyImage: function() {
    wx.cloud.getTempFileURL({
      fileList: ['cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/empty.png'],
      success: res => {
        if (res.fileList && res.fileList.length > 0) {
          this.setData({
            emptyImageUrl: res.fileList[0].tempFileURL
          });
        }
      },
      fail: err => {
        console.error('获取空结果图片失败', err);
      }
    });
  },
  navigateToPost: function() {
    wx.navigateTo({
      url: '/pages/friend/post/post'
    });
  },

  // 复制微信号
  copyWxid: function(e) {
    const wxid = e.currentTarget.dataset.wxid;
    
    if (!wxid) {
      wx.showToast({
        title: '未提供微信号',
        icon: 'none'
      });
      return;
    }
    
    wx.setClipboardData({
      data: wxid,
      success: function() {
        wx.showToast({
          title: '已复制微信号',
          icon: 'success'
        });
      }
    });
  },

  // 缓存帖子数据
  savePostsToCache: function(posts) {
    try {
      wx.setStorageSync('cached_posts', posts);
    } catch (e) {
      console.error('缓存帖子失败', e);
    }
  },

  // 日期选择
  onDateChange: function(e) {
    this.setData({
      selectedDate: e.detail.value
    });
    // 这里可以根据筛选条件重新加载
    this.loadPosts();
  },

  // 餐段选择
  onMealTimeChange: function(e) {
    this.setData({
      selectedMealTime: this.data.mealTimeRange[e.detail.value],
      selectedMealTimeIndex: e.detail.value
    });
    // 这里可以根据筛选条件重新加载
    this.loadPosts();
  },

  // 人数选择
  onPeopleChange: function(e) {
    this.setData({
      selectedPeople: this.data.peopleRange[e.detail.value]
    });
    // 这里可以根据筛选条件重新加载
    this.loadPosts();
  },
  
  // 创建帖子
  onCreatePost: function() {
    this.navigateToPost();
  },

  // 删除帖子
  deletePost: function(e) {
    const postId = e.currentTarget.dataset.id;
    
    if (!postId) {
      wx.showToast({
        title: '无效的帖子ID',
        icon: 'none'
      });
      return;
    }
    
    // 弹窗确认是否删除
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条帖子吗？删除后无法恢复。',
      confirmColor: '#F97316',
      success: (res) => {
        if (res.confirm) {
          this.performDeletePost(postId);
        }
      }
    });
  },
  
  // 执行删除帖子操作
  performDeletePost: function(postId) {
    // 设置加载状态
    wx.showLoading({
      title: '删除中...',
      mask: true
    });
    
    // 从云数据库删除
    const db = wx.cloud.database();
    
    db.collection('friend').doc(postId).remove()
      .then(res => {
        console.log('删除帖子成功', res);
        
        // 更新本地数据，移除被删除的帖子
        const updatedPosts = this.data.posts.filter(post => post._id !== postId);
        this.setData({
          posts: updatedPosts
        });
        
        // 更新缓存
        this.savePostsToCache(updatedPosts);
        
        // 关闭加载提示
        wx.hideLoading();
        
        // 显示成功提示
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        });
      })
      .catch(err => {
        console.error('删除帖子失败', err);
        
        // 关闭加载提示
        wx.hideLoading();
        
        // 显示失败提示
        wx.showToast({
          title: '删除失败，请重试',
          icon: 'none'
        });
      });
  }
});