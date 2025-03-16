const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 图片上传相关
    imageList: [],
    maxImageCount: 9,
    // 评分相关
    rating: 0,
    // 表单数据
    shopName: '',
    content: '',
    tagInput: '',
    tags: [],
    // 分类选择
    categoryOptions: ['美食', '饮品', '小吃'],
    categoryIndex: 0,
    category: '美食',
    // 状态
    isSubmitting: false,
    // 用户信息
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadUserInfo();
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

  // 加载用户信息
  loadUserInfo: function() {
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({ userInfo });
      } else {
        // 如果没有用户信息，生成一个临时用户
        this.setData({
          userInfo: {
            username: '美食探店家',
            userId: new Date().getTime().toString().slice(-8)
          }
        });
        wx.setStorageSync('userInfo', this.data.userInfo);
      }
    } catch (e) {
      console.error('获取用户信息失败', e);
    }
  },

  // 选择图片
  chooseImage: function() {
    const currentCount = this.data.imageList.length;
    const remainCount = this.data.maxImageCount - currentCount;
    
    if (remainCount <= 0) {
      wx.showToast({
        title: `最多上传${this.data.maxImageCount}张图片`,
        icon: 'none'
      });
      return;
    }
    
    wx.chooseImage({
      count: remainCount,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 合并已有图片和新选的图片
        this.setData({
          imageList: [...this.data.imageList, ...res.tempFilePaths]
        });
      }
    });
  },

  // 预览图片
  previewImage: function(e) {
    const current = e.currentTarget.dataset.src;
    wx.previewImage({
      current,
      urls: this.data.imageList
    });
  },

  // 删除图片
  deleteImage: function(e) {
    const index = e.currentTarget.dataset.index;
    const imageList = [...this.data.imageList];
    imageList.splice(index, 1);
    this.setData({ imageList });
  },

  // 设置评分
  setRating: function(e) {
    const rating = e.currentTarget.dataset.rating;
    this.setData({ rating });
  },

  // 监听店铺名称输入
  onShopNameInput: function(e) {
    this.setData({ shopName: e.detail.value });
  },

  // 监听内容输入
  onContentInput: function(e) {
    this.setData({ content: e.detail.value });
  },

  // 监听标签输入
  onTagInput: function(e) {
    this.setData({ tagInput: e.detail.value });
  },

  // 添加标签
  addTag: function() {
    const { tagInput, tags } = this.data;
    
    if (!tagInput.trim()) {
      wx.showToast({
        title: '请输入标签内容',
        icon: 'none'
      });
      return;
    }
    
    // 检查标签是否已存在
    if (tags.includes(tagInput.trim())) {
      wx.showToast({
        title: '该标签已存在',
        icon: 'none'
      });
      return;
    }
    
    // 限制标签数量
    if (tags.length >= 5) {
      wx.showToast({
        title: '最多添加5个标签',
        icon: 'none'
      });
      return;
    }
    
    // 添加新标签
    this.setData({
      tags: [...tags, tagInput.trim()],
      tagInput: ''
    });
  },

  // 删除标签
  deleteTag: function(e) {
    const index = e.currentTarget.dataset.index;
    const tags = [...this.data.tags];
    tags.splice(index, 1);
    this.setData({ tags });
  },

  // 分类选择变化
  bindCategoryChange: function(e) {
    const index = e.detail.value;
    this.setData({
      categoryIndex: index,
      category: this.data.categoryOptions[index]
    });
  },

  // 表单提交
  onSubmit: function() {
    const { shopName, content, rating, tags, category, imageList } = this.data;
    
    // 验证输入
    if (!shopName.trim()) {
      wx.showToast({
        title: '请输入店铺名称',
        icon: 'none'
      });
      return;
    }
    
    if (rating === 0) {
      wx.showToast({
        title: '请为店铺评分',
        icon: 'none'
      });
      return;
    }
    
    if (!content.trim()) {
      wx.showToast({
        title: '请输入探店内容',
        icon: 'none'
      });
      return;
    }
    
    // 设置提交状态
    this.setData({ isSubmitting: true });
    
    // 显示加载提示
    wx.showLoading({
      title: '发布中...',
      mask: true
    });
    
    // 上传图片（如果有）
    if (imageList.length > 0) {
      this.uploadImages()
        .then(imageUrls => {
          // 上传帖子数据
          return this.savePostData(imageUrls);
        })
        .then(() => {
          // 提交成功
          wx.hideLoading();
          this.setData({ isSubmitting: false });
          
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000,
            success: () => {
              // 延迟返回，让用户看到成功提示
              setTimeout(() => {
                wx.navigateBack();
              }, 1500);
            }
          });
        })
        .catch(err => {
          // 处理错误
          console.error('发布失败:', err);
          wx.hideLoading();
          this.setData({ isSubmitting: false });
          
          wx.showToast({
            title: '发布失败，请重试',
            icon: 'none'
          });
        });
    } else {
      // 无图片直接保存帖子数据
      this.savePostData([])
        .then(() => {
          // 提交成功
          wx.hideLoading();
          this.setData({ isSubmitting: false });
          
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000,
            success: () => {
              // 延迟返回，让用户看到成功提示
              setTimeout(() => {
                wx.navigateBack();
              }, 1500);
            }
          });
        })
        .catch(err => {
          // 处理错误
          console.error('发布失败:', err);
          wx.hideLoading();
          this.setData({ isSubmitting: false });
          
          wx.showToast({
            title: '发布失败，请重试',
            icon: 'none'
          });
        });
    }
  },

  // 上传图片到云存储
  uploadImages: function() {
    const { imageList } = this.data;
    const uploadTasks = [];
    
    // 创建上传任务
    for (let i = 0; i < imageList.length; i++) {
      const filePath = imageList[i];
      
      // 文件扩展名
      const extension = filePath.match(/\.[^.]+?$/)[0] || '.jpg';
      
      // 构建云存储路径
      const cloudPath = `explore/${this.data.userInfo.userId}/${Date.now()}-${i}${extension}`;
      
      // 添加上传任务
      uploadTasks.push(
        wx.cloud.uploadFile({
          cloudPath,
          filePath
        })
      );
    }
    
    // 执行所有上传任务
    return Promise.all(uploadTasks)
      .then(results => {
        // 提取文件ID列表
        return results.map(res => res.fileID);
      });
  },

  // 保存帖子数据到数据库
  savePostData: function(imageUrls) {
    const { shopName, content, rating, tags, category } = this.data;
    const { userId, username } = this.data.userInfo;
    
    // 构建帖子数据
    const postData = {
      shopName,
      content,
      rating,
      tags,
      category,
      images: imageUrls,
      userId,
      username,
      likes: 0,
      comments: [],
      createTime: this.formatTime(new Date()),
      timestamp: Date.now()
    };
    
    // 保存到云数据库
    const db = wx.cloud.database({
      env: 'cloud1-8gaz8w8x9edb3a42'
    });
    const explore = db.collection('explore');
    const _ = db.command;
    
    return explore.add({
      data: postData
    });
  },

  // 格式化时间
  formatTime: function(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    return `${year}-${this.formatNumber(month)}-${this.formatNumber(day)} ${this.formatNumber(hour)}:${this.formatNumber(minute)}`;
  },
  
  formatNumber: function(n) {
    n = n.toString();
    return n[1] ? n : `0${n}`;
  },

  // 返回上一页
  onCancel: function() {
    // 如果正在提交，禁止返回
    if (this.data.isSubmitting) {
      return;
    }
    
    wx.navigateBack();
  }
}); 