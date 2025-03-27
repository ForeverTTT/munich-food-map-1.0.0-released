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
      },
      '21': {
        phone: '+49 89 21345600',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-22:00',
        tags: ['台湾菜', '下午茶', '甜点'],
        description: 'ChiaChia\'s Cafe提供正宗的台湾小吃和甜点，从珍珠奶茶到台式蛋糕，带给您家乡的味道。精致的环境和优质的服务让人流连忘返。',
        cuisine: '台湾菜下午茶',
        transport: {
          subway: 'U4线到Lehel站',
          bus: '132路到Thierschstraße站'
        }
      },
      '22': {
        phone: '+49 89 23467812',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-22:00',
        tags: ['面馆', '简餐', '经济实惠'],
        description: 'Chen\'s Nudelbar是慕尼黑市中心的一家知名亚洲面馆，提供多种风味的亚洲面条，从兰州拉面到日式拉面，种类丰富，价格实惠。',
        cuisine: '面馆简餐'
      },
      '23': {
        phone: '+49 89 34587109',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-21:30',
        tags: ['面馆', '经济实惠', '中式简餐'],
        description: 'Qin Cheng餐厅以其正宗的中式面条和实惠的价格而闻名，每一碗面都散发着浓郁的家乡风味，让您回味无穷。',
        cuisine: '面馆'
      },
      '24': {
        phone: '+49 89 45678023',
        price: 15,
        rating: 4.5,
        hours: '周六 10:30-20:00',
        tags: ['饺子', '点心', '经济实惠'],
        description: 'LeDu Happy Dumplings专注于提供各种风味的手工饺子，从传统猪肉白菜馅到创新口味，每一个饺子都包含着匠心，让您体验地道的中国味道。',
        cuisine: '饺子馆'
      },
      '25': {
        phone: '+49 89 56780910',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-21:30',
        tags: ['川菜', '面馆', '辣味'],
        description: '川味王小面馆提供正宗的四川风味面食，从担担面到麻辣牛肉面，麻辣鲜香，让您体验地道的川式面食文化。',
        cuisine: '川菜面馆'
      },
      '26': {
        phone: '+49 89 67890234',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:00-22:30',
        tags: ['湘菜', '辣味', '家常菜'],
        description: '湘香轩提供正宗的湖南美食，以香辣可口的风味著称，招牌菜包括剁椒鱼头、湖南小炒肉等多种正宗湘菜。',
        cuisine: '湘菜'
      },
      '27': {
        phone: '+49 89 78901345',
        price: 10,
        rating: 4.5,
        hours: '周六 12:00-18:00',
        tags: ['蛋糕', '甜点', '下午茶'],
        description: 'Lui\'s Cake是慕尼黑一家备受欢迎的亚洲风味蛋糕店，提供多种手工制作的甜点和蛋糕，精致美味，是下午茶的理想选择。',
        cuisine: '蛋糕店'
      },
      '28': {
        phone: '+49 89 89012456',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-23:00',
        tags: ['面馆', '经济实惠', '中式简餐'],
        description: '面次郎以其独特的拉面工艺和丰富的配料选择而闻名，每一碗面都经过精心烹制，汤底浓郁，面条筋道，让您体验地道的亚洲面食文化。',
        cuisine: '面馆'
      },
      '29': {
        phone: '+49 89 90123467',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-04:30',
        tags: ['新疆菜', '烤肉', '民族特色'],
        description: 'Kashgar Uyghur Restaurant提供正宗的新疆维吾尔美食，从手抓饭到烤羊肉串，每一道菜都充满了浓郁的西域风情，让您感受丝绸之路的美食文化。',
        cuisine: '新疆菜'
      },
      '30': {
        phone: '+49 89 01234678',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-20:00',
        tags: ['简餐', '经济实惠', '家常菜'],
        description: 'Wais Küche提供多种亚洲风味的简餐，从炒饭到盖浇饭，菜品丰富，价格实惠，是午餐和晚餐的理想选择。',
        cuisine: '简餐'
      },
      '31': {
        phone: '+49 89 12345689',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-21:30',
        tags: ['饺子', '点心', '经济实惠'],
        description: 'LeDu - Happy Dumplings专注于提供各种风味的手工饺子，从传统猪肉白菜馅到创新口味，每一个饺子都包含着匠心，让您体验地道的中国味道。',
        cuisine: '饺子馆'
      },
      '32': {
        phone: '+49 89 23456790',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-22:00',
        tags: ['韩国料理', '烧烤', '经济实惠'],
        description: '老金韩国料理提供正宗的韩式美食，从韩式烤肉到韩式拌饭，每一道菜品都充满了韩国风味，让您尽情享受韩国美食文化。',
        cuisine: '韩餐'
      },
      '33': {
        phone: '+49 89 34567801',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 12:00-22:00',
        tags: ['砂锅', '简餐', '经济实惠'],
        description: '小魚砂鍋以其特色的砂锅菜品而闻名，食材新鲜，汤底鲜美，是寒冷冬日里的一道暖心美食。',
        cuisine: '砂锅简餐'
      },
      '34': {
        phone: '+49 89 45678912',
        price: 15,
        rating: 4.5,
        hours: '周六 12:00-18:00',
        tags: ['抹茶', '蛋糕', '甜点'],
        description: '柒叶 Kencho Matcha是一家专注于抹茶甜品的精品店，提供多种抹茶风味的蛋糕、甜点和饮品，让您体验纯正的抹茶文化。',
        cuisine: '抹茶蛋糕'
      },
      '35': {
        phone: '+49 89 56789023',
        price: 10,
        rating: 4.5,
        hours: '周六 11:00-20:30',
        tags: ['饭团', '简餐', '经济实惠'],
        description: 'BANG以其创意十足的日式饭团而受到欢迎，使用优质米饭和丰富馅料，每一个饭团都是一个小巧的美食杰作。',
        cuisine: '饭团'
      },
      '36': {
        phone: '+49 89 67890134',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-21:30',
        tags: ['包子', '点心', '简餐'],
        description: 'Baoz! Bar以其手工制作的各式包子而闻名，从传统猪肉包到创新口味，每一个包子都是一份用心的作品，是忙碌生活中的美味选择。',
        cuisine: '包子简餐'
      },
      '37': {
        phone: '+49 89 78901245',
        price: 15,
        rating: 4.5,
        hours: '周六 11:30-21:00',
        tags: ['面馆', '简餐', '经济实惠'],
        description: 'Mamma Bao - Adalbertstraße提供多种亚洲风味面食和包子，从拉面到刀削面，每一道菜品都充满了家的味道。',
        cuisine: '面馆简餐'
      },
      '38': {
        phone: '+49 89 89012356',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-21:30',
        tags: ['麻辣烫', '串串香', '经济实惠'],
        description: '杨国福麻辣烫是来自中国的知名连锁麻辣烫品牌，提供多种新鲜食材和特色汤底，让您自由搭配，体验麻辣鲜香的美食享受。',
        cuisine: '麻辣烫'
      },
      '39': {
        phone: '+49 89 90123467',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:30-23:00',
        tags: ['川菜', '特色菜', '中餐'],
        description: 'SEEN RESTAURANT提供创新的现代川菜，将传统川菜与现代烹饪技巧相结合，带来全新的味觉体验，是品尝正宗川菜的理想场所。',
        cuisine: '川菜'
      },
      '40': {
        phone: '+49 89 01234578',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:00-23:00',
        tags: ['中餐馆', '粤菜', '家庭聚餐'],
        description: '福源酒家提供正宗的粤式美食，从烧腊到点心，菜品丰富多样，口味正宗，环境舒适，是家庭聚餐和朋友聚会的理想场所。',
        cuisine: '中餐馆'
      },
      '41': {
        phone: '+49 89 12345689',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-22:00',
        tags: ['包子', '面食', '简餐'],
        description: 'Mamma Bao以其地道的包子和面食而闻名，每一个包子都散发着浓郁的香气，是早餐和午餐的理想选择。',
        cuisine: '包子面馆'
      },
      '42': {
        phone: '+49 89 23456790',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:00-22:30',
        tags: ['中餐馆', '家常菜', '聚餐'],
        description: '鼎尚中餐以其丰富的菜品选择和优质的服务而受到欢迎，从北方面食到南方炒菜，菜系丰富，满足不同口味的需求。',
        cuisine: '中餐馆'
      },
      '43': {
        phone: '+49 89 34567801',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-22:00',
        tags: ['面馆', '拉面', '经济实惠'],
        description: '面太郎专注于提供地道的亚洲面食，从日式拉面到中式刀削面，种类丰富，口味正宗，是面食爱好者的天堂。',
        cuisine: '面馆'
      },
      '44': {
        phone: '+49 89 45678912',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:00-23:00',
        tags: ['中餐馆', '创意菜', '精致料理'],
        description: 'FAN范餐厅以其创新的中式料理和现代化的用餐环境而闻名，将传统中餐与现代烹饪技法相结合，带来全新的味觉体验。',
        cuisine: '中餐馆'
      },
      '45': {
        phone: '+49 89 56789023',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:00-23:00',
        tags: ['台湾菜', '家常菜', '特色小吃'],
        description: '送小厨提供正宗的台湾家常菜和特色小吃，从卤肉饭到三杯鸡，每一道菜品都充满了台湾风味，让您仿佛置身宝岛台湾。',
        cuisine: '台湾菜'
      },
      '47': {
        phone: '+49 89 67890134',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:00-22:00',
        tags: ['川菜', '特色菜', '辣味'],
        description: '你好和合餐厅提供正宗的四川风味菜肴，以其麻辣鲜香的特色和丰富的菜品选择而受到欢迎，是品尝地道川菜的理想场所。',
        cuisine: '川菜'
      },
      '48': {
        phone: '+49 89 78901245',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:00-22:30',
        tags: ['粤菜', '海鲜', '点心'],
        description: '老香港餐馆提供正宗的粤式美食，从烧腊到点心，从海鲜到家常菜，菜品种类丰富，口味地道，让您感受香港美食文化的魅力。',
        cuisine: '粤菜'
      },
      '49': {
        phone: '+49 89 89012356',
        price: 10,
        rating: 4.5,
        hours: '周一至周日 12:00-22:00',
        tags: ['奶茶', '蛋糕', '甜点'],
        description: '乐茶是一家专注于提供优质奶茶和甜点的店铺，从珍珠奶茶到各种口味的蛋糕，满足您对甜品的所有想象。',
        cuisine: '奶茶蛋糕'
      },
      '50': {
        phone: '+49 89 90123467',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:00-22:00',
        tags: ['拉面', '面馆', '经济实惠'],
        description: '面四郎专注于提供正宗的日式拉面和各种亚洲面食，汤底浓郁，面条筋道，配料丰富，带给您地道的亚洲面食体验。',
        cuisine: '拉面馆'
      },
      '51': {
        phone: '+49 89 01234578',
        price: 10,
        rating: 4.5,
        hours: '周一至周日 11:00-22:00',
        tags: ['奶茶', '甜点', '休闲饮品'],
        description: '茶艺 Chayee Munich是一家致力于推广中国茶文化的奶茶店，提供各种创意茶饮和传统茶饮，让您体验中国茶文化的魅力。',
        cuisine: '奶茶店'
      },
      '52': {
        phone: '+49 15209183811',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 00:00-23:59',
        tags: ['新疆菜', '烤肉', '手抓饭'],
        description: '丝路风味 KEBUP 22提供正宗的新疆美食和中亚风味，从烤羊肉串到手抓饭，每一道菜品都能让您感受到丝绸之路的美食文化。',
        cuisine: '新疆菜'
      },
      '53': {
        phone: '+49 89 89839766',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:30-22:30',
        tags: ['云南菜', '特色菜', '民族风味'],
        description: '悦满楼专注于提供正宗的云南风味美食，从过桥米线到汽锅鸡，带您领略云南多元化的美食文化和独特的味道。',
        cuisine: '云南菜'
      },
      '54': {
        phone: '+49 8921949970',
        price: 50,
        rating: 4.5,
        hours: '周二至周日 18:00-23:00',
        tags: ['中餐馆', '高档餐厅', '商务宴请'],
        description: '老金中餐馆是慕尼黑一家高档中餐厅，提供精致的中式料理和优质的服务，环境雅致，是商务宴请和特殊场合的理想选择。',
        cuisine: '中餐馆'
      },
      '55': {
        phone: '+49 8924211197',
        price: 25,
        rating: 4.5,
        hours: '周一至周六 11:00-22:30',
        tags: ['中餐馆', '家常菜', '聚餐'],
        description: '小梅中餐馆 Mai Garten提供多种风味的中式美食，从北方面食到南方炒菜，菜品种类丰富，口味正宗，环境舒适，是家庭聚餐的理想场所。',
        cuisine: '中餐馆'
      },
      '56': {
        phone: '+49 8937779637',
        price: 25,
        rating: 4.5,
        hours: '周一至周日 11:30-22:30',
        tags: ['中餐馆', '精致料理', '创意菜'],
        description: '匠心餐厅以其精湛的烹饪技艺和创新的菜品设计而闻名，将传统中餐与现代元素相结合，带来全新的味觉体验。',
        cuisine: '中餐馆'
      },
      '57': {
        phone: '+49 8937002758',
        price: 30,
        rating: 4.5,
        hours: '周一至周日 11:30-22:30',
        tags: ['火锅', '川菜', '麻辣'],
        description: '川流 Spicy Temptation以其正宗的四川火锅而闻名，汤底麻辣鲜香，食材新鲜丰富，让您体验地道的川式火锅文化。',
        cuisine: '火锅'
      },
      '58': {
        phone: '无',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-22:30',
        tags: ['面馆', '拉面', '经济实惠'],
        description: '面客专注于提供各种风味的亚洲面条，从兰州拉面到担担面，每一碗面都充满了独特的风味，是面食爱好者的天堂。',
        cuisine: '面馆'
      },
      '59': {
        phone: '无',
        price: 15,
        rating: 4.5,
        hours: '周一至周日 11:30-22:30',
        tags: ['面馆', '简餐', '经济实惠'],
        description: '饺子吧专注于提供各种风味的饺子面条，每一碗面都充满了独特的风味，是面食爱好者的天堂。',
        cuisine: '面馆简餐'
      },
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
    
    // 先设置默认图片
    if (!shopData.imageUrl || shopData.imageUrl.indexOf('cloud://') !== -1) {
      shopData.imageUrl = '/images/logo.png'; // 默认图片
    }
    
    let imageSet = false;
    
    // 1. 通过ID直接匹配
    if (shopData.id && idToImage[shopData.id]) {
      shopData.imageUrl = idToImage[shopData.id];
      imageSet = true;
    }
    
    // 2. 通过餐厅名称匹配
    if (!imageSet) {
      if (shopData.name === 'Baoz! Bar' || shopData.name.includes('北自拍')) {
        shopData.imageUrl = imageUrls.bzb;
        imageSet = true;
      } else if (shopData.name === 'BANG' || shopData.name.includes('帮锅')) {
        shopData.imageUrl = imageUrls.bang;
        imageSet = true;
      } else if (shopData.name && shopData.name.includes('丝路风味')) {
        shopData.imageUrl = imageUrls.slfw;
        imageSet = true;
      } else if (shopData.name && shopData.name.includes('悦满楼')) {
        shopData.imageUrl = imageUrls.yml;
        imageSet = true;
      } else if (shopData.name && shopData.name.includes('匠心')) {
        shopData.imageUrl = imageUrls.jx;
        imageSet = true;
      } else if (shopData.name && shopData.name.includes('小梅')) {
        shopData.imageUrl = imageUrls.xm;
        imageSet = true;
      } else if (shopData.name && shopData.name.includes('马克思')) {
        shopData.imageUrl = imageUrls.max;
        imageSet = true;
      } else if (shopData.name && shopData.name.includes('面三郎')) {
        shopData.imageUrl = imageUrls.m3l;
        imageSet = true;
      } else if (shopData.name && shopData.name.includes('湘聚')) {
        shopData.imageUrl = imageUrls.xiangj;
        imageSet = true;
      }
    }
    
    // 3. 尝试从imageID或cloudImageId中提取文件名
    if (!imageSet) {
      if (shopData.imageID) {
        const filename = shopData.imageID.split('/').pop().split('.')[0];
        if (imageUrls[filename]) {
          shopData.imageUrl = imageUrls[filename];
          imageSet = true;
        }
      }
      
      if (!imageSet && shopData.cloudImageId) {
        const filename = shopData.cloudImageId.split('/').pop().split('.')[0];
        if (imageUrls[filename]) {
          shopData.imageUrl = imageUrls[filename];
          imageSet = true;
        }
      }
    }
    
    // 更新shopData的imageUrl
    this.setData({
      'shopData.imageUrl': shopData.imageUrl
    });
    
    console.log('餐厅图片已设置为:', shopData.imageUrl);
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
    // 直接使用外部URL
    this.setData({
      bgImageUrl: 'https://i.ibb.co/Nd8MFZw7/bgimage.png'
    });
  },

  onImageError: function(e) {
    console.error('餐厅图片加载失败，使用默认图片');
    this.setData({
      'shopData.imageUrl': '/images/logo.png'
    });
  }
})