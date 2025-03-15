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
    showCommentInput: false,
    currentPostId: '',
    commentText: '',
    // 新增筛选条件
    selectedDate: '',
    selectedPeople: '2',
    peopleRange: ['1', '2', '3', '4', '5', '6', '7', '8'],
    mealTimeRange: ['午餐', '晚餐', '下午茶', '宵夜'],
    selectedMealTime: '午餐',
    selectedMealTimeIndex: 0,
    // 筛选条件
    loading: false,
    likedPostIds: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadBgImage();
    this.loadUserInfo();
    this.setDefaultDate();
    this.loadPosts();
    this.loadUserLikes();
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
    this.loadUserLikes();
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
  onShareAppMessage() {

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
    db.collection('foodPartnerPosts')
      .orderBy('createTime', 'desc')
      .get()
      .then(res => {
        console.log('获取饭搭子帖子成功:', res.data);
        
        // 处理每个帖子，标记是否是当前用户发布的
        const posts = res.data.map(post => {
          return {
            ...post,
            isOwnPost: post.userId === this.data.userInfo.userId,
            showComments: false, // 默认折叠评论
            isLiked: this.data.likedPostIds.includes(post._id),
            commentsCollapsed: true, // 默认折叠评论区
            commentList: post.comments || []
          };
        });
        
        this.setData({
          posts: posts,
          isLoading: false
        });
      })
      .catch(err => {
        console.error('获取饭搭子帖子失败:', err);
        this.setData({ isLoading: false });
        wx.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        });
      });
  },

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
      }
    });
  },

  navigateToPost: function() {
    wx.navigateTo({
      url: '/pages/friend/post/post'
    });
  },

  // 点赞功能
  onLike: function(e) {
    const postId = e.currentTarget.dataset.id;
    const postIndex = this.data.posts.findIndex(post => post._id === postId);
    
    if (postIndex < 0) return;
    
    const db = wx.cloud.database();
    const post = this.data.posts[postIndex];
    const isLiked = post.isLiked;
    const newLikes = isLiked ? (post.likes - 1 || 0) : (post.likes + 1 || 1);
    
    db.collection('foodPartnerPosts').doc(postId).update({
      data: {
        likes: newLikes
      }
    }).then(res => {
      console.log('点赞成功');
      
      // 更新本地显示
      const posts = [...this.data.posts];
      posts[postIndex].likes = newLikes;
      posts[postIndex].isLiked = !isLiked;
      
      // 更新点赞ID列表
      let likedPostIds = [...this.data.likedPostIds];
      if (isLiked) {
        likedPostIds = likedPostIds.filter(id => id !== postId);
      } else {
        likedPostIds.push(postId);
      }
      
      this.setData({ 
        posts,
        likedPostIds
      });
      
      // 保存点赞状态
      this.saveUserLikes();
      
      wx.showToast({
        title: isLiked ? '取消点赞' : '点赞成功',
        icon: 'success'
      });
    }).catch(err => {
      console.error('点赞失败:', err);
      wx.showToast({
        title: '操作失败',
        icon: 'none'
      });
    });
  },

  // 删除帖子
  deletePost: function(e) {
    const postId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条帖子吗？',
      success: res => {
        if (res.confirm) {
          const db = wx.cloud.database();
          db.collection('foodPartnerPosts').doc(postId).remove()
            .then(res => {
              console.log('删除帖子成功:', res);
              
              // 从本地列表中移除
              const posts = this.data.posts.filter(post => post._id !== postId);
              this.setData({ posts });
              
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
            })
            .catch(err => {
              console.error('删除帖子失败:', err);
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              });
            });
        }
      }
    });
  },

  // 切换评论区显示状态
  toggleCommentSection: function(e) {
    const postId = e.currentTarget.dataset.id;
    const posts = [...this.data.posts];
    const post = posts.find(p => p._id === postId);
    
    if (post) {
      post.commentsCollapsed = !post.commentsCollapsed;
      // 如果折叠评论区，同时关闭评论输入框
      if (post.commentsCollapsed) {
        post.showCommentInput = false;
      }
      this.setData({ posts });
    }
  },

  // 显示评论输入框
  toggleCommentInput: function(e) {
    const postId = e.currentTarget.dataset.id;
    const posts = [...this.data.posts];
    const post = posts.find(p => p._id === postId);
    
    if (post) {
      // 如果评论区折叠，先展开评论区
      post.commentsCollapsed = false;
      post.showCommentInput = !post.showCommentInput;
      post.inputFocus = post.showCommentInput;
      post.commentValue = '';
      this.setData({ posts });
    }
  },

  // 监听评论文字变化
  onCommentInput: function(e) {
    const postId = e.currentTarget.dataset.id;
    const value = e.detail.value;
    
    const posts = this.data.posts.map(post => {
      if (post._id === postId) {
        return {
          ...post,
          commentValue: value
        };
      }
      return post;
    });
    
    this.setData({ posts });
  },

  // 提交评论
  submitComment: function(e) {
    const postId = e.currentTarget.dataset.id;
    const post = this.data.posts.find(p => p._id === postId);
    
    if (!post || !post.commentValue || !post.commentValue.trim()) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      });
      return;
    }

    const db = wx.cloud.database();
    
    const comment = {
      userId: this.data.userInfo.userId,
      username: this.data.userInfo.username,
      content: post.commentValue.trim(),
      time: this.formatDateTime(new Date()),
      createTime: db.serverDate()
    };

    db.collection('foodPartnerPosts').doc(postId).update({
      data: {
        comments: db.command.push(comment)
      }
    }).then(res => {
      console.log('评论成功:', res);
      
      // 更新本地显示
      const posts = this.data.posts.map(p => {
        if (p._id === postId) {
          const commentList = [...(p.commentList || []), comment];
          return {
            ...p,
            commentList: commentList,
            commentValue: '',
            showCommentInput: false
          };
        }
        return p;
      });
      
      this.setData({ posts });
      
      wx.showToast({
        title: '评论成功',
        icon: 'success'
      });
    }).catch(err => {
      console.error('评论失败:', err);
      wx.showToast({
        title: '评论失败',
        icon: 'none'
      });
    });
  },

  // 约饭功能
  makeReservation: function(e) {
    const postId = e.currentTarget.dataset.id;
    const post = this.data.posts.find(p => p._id === postId);
    
    if (!post) return;
    
    wx.showModal({
      title: '确认约饭',
      content: `确定要与${post.username || '该用户'}在${post.date} ${post.mealTime}一起用餐吗？`,
      success: res => {
        if (res.confirm) {
          // 这里可以添加约饭逻辑，如发送通知给发布者等
          wx.showToast({
            title: '约饭请求已发送',
            icon: 'success'
          });
        }
      }
    });
  },

  // 用户点赞数据管理
  loadUserLikes: function() {
    console.log('加载用户点赞数据');
    try {
      const likedPostIds = wx.getStorageSync('forumLikedPosts') || [];
      this.setData({
        likedPostIds: likedPostIds
      });
      console.log('已加载点赞数据', likedPostIds);
    } catch (e) {
      console.error('获取点赞记录失败', e);
      this.setData({
        likedPostIds: []
      });
    }
  },
  
  // 保存用户点赞数据
  saveUserLikes: function() {
    try {
      wx.setStorageSync('forumLikedPosts', this.data.likedPostIds);
    } catch (e) {
      console.error('保存点赞记录失败', e);
    }
  },

  // 格式化日期时间
  formatDateTime: function(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
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
  }
});