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
    selectedMealTimeIndex: 0,
    // 分页相关
    pageSize: 5,       // 每页加载数量
    currentPage: 0,    // 当前页码
    hasMoreData: true, // 是否还有更多数据
    isLoadingMore: false, // 是否正在加载更多
    totalCount: 0      // 总数据量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 确保isLoading状态为true
    this.setData({
      isLoading: true
    });
    
    // 加载背景图
    this.loadBgImage();
    
    // 添加一个延迟，确保加载动画能显示一段时间
    setTimeout(() => {
      // 加载帖子数据
      this.loadPosts();
    }, 1500); // 延迟1.5秒加载数据

    this.loadUserInfo();
    this.setDefaultDate();

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
    if (this.data.posts.length > 0) {
      // 如果已经有数据，刷新第一页数据即可
      this.refreshPosts();
    } else {
      this.loadPosts();
    }
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
    this.refreshPosts();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.hasMoreData && !this.data.isLoading && !this.data.isLoadingMore) {
      this.loadMorePosts();
    }
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

  // 刷新帖子 (重置分页并加载第一页)
  refreshPosts: function() {
    this.setData({
      currentPage: 0,
      hasMoreData: true,
      posts: []
    });
    this.loadPosts();
  },

  // 加载帖子 (首次加载或刷新)
  loadPosts: function() {
    this.setData({ isLoading: true });
    
    const db = wx.cloud.database();
    const _ = db.command;
    const { pageSize, currentPage } = this.data;
    
    // 构建查询条件
    const query = this.buildQueryFilter();
    
    // 首先获取总数，用于判断是否还有更多数据
    db.collection('friend')
      .where(query)
      .count()
      .then(res => {
        this.setData({
          totalCount: res.total
        });
      })
      .catch(err => {
        console.error('获取总数失败:', err);
      });
    
    // 查询当前页的数据
    db.collection('friend')
      .where(query)
      .orderBy('createTime', 'desc')
      .skip(currentPage * pageSize)
      .limit(pageSize)
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
        
        // 判断是否还有更多数据
        const hasMoreData = posts.length === pageSize && (currentPage + 1) * pageSize < this.data.totalCount;
        
        this.setData({
          posts: posts,
          isLoading: false,
          hasMoreData: hasMoreData
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

  // 加载更多帖子
  loadMorePosts: function() {
    if (!this.data.hasMoreData || this.data.isLoadingMore) {
      return;
    }
    
    this.setData({ 
      isLoadingMore: true,
      currentPage: this.data.currentPage + 1
    });
    
    const db = wx.cloud.database();
    const { pageSize, currentPage } = this.data;
    
    // 构建查询条件
    const query = this.buildQueryFilter();
    
    // 查询下一页数据
    db.collection('friend')
      .where(query)
      .orderBy('createTime', 'desc')
      .skip(currentPage * pageSize)
      .limit(pageSize)
      .get()
      .then(res => {
        const newPosts = res.data.map(post => {
          return {
            ...post,
            isOwnPost: post.userId === this.data.userInfo.userId
          };
        });
        
        // 合并现有数据与新数据
        const allPosts = [...this.data.posts, ...newPosts];
        
        // 判断是否还有更多数据
        const hasMoreData = newPosts.length === pageSize && allPosts.length < this.data.totalCount;
        
        this.setData({
          posts: allPosts,
          isLoadingMore: false,
          hasMoreData: hasMoreData
        });
        
        // 更新缓存
        this.savePostsToCache(allPosts);
      })
      .catch(err => {
        console.error('加载更多帖子失败:', err);
        this.setData({ 
          isLoadingMore: false
        });
        
        wx.showToast({
          title: '加载更多失败',
          icon: 'none'
        });
      });
  },

  // 构建查询过滤条件
  buildQueryFilter: function() {
    const query = {};
    const { selectedDate, selectedMealTime, selectedPeople } = this.data;
    
    // 只有当用户明确选择了筛选条件时才添加到查询中
    if (selectedDate && selectedDate !== '全部') {
      query.date = selectedDate;
    }
    
    if (selectedMealTime && selectedMealTime !== '全部') {
      query.mealTime = selectedMealTime;
    }
    
    if (selectedPeople && selectedPeople !== '全部' && selectedPeople !== '') {
      query.peopleCount = selectedPeople;
    }
    
    return query;
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
        // 设置备用图片
        this.setData({
          bgImageUrl: '../../images/bgimage.png'  // 使用本地图片作为备用
        });
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
    // 重新加载第一页数据
    this.refreshPosts();
  },

  // 餐段选择
  onMealTimeChange: function(e) {
    this.setData({
      selectedMealTime: this.data.mealTimeRange[e.detail.value],
      selectedMealTimeIndex: e.detail.value
    });
    // 重新加载第一页数据
    this.refreshPosts();
  },

  // 人数选择
  onPeopleChange: function(e) {
    this.setData({
      selectedPeople: this.data.peopleRange[e.detail.value]
    });
    // 重新加载第一页数据
    this.refreshPosts();
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