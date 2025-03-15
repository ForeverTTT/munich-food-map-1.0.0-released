// pages/friend/post/post.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedDate: '',
    selectedPeople: '2',
    selectedPeopleIndex: 0,
    peopleRange: ['1', '2', '3', '4', '5', '6', '7', '8'],
    mealTimeRange: ['午餐', '晚餐', '下午茶', '宵夜'],
    selectedMealTime: '午餐',
    selectedMealTimeIndex: 0,
    content: '',
    wxid: '',
    startDate: '',
    endDate: '',
    submitting: false,
    contentError: '',
    wxidError: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 设置日期范围（今天到30天后）
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 30); // 允许选择过去30天的日期
    
    const endDate = new Date();
    endDate.setDate(today.getDate() + 30);

    this.setData({
      selectedDate: this.formatDate(today),
      startDate: this.formatDate(pastDate), // 从过去30天开始
      endDate: this.formatDate(endDate)
    });
  },

  // 返回上一页
  onBack: function() {
    wx.navigateBack();
  },

  formatDate: function(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  onDateChange: function(e) {
    this.setData({
      selectedDate: e.detail.value
    });
  },

  onMealTimeChange: function(e) {
    this.setData({
      selectedMealTime: this.data.mealTimeRange[e.detail.value],
      selectedMealTimeIndex: e.detail.value
    });
  },

  onPeopleChange: function(e) {
    this.setData({
      selectedPeople: this.data.peopleRange[e.detail.value],
      selectedPeopleIndex: e.detail.value
    });
  },

  onContentInput: function(e) {
    const content = e.detail.value;
    this.setData({
      content: content,
      contentError: ''
    });
  },

  onWxidInput: function(e) {
    const wxid = e.detail.value;
    this.setData({
      wxid: wxid,
      wxidError: ''
    });
  },

  validateContent: function() {
    const content = this.data.content.trim();
    
    if (!content) {
      this.setData({
        contentError: '请输入内容'
      });
      return false;
    }
    
    return true;
  },

  validateWxid: function() {
    const wxid = this.data.wxid.trim();
    
    if (!wxid) {
      this.setData({
        wxidError: '请输入微信号'
      });
      return false;
    }
    
    return true;
  },

  onSubmit: function() {
    // 验证所有字段是否已填写
    let isValid = true;
    let errorMessage = '';
    
    // 验证日期
    if (!this.data.selectedDate) {
      isValid = false;
      errorMessage = '请选择日期';
    }
    
    // 验证用餐时间
    else if (!this.data.selectedMealTime) {
      isValid = false;
      errorMessage = '请选择用餐时间';
    }
    
    // 验证人数
    else if (!this.data.selectedPeople) {
      isValid = false;
      errorMessage = '请选择人数';
    }
    
    // 验证微信号
    else if (!this.data.wxid.trim()) {
      isValid = false;
      errorMessage = '请填写微信号';
    }
    
    // 如果有错误，显示提示并返回
    if (!isValid) {
      wx.showToast({
        title: errorMessage,
        icon: 'none'
      });
      return;
    }

    if (this.data.submitting) return;
    
    this.setData({ submitting: true });

    wx.showLoading({
      title: '发布中...',
    });

    try {
      const db = wx.cloud.database();
      
      // 创建新帖子
      db.collection('foodPartnerPosts').add({
        data: {
          userId: app.globalData.openid || this.getUserId(),
          username: this.getUserName(),
          date: this.data.selectedDate,
          mealTime: this.data.selectedMealTime,
          peopleCount: this.data.selectedPeople,
          description: this.data.content,
          wxid: this.data.wxid,
          likes: 0,
          comments: [],
          createTime: db.serverDate()
        }
      })
      .then(res => {
        console.log('发布成功:', res);
        wx.hideLoading();
        
        wx.showToast({
          title: '发布成功',
          icon: 'success'
        });
        
        // 返回上一页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      })
      .catch(err => {
        console.error('发布失败:', err);
        wx.hideLoading();
        wx.showToast({
          title: '发布失败，请重试',
          icon: 'none'
        });
        this.setData({ submitting: false });
      });
    } catch (err) {
      console.error('发布过程出错:', err);
      wx.hideLoading();
      wx.showToast({
        title: '发布失败，请重试',
        icon: 'none'
      });
      this.setData({ submitting: false });
    }
  },
  
  // 获取用户ID
  getUserId: function() {
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo && userInfo.userId) {
        return userInfo.userId;
      }
      
      // 如果没有存储的用户ID，生成一个随机ID
      const userId = new Date().getTime().toString().slice(-8);
      
      // 保存到本地存储
      const newUserInfo = { userId, username: this.getUserName() };
      wx.setStorageSync('userInfo', newUserInfo);
      
      return userId;
    } catch (e) {
      console.error('获取用户ID失败:', e);
      return new Date().getTime().toString().slice(-8);
    }
  },
  
  // 获取用户名
  getUserName: function() {
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo && userInfo.username) {
        return userInfo.username;
      }
      return '美食达人';
    } catch (e) {
      console.error('获取用户名失败:', e);
      return '美食达人';
    }
  }
});