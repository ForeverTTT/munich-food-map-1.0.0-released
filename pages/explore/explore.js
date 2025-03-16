// pages/explore/explore.js
const db = wx.cloud.database({
  env: 'cloud1-8gaz8w8x9edb3a42'
});
const explore = db.collection('explore');
const _ = db.command;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {
      id: '',
      name: '',
      image: '',
      address: '',
      phone: '',
      averagePrice: 0,
      rating: 0,
      openingHours: '',
      tags: [],
      description: '',
      cuisine: ''
    },
    restaurantDetails: {
      1: {
        phone: '无',
        averagePrice: 15,
        rating: 4.5,
        openingHours: '周一至周日 11:30-21:30',
        tags: ['麻辣烫', '中式料理', '经济实惠'],
        description: 'Gululu Mini Hot Pot 提供正宗的麻辣烫，食材新鲜，口味地道。适合朋友聚餐和快速就餐。',
        cuisine: '麻辣烫'
      },
      2: {
        phone: '+49 89 37454752',
        averagePrice: 15,
        rating: 4.6,
        openingHours: '周六至周日 9:30-20:00',
        tags: ['麻辣烫', '中式料理', '连锁店'],
        description: '张亮麻辣烫是中国知名连锁麻辣烫品牌，提供各种蔬菜、肉类、豆制品等食材，顾客可自由选择，汤底麻辣鲜香。',
        cuisine: '麻辣烫'
      },
      3: {
        phone: '+49 89 12262573',
        averagePrice: 15,
        rating: 4.7,
        openingHours: '周一至周日 11:30-21:00',
        tags: ['川菜', '麻辣', '中餐'],
        description: '你好成都餐厅提供正宗四川风味，麻辣鲜香，菜品丰富多样，包括经典川菜及特色小吃。',
        cuisine: '川菜'
      },
      4: {
        phone: '+49 160 95881606',
        averagePrice: 15,
        rating: 4.3,
        openingHours: '周一至周日 11:30-22:00',
        tags: ['中餐', '家庭聚餐', '经济实惠'],
        description: '唐人街餐厅提供多种中式美食，包括粤菜、川菜等多个地方风味，适合家庭聚餐和朋友聚会。',
        cuisine: '中餐馆'
      },
      5: {
        phone: '+49 89 28855860',
        averagePrice: 25,
        rating: 4.5,
        openingHours: '周一至周日 11:30-21:30',
        tags: ['烧烤', '韩式', '聚餐'],
        description: 'Chagiya提供正宗的亚洲风味烧烤，以韩式烧烤为主，顾客可以在餐桌上自己烹饪新鲜食材，体验独特的用餐乐趣。',
        cuisine: '烧烤店'
      },
      6: {
        phone: '+49 89 12252158',
        averagePrice: 15,
        rating: 4.4,
        openingHours: '周一至周日 11:30-22:30',
        tags: ['中餐', '家庭聚餐', '经济实惠'],
        description: '宴遇中餐馆提供多种中式菜肴，口味正宗，环境舒适，适合家庭聚餐和朋友聚会。',
        cuisine: '中餐馆'
      },
      7: {
        phone: '+49 89 81889098',
        averagePrice: 20,
        rating: 4.8,
        openingHours: '周一至周日 12:00-23:00',
        tags: ['火锅', '川菜', '聚会'],
        description: '古蜀火锅提供正宗四川风味火锅，汤底麻辣鲜香，食材新鲜丰富，是聚会和享受美食的理想场所。',
        cuisine: '火锅'
      },
      8: {
        phone: '+49 89 7854942',
        averagePrice: 25,
        rating: 4.7,
        openingHours: '周一至周日 17:00-23:00',
        tags: ['火锅', '中餐', '晚餐'],
        description: '零点火锅提供多种口味的火锅汤底，食材新鲜丰富，环境舒适，适合晚间就餐和朋友聚会。',
        cuisine: '火锅'
      },
      9: {
        phone: '+49 1521 9654245',
        averagePrice: 15,
        rating: 4.5,
        openingHours: '周一至周日 12:00-22:00',
        tags: ['面食', '快餐', '经济实惠'],
        description: 'Mian Noodles提供多种中式面食，口味正宗，分量足，价格实惠，适合快速就餐。',
        cuisine: '面馆'
      },
      10: {
        phone: '+49 89 7258565',
        averagePrice: 15,
        rating: 4.6,
        openingHours: '周一至周日 12:00-22:00',
        tags: ['麻辣', '干锅', '经济实惠'],
        description: '麻辣煮義提供特色干锅麻辣烫，选料讲究，口味独特，麻辣鲜香，深受食客喜爱。',
        cuisine: '干锅麻辣烫'
      },
      11: {
        phone: '+49 89 39290131',
        averagePrice: 45,
        rating: 4.9,
        openingHours: '周一至周日 17:00-23:00',
        tags: ['火锅', '高档', '聚会'],
        description: 'Chois中国的味道火锅店提供高品质火锅体验，汤底讲究，食材优质，环境精致，适合重要聚会和特殊场合。',
        cuisine: '火锅'
      },
      12: {
        phone: '+49 89 51556868',
        averagePrice: 15,
        rating: 4.6,
        openingHours: '周一至周日 11:30-22:00',
        tags: ['拉面', '牛肉面', '经济实惠'],
        description: '马克思牛肉拉面以其正宗手工拉面和浓郁的牛肉汤底而闻名，面条筋道，牛肉鲜嫩，是面食爱好者的首选。',
        cuisine: '拉面'
      },
      13: {
        phone: '+49 89 23032399',
        averagePrice: 25,
        rating: 4.7,
        openingHours: '周一至周日 11:30-22:30',
        tags: ['湘菜', '辣', '聚餐'],
        description: '湘聚提供正宗湖南风味菜肴，以辣味见长，口味丰富多样，菜品讲究色香味俱全，适合喜欢辣味的食客。',
        cuisine: '湘菜'
      },
      14: {
        phone: '+49 1590 1700133',
        averagePrice: 15,
        rating: 4.5,
        openingHours: '周一至周日 11:30-22:00',
        tags: ['面食', '简餐', '经济实惠'],
        description: '面三郎提供多种中式面食和简餐，口味地道，分量足，价格实惠，适合日常就餐。',
        cuisine: '面馆简餐'
      },
      15: {
        phone: '+49 89 927419666',
        averagePrice: 15,
        rating: 4.4,
        openingHours: '周一至周日 11:30-22:00',
        tags: ['面食', '简餐', '经济实惠'],
        description: '一大碗以其分量十足的面食和简餐而闻名，口味正宗，价格实惠，是忙碌生活中的美食选择。',
        cuisine: '面馆简餐'
      },
      16: {
        phone: '+49 89 32787345',
        averagePrice: 35,
        rating: 4.8,
        openingHours: '周一至周日 17:00-23:00',
        tags: ['海鲜', '中式', '高档'],
        description: 'Hai Seafood Izakaya提供新鲜的中式海鲜料理，结合日式居酒屋风格，食材新鲜，烹饪精良，环境优雅。',
        cuisine: '中式海鲜'
      },
      17: {
        phone: '+49 89 94318888',
        averagePrice: 15,
        rating: 4.6,
        openingHours: '周一至周日 10:00-22:00',
        tags: ['新疆菜', '面食', '经济实惠'],
        description: 'TAKLAMAKAN提供正宗新疆风味美食，包括各种拉面、烤肉和传统菜肴，口味独特，异域风情浓厚。',
        cuisine: '新疆菜面馆'
      },
      18: {
        phone: '+49 89 18941197',
        averagePrice: 15,
        rating: 4.7,
        openingHours: '周一至周日 11:30-22:00',
        tags: ['台湾菜', '下午茶', '甜点'],
        description: 'ChiaChia\'s Cafe提供地道台湾美食和特色饮品，环境温馨舒适，是品尝台湾小吃和下午茶的理想场所。',
        cuisine: '台湾菜下午茶'
      },
      19: {
        phone: '+49 89 95879333',
        averagePrice: 15,
        rating: 4.5,
        openingHours: '周一至周日 11:00-22:00',
        tags: ['面食', '简餐', '经济实惠'],
        description: 'Chen\'s Nudelbar提供多种中式面食和简餐，口味正宗，食材新鲜，适合快速就餐和日常用餐。',
        cuisine: '面馆简餐'
      },
      20: {
        phone: '无',
        averagePrice: 15,
        rating: 4.4,
        openingHours: '周一至周日 11:00-21:30',
        tags: ['面食', '中餐', '经济实惠'],
        description: 'Qin Cheng以其丰富多样的面食选择而闻名，包括拉面、刀削面等多种传统中式面食，口味正宗，价格实惠。',
        cuisine: '面馆'
      },
    },
    posts: [],
    bgImageUrl: '',
    isLoading: true,
    userInfo: {},
    // 分类相关
    activeCategory: 'all',
    // 评论相关
    commentText: '',
    currentCommentPostId: '',
    // 分页相关
    pageSize: 10,
    page: 0,
    hasMoreData: true,
    isLoadingMore: false,
    totalCount: 0
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
    
    // 先加载用户信息
    this.loadUserInfo();
    
    // 添加一个延迟，确保加载动画能显示一段时间
    setTimeout(() => {
      // 加载帖子数据
      this.loadPosts();
    }, 1500); // 延迟1.5秒加载数据

    // 如果有分享进入的帖子ID
    if (options.post_id) {
      setTimeout(() => {
        this.scrollToPost(options.post_id);
      }, 2000);
    }

    if (options.restaurant) {
      try {
        // 解析传递的餐厅数据
        const restaurantData = JSON.parse(decodeURIComponent(options.restaurant));
        this.loadShopData(restaurantData.id);
      } catch (error) {
        console.error('解析餐厅数据失败:', error);
        wx.showToast({
          title: '加载餐厅信息失败',
          icon: 'none'
        });
      }
    } else {
      wx.showToast({
        title: '未找到餐厅信息',
        icon: 'none'
      });
    }
  },

  loadShopData: function(shopId) {
    const pages = getCurrentPages();
    const indexPage = pages.find(page => page.route === 'pages/index/index');
    
    if (indexPage) {
      const restaurant = indexPage.data.restaurants.find(r => r.id === parseInt(shopId));
      if (restaurant) {
        const details = this.data.restaurantDetails[restaurant.id] || {
          phone: '+49 123 456789',
          averagePrice: 15,
          rating: 4.5,
          openingHours: '周一至周日 11:00-22:00',
          tags: ['中式料理', '经济实惠', '家庭友好'],
          description: '提供正宗的中式美食，环境舒适，服务一流。',
          cuisine: restaurant.cuisine || '中餐'
        };
        
        this.setData({
          shop: {
            id: restaurant.id,
            name: restaurant.name,
            image: restaurant.image,
            address: restaurant.address,
            phone: details.phone,
            averagePrice: details.averagePrice,
            rating: details.rating,
            openingHours: details.openingHours,
            tags: details.tags,
            description: details.description,
            cuisine: details.cuisine || restaurant.cuisine
          }
        });
        return;
      }
    }

    const favorites = wx.getStorageSync('favoriteRestaurants') || [];
    const restaurant = favorites.find(r => r.id === parseInt(shopId));
    if (restaurant) {
      const details = this.data.restaurantDetails[restaurant.id] || {
        phone: '+49 123 456789',
        averagePrice: 15,
        rating: 4.5,
        openingHours: '周一至周日 11:00-22:00',
        tags: ['中式料理', '经济实惠', '家庭友好'],
        description: '提供正宗的中式美食，环境舒适，服务一流。',
        cuisine: restaurant.cuisine || '中餐'
      };
      
      this.setData({
        shop: {
          id: restaurant.id,
          name: restaurant.name,
          image: restaurant.image,
          address: restaurant.address || '慕尼黑市区',
          phone: details.phone,
          averagePrice: details.averagePrice,
          rating: details.rating,
          openingHours: details.openingHours,
          tags: details.tags,
          description: details.description,
          cuisine: details.cuisine || restaurant.cuisine
        }
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
    this.setData({
      page: 0,
      isLoading: true,
      hasMoreData: true
    });
    this.loadPosts();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.hasMoreData && !this.data.isLoadingMore) {
      this.loadMorePosts();
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 点击收藏按钮
  toggleFavorite() {
    const shopId = this.data.shop.id;
    let favorites = wx.getStorageSync('favoriteRestaurants') || [];
    
    const isFavorited = favorites.some(item => item.id === shopId);
    
    if (isFavorited) {
      favorites = favorites.filter(item => item.id !== shopId);
    } else {
      favorites.unshift({
        id: shopId,
        name: this.data.shop.name,
        image: this.data.shop.image,
        address: this.data.shop.address
      });
    }
    
    wx.setStorageSync('favoriteRestaurants', favorites);
    
    wx.showToast({
      title: isFavorited ? '已取消收藏' : '已添加收藏',
      icon: 'success',
      duration: 1500
    });
  },

  callShop: function() {
    if (this.data.shop.phone && this.data.shop.phone !== '无') {
      wx.makePhoneCall({
        phoneNumber: this.data.shop.phone,
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
    const address = this.data.shop.address;
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

  navigateToRestaurant: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  navigateToForum: function() {
    wx.switchTab({
      url: '/pages/friend/friend'
    })
  },

  navigateToExplore: function() {
    wx.switchTab({
      url: '/pages/explore/explore'
    })
  },

  navigateToAccount: function() {
    wx.switchTab({
      url: '/pages/me/me'
    })
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
          title: `${post.username}分享了${post.shopName}，给了${post.rating}星评价！`,
          path: `/pages/explore/explore?post_id=${post._id}`,
          imageUrl: post.images && post.images.length > 0 ? post.images[0] : '../../images/share-image.png'
        };
      }
    }
    
    return {
      title: '美食地图 - 探店日记',
      path: '/pages/explore/explore',
      imageUrl: '../../images/share-image.png'
    };
  },

  // 加载用户信息
  loadUserInfo: function() {
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({ userInfo });
      } else {
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

  // 刷新帖子 (重置分页并加载第一页)
  refreshPosts: function() {
    this.setData({
      page: 0,
      hasMoreData: true,
      posts: []
    });
    this.loadPosts();
  },

  // 加载帖子
  loadPosts: function() {
    // 强制设置加载状态为true
    this.setData({
      isLoading: true
    });
    
    if (this.data.page > 0) {
      this.setData({
        isLoadingMore: true
      });
    }

    const page = this.data.page;
    const pageSize = this.data.pageSize;
    const category = this.data.activeCategory;
    
    let query = explore;
    
    // 应用分类筛选
    if (category !== 'all') {
      query = query.where({
        category: category
      });
    }
    
    // 按时间倒序排列
    query = query.orderBy('createTime', 'desc');
    
    // 分页查询
    query.skip(page * pageSize).limit(pageSize).get().then(res => {
      let newPosts = res.data;
      
      // 处理用户信息和操作标识
      const openid = wx.getStorageSync('openid') || '';
      newPosts = newPosts.map(post => {
        // 临时设置所有帖子都可删除（测试用）
        post.isOwnPost = true;
        
        // 检查是否已点赞
        if (post.likedBy && post.likedBy.includes(openid)) {
          post.isLiked = true;
        }
        
        // 格式化时间
        if (post.createTime) {
          if (typeof post.createTime === 'object' && post.createTime.toDate) {
            const date = post.createTime.toDate();
            post.createTime = this.formatTime(date);
          } else if (typeof post.createTime === 'string') {
            // 时间已经是格式化的字符串
          }
        }
        
        // 初始化评论显示状态
        post.showComments = false;
        
        // 格式化评论时间
        if (post.comments && post.comments.length) {
          post.comments = post.comments.map(comment => {
            if (comment.createTime) {
              if (typeof comment.createTime === 'object' && comment.createTime.toDate) {
                const date = comment.createTime.toDate();
                comment.createTime = this.formatTime(date);
              }
            }
            return comment;
          });
        }
        
        return post;
      });
      
      // 更新数据
      if (page === 0) {
        this.setData({
          posts: newPosts,
          isLoading: false,
          isLoadingMore: false,
          hasMoreData: newPosts.length === pageSize
        });
      } else {
        this.setData({
          posts: [...this.data.posts, ...newPosts],
          isLoading: false,
          isLoadingMore: false,
          hasMoreData: newPosts.length === pageSize
        });
      }
    }).catch(err => {
      console.error('加载帖子失败:', err);
      this.setData({
        isLoading: false,
        isLoadingMore: false
      });
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      });
    });
  },

  // 加载更多帖子
  loadMorePosts: function() {
    if (this.data.isLoadingMore || !this.data.hasMoreData) return;
    
    this.setData({
      page: this.data.page + 1,
      isLoading: true
    });
    
    this.loadPosts();
  },

  // 构建查询过滤条件
  buildQueryFilter: function() {
    const query = {};
    const { activeCategory } = this.data;
    
    // 根据分类筛选
    if (activeCategory && activeCategory !== 'all') {
      query.category = activeCategory;
    }
    
    return query;
  },

  // 切换分类
  switchCategory: function(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      activeCategory: category,
      posts: [],
      page: 0,
      isLoading: true,
      hasMoreData: true
    });
    this.loadPosts();
  },

  // 滚动到指定帖子
  scrollToPost: function(postId) {
    const posts = this.data.posts;
    const index = posts.findIndex(p => p._id === postId);
    
    if (index > -1) {
      // 找到了帖子
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

  // 点赞功能
  onLike: function(e) {
    const id = e.currentTarget.dataset.id;
    const posts = this.data.posts;
    const index = posts.findIndex(post => post._id === id);
    
    if (index === -1) return;
    
    const isLiked = posts[index].isLiked;
    const openid = wx.getStorageSync('openid');
    
    if (!openid) {
      return wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
    }
    
    const post = posts[index];
    
    // 更新本地状态
    posts[index].isLiked = !isLiked;
    posts[index].likes = isLiked ? (post.likes - 1) : (post.likes + 1 || 1);
    
    this.setData({
      posts: posts
    });
    
    // 更新云数据库
    explore.doc(id).update({
      data: {
        likes: isLiked ? _.inc(-1) : _.inc(1),
        likedBy: isLiked ? _.pull(openid) : _.addToSet(openid)
      }
    }).catch(err => {
      console.error('点赞操作失败:', err);
      // 恢复本地状态
      posts[index].isLiked = isLiked;
      posts[index].likes = post.likes;
      this.setData({
        posts: posts
      });
      wx.showToast({
        title: '操作失败，请重试',
        icon: 'none'
      });
    });
  },

  // 切换评论区显示状态
  toggleComments: function(e) {
    const id = e.currentTarget.dataset.id;
    const posts = this.data.posts;
    const index = posts.findIndex(post => post._id === id);
    
    if (index === -1) return;
    
    posts[index].showComments = !posts[index].showComments;
    
    this.setData({
      posts: posts,
      commentText: '',
      currentCommentPostId: posts[index].showComments ? id : ''
    });
  },

  // 监听评论输入
  onCommentInput: function(e) {
    this.setData({
      commentText: e.detail.value,
      currentCommentPostId: e.currentTarget.dataset.id
    });
  },

  // 提交评论
  submitComment: function(e) {
    const id = e.currentTarget.dataset.id;
    const commentText = this.data.commentText.trim();
    
    if (!commentText) {
      return wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      });
    }
    
    const userInfo = wx.getStorageSync('userInfo');
    const openid = wx.getStorageSync('openid');
    
    if (!openid) {
      return wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
    }
    
    // 构建评论对象
    const comment = {
      content: commentText,
      username: userInfo.nickName || '美食探店家',
      _openid: openid,
      createTime: new Date(),
      timestamp: Date.now()
    };
    
    // 更新本地状态
    const posts = this.data.posts;
    const index = posts.findIndex(post => post._id === id);
    
    if (index === -1) return;
    
    // 格式化时间显示
    const displayComment = {
      ...comment,
      createTime: this.formatTime(comment.createTime)
    };
    
    posts[index].comments = posts[index].comments || [];
    posts[index].comments.push(displayComment);
    
    this.setData({
      posts: posts,
      commentText: ''
    });
    
    // 更新云数据库
    explore.doc(id).update({
      data: {
        comments: _.push(comment)
      }
    }).catch(err => {
      console.error('提交评论失败:', err);
      // 恢复本地状态
      posts[index].comments.pop();
      this.setData({
        posts: posts
      });
      wx.showToast({
        title: '评论失败，请重试',
        icon: 'none'
      });
    });
  },

  // 删除帖子
  deletePost: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      content: '确定要删除这条探店记录吗？',
      success: res => {
        if (res.confirm) {
          // 本地先删除
          const posts = this.data.posts.filter(post => post._id !== id);
          this.setData({
            posts: posts
          });
          
          // 然后更新数据库
          explore.doc(id).remove().then(res => {
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            });
          }).catch(err => {
            console.error('删除帖子失败:', err);
            wx.showToast({
              title: '删除失败',
              icon: 'none'
            });
            // 刷新页面，重新获取数据
            this.setData({
              page: 0,
              isLoading: true
            });
            this.loadPosts();
          });
        }
      }
    });
  },

  // 创建探店帖子
  onCreatePost: function() {
    wx.navigateTo({
      url: '/pages/explore/post/post'
    });
  },

  // 预览图片
  previewImage: function(e) {
    const current = e.currentTarget.dataset.current;
    const urls = e.currentTarget.dataset.urls;
    
    wx.previewImage({
      current: current,
      urls: urls
    });
  },

  // 格式化时间
  formatTime: function(date) {
    const now = new Date();
    const diff = (now - date) / 1000; // 秒差
    
    if (diff < 60) {
      return '刚刚';
    } else if (diff < 3600) {
      return Math.floor(diff / 60) + '分钟前';
    } else if (diff < 86400) {
      return Math.floor(diff / 3600) + '小时前';
    } else if (diff < 604800) {
      return Math.floor(diff / 86400) + '天前';
    } else {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
    }
  },
  
  formatNumber: function(n) {
    n = n.toString();
    return n[1] ? n : `0${n}`;
  },

  // 加载背景图片
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
});