// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    bgImageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/bgimage.png',
    bgImageUrl: '',
    emptyImageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/empty.svg',
    emptyImageUrl: '',
    restaurants: [
      {
        id: 1,
        name: '麻辣烫 Gululu',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/gll.png',
        image: '',
        favorite: false,
        address: 'Helene-Mayer-Ring 15, 80809 München',
        cuisine: '麻辣烫',
        price: '10-20€',
        hours: '周三至周一 11:30-21:30,周二休息',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/gululu.jpg',
        letter: 'G'
      },
      {
        id: 2,
        name: '张亮麻辣烫',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/zl.png',
        image: '',
        favorite: false,
        address: 'Pasinger Bahnhofsplatz 1, UG neben Aldi Markt, 81241 München',
        cuisine: '麻辣烫',
        price: '10-20€',
        hours: '周一至周六 9:30-20:00，周日休息',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/zhangliang.jpg',
        letter: 'Z'
      },
      {
        id: 3,
        name: '你好 成都',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/nhhh.png',
        image: '',
        favorite: false,
        address: 'Pasinger Bahnhofspl. 2, 81241 München',
        cuisine: '川菜',
        price: '10-20€',
        hours: '周一至周日 11:30-21:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/chengdu.jpg',
        letter: 'N'
      },
      {
        id: 4,
        name: '唐人街',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/trj.png',
        image: '',
        favorite: false,
        address: 'Pasinger Bahnhofspl. 3, 81241 München',
        cuisine: '中餐馆',
        price: '10-20€',
        hours: '周一至周日 11:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/tangrenjie.jpg',
        letter: 'T'
      },
      {
        id: 5,
        name: 'Chagiya Asia Tischgrill',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/chagiya.png',
        image: '',
        favorite: false,
        address: 'Camerloherstraße 67, 80689 München',
        cuisine: '烧烤店',
        price: '40-50€',
        hours: '周一至周五 17:30-23:00, 周六周日12:00-15:00, 17:30-23:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/chagiya.jpg',
        letter: 'C'
      },
      {
        id: 6,
        name: '宴遇中餐馆',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/yanyu.png',
        image: '',
        favorite: false,
        address: 'Albert-Roßhaupter-Straße 13, 81369 München',
        cuisine: '中餐馆',
        price: '10-20€',
        hours: '周一至周四 17:00-22:30, 周五至周日11:30-15:00, 17:00-22:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/yanyu.jpg',
        letter: 'Y'
      },
      {
        id: 7,
        name: '古蜀火锅',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/gshg.png',
        image: '',
        favorite: false,
        address: 'Züricher Str. 35, 81476 München',
        cuisine: '火锅',
        price: '10-30€',
        hours: '周二至周日 11:30-15:00，17:30-23:00，周一休息',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/gshg.jpg',
        letter: 'G'
      },
      {
        id: 8,
        name: '零点火锅',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/ldhg.png',
        image: '',
        favorite: false,
        address: 'Boschetsrieder Str. 47, 81379 München',
        cuisine: '火锅',
        price: '20-30€',
        hours: '周一至周日 17:00-23:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/ldhg.jpg',
        letter: 'L'
      },
      {
        id: 9,
        name: 'Mian Noodles',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/mian.png',
        image: '',
        favorite: false,
        address: 'Brudermühlstraße 25, 81371 München',
        cuisine: '面馆',
        price: '10-20€',
        hours: '周一至周日 12:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/mian.jpg',
        letter: 'M'
      },
      {
        id: 10,
        name: '麻辣煮義',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/mlzy.png',
        image: '',
        favorite: false,
        address: 'Poccistraße 2, 80336 München',
        cuisine: '干锅麻辣烫',
        price: '10-20€',
        hours: '周一至周日 12:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/mlzy.jpg',
        letter: 'M'
      },
      {
        id: 11,
        name: 'Chois中国的味道火锅店',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/chois.png',
        image: '',
        favorite: false,
        address: 'Tumblingerstraße 36, 80337 München',
        cuisine: '火锅',
        price: '40-50€',
        hours: '周一至周日 17:00-23:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/chois.jpg',
        letter: 'C'
      },
      {
        id: 12,
        name: '天山维吾尔餐馆',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/ts.png',
        image: '',
        favorite: false,
        address: 'Häberlstraße 1, 80337 München',
        cuisine: '新疆菜',
        price: '10-20€',
        hours: '周一至周日 12:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/ts.jpg',
        letter: 'T'
      },
      {
        id: 13,
        name: '马克思牛肉拉面',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/max.png',
        image: '',
        favorite: false,
        address: 'Sendlinger-Tor-Platz 10, 80336 München',
        cuisine: '拉面',
        price: '10-20€',
        hours: '周一至周日 11:30-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/max.jpg',
        letter: 'M'
      },
      {
        id: 14,
        name: '湘聚',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/xiangj.png',
        image: '',
        favorite: false,
        address: 'Metzstraße 8, 81667 München',
        cuisine: '湘菜',
        price: '20-30€',
        hours: '周一至周日 11:30-22:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/xiangj.jpg',
        letter: 'X'
      },
      {
        id: 15,
        name: 'Song\'s Kitchen',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/sxc.png',
        image: '',
        favorite: false,
        address: 'Rosenheimer Str. 67, 81667 München',
        cuisine: '台湾菜',
        price: '10-20€',
        hours: '周一至周日 11:00-21:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/sxc.jpg',
        letter: 'S'
      },
      {
        id: 16,
        name: '面三郎',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/m3l.png',
        image: '',
        favorite: false,
        address: 'Rosenheimer Str. 46, 81669 München',
        cuisine: '面馆简餐',
        price: '10-20€',
        hours: '周一至周日 11:30-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/m3l.jpg',
        letter: 'M'
      },
      {
        id: 17,
        name: '一大碗',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/ydw.png',
        image: '',
        favorite: false,
        address: 'Rosenheimer Str. 36, 81669 München',
        cuisine: '面馆简餐',
        price: '10-20€',
        hours: '周一至周日 11:30-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/ydw.jpg',
        letter: 'Y'
      },
      {
        id: 18,
        name: 'Hai Seafood Izakaya',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/hai.png',
        image: '',
        favorite: false,
        address: 'Kellerstraße 29, 81667 München',
        cuisine: '中式海鲜',
        price: '30-40€',
        hours: '周一至周日 17:00-23:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/hai.jpg',
        letter: 'H'
      },
      {
        id: 19,
        name: 'TAKLAMAKAN',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/tklmg.png',
        image: '',
        favorite: false,
        address: 'Willy-Brandt-Platz 5, 81829 München',
        cuisine: '新疆菜面馆',
        price: '10-20€',
        hours: '周一至周日 10:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/tklmg.jpg',
        letter: 'T'
      },
      {
        id: 20,
        name: 'Jiao Kitchen 千椒百冒',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/qjbm.png',
        image: '',
        favorite: false,
        address: 'Arabellastraße 19, 81925 München',
        cuisine: '冒菜川菜',
        price: '20-30€',
        hours: '周一至周日 11:30-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/qjbm.jpg',
        letter: 'Q'
      },
      {
        id: 21,
        name: 'ChiaChia\'s Cafe',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/chiachia.png',
        image: '',
        favorite: false,
        address: 'Thierschstraße 7, 80538 München',
        cuisine: '台湾菜下午茶',
        price: '10-20€',
        hours: '周一至周日 11:30-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/chiachia.jpg',
        letter: 'C'
      },
      {
        id: 22,
        name: 'Chen\'s Nudelbar',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/chen.png',
        image: '',
        favorite: false,
        address: 'Kaufingerstraße 1, 80331 München',
        cuisine: '面馆简餐',
        price: '10-20€',
        hours: '周一至周日 11:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/chen.jpg',
        letter: 'C'
      },
      {
        id: 23,
        name: 'Qin Cheng',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/qc.png',
        image: '',
        favorite: false,
        address: 'Herzog-Wilhelm-Straße 7, 80331 München',
        cuisine: '面馆',
        price: '10-20€',
        hours: '周一至周日 11:00-21:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/qc.jpg',
        letter: 'Q'
      },
      {
        id: 24,
        name: 'LeDu Happy Dumplings',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/ld.png',
        image: '',
        favorite: false,
        address: 'Stachus Passagen, Untergeschoss, Karlsplatz 1, 80331 München',
        cuisine: '饺子馆',
        price: '10-20€',
        hours: '周六 10:30-20:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/ld.jpg',
        letter: 'L'
      },
      {
        id: 25,
        name: '川味王小面馆',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/cww.png',
        image: '',
        favorite: false,
        address: 'Schillerstraße 14, 80336 München',
        cuisine: '川菜面馆',
        price: '10-20€',
        hours: '周一至周日 11:00-21:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/cww.jpg',
        letter: 'C'
      },
      {
        id: 26,
        name: '湘香轩',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/xxx.png',
        image: '',
        favorite: false,
        address: 'Alter Messepl. 4, 80339 München',
        cuisine: '湘菜',
        price: '20-30€',
        hours: '周一至周日 11:00-22:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/xxx.jpg',
        letter: 'X'
      },
      {
        id: 27,
        name: 'Lui\'s Cake',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/luis.png',
        image: '',
        favorite: false,
        address: 'Landsberger Str. 131, 80339 München',
        cuisine: '蛋糕店',
        price: '1-10€',
        hours: '周六 12:00-18:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/luis.jpg',
        letter: 'L'
      },
      {
        id: 28,
        name: '面次郎',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/m2l.png',
        image: '',
        favorite: false,
        address: 'Prielmayerstraße 3, 80335 München',
        cuisine: '面馆',
        price: '10-20€',
        hours: '周一至周日 11:30-23:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/m2l.jpg',
        letter: 'M'
      },
      {
        id: 29,
        name: 'Kashgar Uyghur Restaurant',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/ks.png',
        image: '',
        favorite: false,
        address: 'Dachauer Str. 4, 80335 München',
        cuisine: '新疆菜',
        price: '10-20€',
        hours: '周一至周日 11:00-04:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/ks.jpg',
        letter: 'K'
      },
      {
        id: 30,
        name: 'Wais Küche',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/wai.png',
        image: '',
        favorite: false,
        address: 'Prinz-Ludwig-Straße 6, 80333 München',
        cuisine: '简餐',
        price: '10-20€',
        hours: '周一至周日 11:30-20:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/wai.jpg',
        letter: 'W'
      },
      {
        id: 31,
        name: 'LeDu - Happy Dumplings',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/ld2.png',
        image: '',
        favorite: false,
        address: 'Theresienstraße 18, 80333 München',
        cuisine: '饺子馆',
        price: '10-20€',
        hours: '周一至周日 11:00-21:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/ld2.jpg',
        letter: 'L'
      },
      {
        id: 32,
        name: '老金韩国料理',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/kim.png',
        image: '',
        favorite: false,
        address: 'Theresienstraße 138, 80333 München',
        cuisine: '韩餐',
        price: '10-20€',
        hours: '周一至周日 11:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/kim.jpg',
        letter: 'K'
      },
      {
        id: 33,
        name: '小魚砂鍋 Brutzeln & Blubbern',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/xysg.png',
        image: '',
        favorite: false,
        address: 'Amalienstraße 39, 80799 München',
        cuisine: '砂锅简餐',
        price: '10-20€',
        hours: '周一至周日 12:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/xysg.jpg',
        letter: 'X'
      },
      {
        id: 34,
        name: '柒叶 Kencho Matcha',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/qy.png',
        image: '',
        favorite: false,
        address: 'Schellingstraße 15, 80799 München',
        cuisine: '抹茶蛋糕',
        price: '10-20€',
        hours: '周六 12:00-18:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/qy.jpg',
        letter: 'Q'
      },
      {
        id: 35,
        name: 'BANG',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/bang.png',
        image: '',
        favorite: false,
        address: 'Türkenstraße 47, 80799 München',
        cuisine: '饭团',
        price: '1-10€',
        hours: '周六 11:00-20:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/bang.jpg',
        letter: 'B'
      },
      {
        id: 36,
        name: 'Baoz! Bar',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/bzb.png',
        image: '',
        favorite: false,
        address: 'Türkenstraße 60, 80799 München',
        cuisine: '包子简餐',
        price: '10-20€',
        hours: '周一至周日 11:00-21:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/bzb.jpg',
        letter: 'B'
      },
      {
        id: 37,
        name: 'Mamma Bao - Adalbertstraße',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/mmb1.png',
        image: '',
        favorite: false,
        address: 'Adalbertstraße 8, 80799 München',
        cuisine: '面馆简餐',
        price: '10-20€',
        hours: '周六 11:30-21:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/mmb1.jpg',
        letter: 'M'
      },
      {
        id: 38,
        name: '杨国福麻辣烫 YGF',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/ygf.png',
        image: '',
        favorite: false,
        address: 'Türkenstraße 69, 80799 München',
        cuisine: '麻辣烫',
        price: '10-20€',
        hours: '周一至周日 11:00-21:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/ygf.jpg',
        letter: 'Y'
      },
      {
        id: 39,
        name: 'SEEN RESTAURANT',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/sen.png',
        image: '',
        favorite: false,
        address: 'Augustenstraße 7, 80333 München',
        cuisine: '川菜',
        price: '20-30€',
        hours: '周一至周日 11:30-23:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/sen.jpg',
        letter: 'S'
      },
      {
        id: 40,
        name: '福源酒家',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/fy.png',
        image: '',
        favorite: false,
        address: 'Augustenstraße 21, 80333 München',
        cuisine: '中餐馆',
        price: '20-30€',
        hours: '周一至周日 11:00-23:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/fy.jpg',
        letter: 'F'
      },
      {
        id: 41,
        name: 'Mamma Bao',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/mmb2.png',
        image: '',
        favorite: false,
        address: 'Augustenstraße 31, 80333 München',
        cuisine: '包子面馆',
        price: '10-20€',
        hours: '周一至周日 11:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/mmb2.jpg',
        letter: 'M'
      },
      {
        id: 42,
        name: '鼎尚中餐',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/ds.png',
        image: '',
        favorite: false,
        address: 'Franziskanerstraße 19, 81669 München',
        cuisine: '中餐馆',
        price: '20-30€',
        hours: '周一至周日 11:00-22:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/ds.jpg',
        letter: 'D'
      },
      {
        id: 43,
        name: '面太郎',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/m1l.png',
        image: '',
        favorite: false,
        address: 'Augustenstraße 92-94, 80798 München',
        cuisine: '面馆',
        price: '10-20€',
        hours: '周一至周日 11:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/m1l.jpg',
        letter: 'M'
      },
      {
        id: 44,
        name: 'FAN范',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/fan.png',
        image: '',
        favorite: false,
        address: 'Augustenstraße 56 Erdgeschoss, 80333 München',
        cuisine: '中餐馆',
        price: '20-30€',
        hours: '周一至周日 11:00-23:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/fan.jpg',
        letter: 'F'
      },
      {
        id: 45,
        name: '送小厨',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/sxc.png',
        image: '',
        favorite: false,
        address: 'Schleißheimer Str. 5, 80333 München',
        cuisine: '台湾菜',
        price: '20-30€',
        hours: '周一至周日 11:00-23:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/sxc.jpg',
        letter: 'S'
      },
      {
        id: 46,
        name: '悠游之 Restaurant Le Voyage',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/yyz.png',
        image: '',
        favorite: false,
        address: 'Fallmerayerstraße 16, 80796 München',
        cuisine: '中餐馆',
        price: '30-40€',
        hours: '周一至周日 11:00-23:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/yyz.jpg',
        letter: 'Y'
      },
      {
        id: 47,
        name: '你好和合',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/nhhh.png',
        image: '',
        favorite: false,
        address: 'Mittenheimer Str. 52, 85764 Oberschleißheim',
        cuisine: '川菜',
        price: '20-30€',
        hours: '周一至周日 11:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/nhhh.jpg',
        letter: 'N'
      },
      {
        id: 48,
        name: '老香港',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/lxg.png',
        image: '',
        favorite: false,
        address: 'Allacher Str. 12, 85757 Karlsfeld',
        cuisine: '粤菜',
        price: '20-30€',
        hours: '周一至周日 11:00-22:30',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/lxg.jpg',
        letter: 'L'
      },
      {
        id: 49,
        name: '乐茶',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/lc.png',
        image: '',
        favorite: false,
        address: 'Herzogstraße 1A, 80803 München',
        cuisine: '奶茶蛋糕',
        price: '5-15€',
        hours: '周一至周日 12:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/lc.jpg',
        letter: 'L'
      },
      {
        id: 50,
        name: '面四郎',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/m4l.png',
        image: '',
        favorite: false,
        address: 'Leopoldstraße 41, 80802 München',
        cuisine: '拉面馆',
        price: '10-20€',
        hours: '周一至周日 11:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/m4l.jpg',
        letter: 'M'
      },
      {
        id: 51,
        name: '茶艺 Chayee Munich',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/cy.png',
        image: '',
        favorite: false,
        address: 'Leopoldstraße 48, 80802 München',
        cuisine: '奶茶店',
        price: '5-15€',
        hours: '周一至周日 11:00-22:00',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/cy.jpg',
        letter: 'C'
      },
      {
        id: 52,
        name: '丝路风味 KEBUP 22',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/slfw.png',
        image: '',
        favorite: false,
        address: 'Hohenzollernstraße 22, 80801 München',
        cuisine: '新疆菜',
        price: '10-20€',
        hours: '周一至周日 00:00-23:59',
        phone: '+49 15209183811',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/sl.jpg',
        letter: 'S'
      },
      {
        id: 53,
        name: '悦满楼',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/yml.png',
        image: '',
        favorite: false,
        address: 'Ehrwalder Str. 77, 81377 München',
        cuisine: '云南菜',
        price: '20-30€',
        hours: '周一至周日 11:30-22:30',
        phone: '+49 89 89839766',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/yml.jpg',
        letter: 'Y'
      },
      {
        id: 54,
        name: '老金中餐馆',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/lj.png',
        image: '',
        favorite: false,
        address: 'Kanalstraße 14, 80538 München',
        cuisine: '中餐馆',
        price: '50€',
        hours: '周二至周日 18:00-23:00',
        phone: '+49 8921949970',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/lj.jpg',
        letter: 'L'
      },
      {
        id: 55,
        name: '小梅中餐馆 Mai Garten',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/xm.png',
        image: '',
        favorite: false,
        address: 'Buttermelcherstraße 5, 80469 München',
        cuisine: '中餐馆',
        price: '20-30€',
        hours: '周一至周六 11:00-22:30',
        phone: '+49 8924211197',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/xm.jpg',
        letter: 'X'
      },
      {
        id: 56,
        name: '匠心',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/jx.png',
        image: '',
        favorite: false,
        address: 'Nymphenburger Str. 98, 80636 München',
        cuisine: '中餐馆',
        price: '20-30€',
        hours: '周一至周日 11:30-22:30',
        phone: '+49 8937779637',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/jx.jpg',
        letter: 'J'
      },
      {
        id: 57,
        name: '川流 Spicy Temptation',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/cl.png',
        image: '',
        favorite: false,
        address: 'Ungererstraße 56, 80805 München',
        cuisine: '火锅',
        price: '30-40€',
        hours: '周一至周日 11:30-22:30',
        phone: '+49 8937002758',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/cl.png',
        letter: 'C'
      },
      {
        id: 58,
        name: '面客',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/mk.png',
        image: '',
        favorite: false,
        address: 'Augustenstraße 58, 80333 München',
        cuisine: '面馆',
        price: '10-20€',
        hours: '周一至周日 11:30-22:30',
        phone: '无',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/mk.png',
        letter: 'M'
      },
      {
        id: 59,
        name: '饺子吧 Gyoza bar',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/jzb.png',
        image: '',
        favorite: false,
        address: 'Augustenstraße 47, 80333 München',
        cuisine: '面馆简餐',
        price: '10-20€',
        hours: '周一至周日 11:30-22:30',
        phone: '无',
        cloudImageId: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/jzb.png',
        letter: 'J'
      },
      {
        id: 60,
        name: '小米粒',
        imageID: 'xml.png', 
        image: 'https://i.ibb.co/5XxwDyMY/xml.png',
        favorite: false,
        address: 'Luisenstraße 55, 80333 München',
        cuisine: '简餐熟食',
        price: '10-20€',
        hours: '周一至周日 11:30-22:30',
        phone: '无',
        cloudImageId: 'xml.png',
        letter: 'X'
      },
      {
        id: 61,
        name: '聚宝楼',
        imageID: 'cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/jbl.png',
        image: '',
        favorite: false,
        address: 'Münchener Freiheit 6, 80802 München',
        cuisine: '川菜',
        price: '25-35€',
        hours: '周一至周日 11:30-22:30',
        cloudImageId: 'https://i.ibb.co/9HvskM8W/jbl.png',
        letter: 'J'
      },
    ],
    filteredRestaurants: [],
    currentFilter: '全部',
    searchText: '',
    letterList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'],
    scrollIntoView: '',
    currentLetter: '',
    restaurantsByLetter: {},
    showLetterMenu: false
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onLoad() {
    this.loadBgImage();
    this.loadEmptyImage();
    this.initCloudEnv();
    
    // 加载餐厅收藏状态
    this.loadFavoriteStatus();
    
    // 加载餐厅图片
    this.loadRestaurantImages();
    
    // 按拼音首字母对餐厅进行分组
    this.sortRestaurantsByPinyin();
    
    // 存储所有餐厅数据到本地存储
    wx.setStorageSync('allRestaurants', this.data.restaurants);
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow() {
    this.loadFavoriteStatus();
    this.applyFilters();
    
    // 确保餐厅数据在本地存储中是最新的
    wx.setStorageSync('allRestaurants', this.data.restaurants);
  },
  sortRestaurantsByPinyin: function() {
    const restaurants = this.data.restaurants;
    
    restaurants.sort((a, b) => {
      const nameA = a.name.trim();
      const nameB = b.name.trim();
      
      const letterA = this.getFirstLetter(nameA);
      const letterB = this.getFirstLetter(nameB);
      
      return letterA.localeCompare(letterB);
    });
    
    const restaurantsByLetter = this.groupRestaurantsByLetter(restaurants);
    
    this.setData({
      restaurants: restaurants,
      filteredRestaurants: restaurants,
      restaurantsByLetter: restaurantsByLetter
    });
  },
  getFirstLetter: function(name) {
    const firstChar = name.charAt(0);
    
    if (/[a-zA-Z]/.test(firstChar)) {
      return firstChar.toUpperCase();
    }
    
    const pinyinMap = {
      '阿': 'A', '安': 'A', '奥': 'A',
      '巴': 'B', '白': 'B', '百': 'B', '北': 'B', '包': 'B',
      '餐': 'C', '茶': 'C', '川': 'C', '陈': 'C', '柒': 'Q',
      '大': 'D', '东': 'D', '都': 'D', '鼎': 'D',
      '饿': 'E', '二': 'E',
      '方': 'F', '肥': 'F', '福': 'F', '范': 'F',
      '高': 'G', '古': 'G', '广': 'G', '国': 'G',
      '海': 'H', '好': 'H', '汉': 'H', '湖': 'H', '悠': 'Y',
      '家': 'J', '江': 'J', '津': 'J', '京': 'J', '鸡': 'J', '匠': 'J', '饺': 'J','聚': 'J',
      '开': 'K', '康': 'K', '烤': 'K',
      '老': 'L', '乐': 'L', '里': 'L', '辣': 'L', '零': 'L', '鹿': 'L',
      '麻': 'M', '美': 'M', '面': 'M', '马': 'M', '慢': 'M',
      '南': 'N', '宁': 'N', '牛': 'N', '你': 'N',
      '欧': 'O',
      '朋': 'P', '平': 'P',
      '七': 'Q', '强': 'Q', '青': 'Q', '千': 'Q',
      '日': 'R', '人': 'R',
      '三': 'S', '山': 'S', '上': 'S', '深': 'S', '水': 'S', '四': 'S', '送': 'S', '丝': 'S',
      '太': 'T', '汤': 'T', '天': 'T', '甜': 'T', '唐': 'T',
      '西': 'X', '湘': 'X', '小': 'X', '鲜': 'X', '香': 'X',
      '洋': 'Y', '一': 'Y', '宴': 'Y', '杨': 'Y', '游': 'Y', '悦': 'Y',
      '粥': 'Z', '中': 'Z', '张': 'Z', '珠': 'Z', '竹': 'Z', '鼎': 'D'
    };
    
    const letter = pinyinMap[firstChar];
    return letter ? letter : '#';
  },
  groupRestaurantsByLetter: function(restaurants) {
    const groups = {};
    
    this.data.letterList.forEach(letter => {
      groups[letter] = [];
    });
    
    restaurants.forEach(restaurant => {
      const letter = this.getFirstLetter(restaurant.name);
      if (groups[letter]) {
        groups[letter].push(restaurant);
      } else {
        groups['#'].push(restaurant);
      }
    });
    
    return groups;
  },
  onLetterTap: function(e) {
    const letter = e.currentTarget.dataset.letter;
    this.setData({
      scrollIntoView: `letter-${letter}`,
      currentLetter: letter,
      showLetterMenu: false
    });
    
    setTimeout(() => {
      this.setData({
        currentLetter: ''
      });
    }, 3000);
  },
  loadFavorites: function() {
    const favorites = wx.getStorageSync('favoriteRestaurants') || [];
    const favoriteIds = favorites.map(item => item.id);
    
    const updatedRestaurants = this.data.restaurants.map(restaurant => ({
      ...restaurant,
      favorite: favoriteIds.includes(restaurant.id)
    }));

    this.setData({
      restaurants: updatedRestaurants
    });
    
    this.applyFilters();
  },
  onSearchInput: function(e) {
    this.setData({
      searchText: e.detail.value
    });
    this.applyFilters();
  },
  clearSearch: function() {
    this.setData({
      searchText: ''
    });
    this.applyFilters();
  },
  applyFilters: function() {
    const { restaurants, currentFilter, searchText } = this.data;
    
    let filteredList = restaurants;
    
    if (currentFilter !== '全部') {
      filteredList = filteredList.filter(restaurant => 
        restaurant.cuisine && restaurant.cuisine.includes(currentFilter)
      );
    }
    
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filteredList = filteredList.filter(restaurant => 
        restaurant.name.toLowerCase().includes(lowerSearchText) || 
        (restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(lowerSearchText)) ||
        (restaurant.address && restaurant.address.toLowerCase().includes(lowerSearchText))
      );
    }
    
    const restaurantsByLetter = this.groupRestaurantsByLetter(filteredList);
    
    this.setData({
      filteredRestaurants: filteredList,
      restaurantsByLetter: restaurantsByLetter
    });
  },
  toggleFavorite: function(e) {
    // 注意：已改用catchtap，这里不需要stopPropagation
    // e.stopPropagation();
    
    const restaurantId = e.currentTarget.dataset.id;
    console.log('列表页切换收藏状态 restaurantId:', restaurantId);
    
    const restaurants = this.data.restaurants;
    const restaurant = restaurants.find(r => String(r.id) === String(restaurantId));

    if (!restaurant) {
      console.log('未找到对应餐厅');
      return;
    }

    // 先立即更新收藏状态，确保UI立即响应
    const newFavoriteStatus = !restaurant.favorite;
    restaurant.favorite = newFavoriteStatus;
    
    // 立即更新视图
    this.setData({ 
      restaurants: restaurants 
    });
    
    // 然后异步处理存储和其他操作
    setTimeout(() => {
      let favorites = wx.getStorageSync('favoriteRestaurants') || [];
      
      if (!newFavoriteStatus) {
        favorites = favorites.filter(item => String(item.id) !== String(restaurantId));
      } else {
        favorites.push({
          id: restaurant.id,
          name: restaurant.name,
          image: restaurant.image,
          imageID: restaurant.imageID,
          cloudImageId: restaurant.cloudImageId,
          address: restaurant.address,
          cuisine: restaurant.cuisine,
          price: restaurant.price,
          hours: restaurant.hours,
          letter: restaurant.letter
        });
      }
      
      wx.setStorageSync('favoriteRestaurants', favorites);
      console.log('收藏状态已更新:', newFavoriteStatus);
      
      // 应用过滤器更新整个列表视图
      this.applyFilters();
      
      // 显示提示信息
      wx.showToast({
        title: newFavoriteStatus ? '已收藏' : '已取消收藏',
        icon: 'success',
        duration: 1500
      });
    }, 50);
  },
  onRestaurantTap: function(e) {
    const shopId = e.currentTarget.dataset.id;
    
    // 找到对应的餐厅数据
    const restaurant = this.data.restaurants.find(r => r.id === shopId);
    
    if (restaurant) {
      wx.navigateTo({
        url: `/pages/shop/shop?id=${restaurant.id}`
      });
    } else {
      wx.showToast({
        title: '找不到餐厅信息',
        icon: 'none'
      });
    }
  },
  onFilterTap: function(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      currentFilter: filter
    });
    this.applyFilters();
  },
  navigateToShop: function(e) {
    const restaurantId = e.currentTarget.dataset.id;
    const restaurant = this.data.restaurants.find(r => r.id === restaurantId);
    
    if (restaurant) {
      // 使用图片URL
      const imageUrl = restaurant.image || '';
      
      // 确保所有餐厅数据在本地存储中是最新的
      wx.setStorageSync('allRestaurants', this.data.restaurants);
      
      wx.navigateTo({
        url: '/pages/shop/shop?id=' + restaurantId,
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          try {
            if (res.eventChannel && typeof res.eventChannel.emit === 'function') {
              res.eventChannel.emit('passShopData', {
                name: restaurant.name,
                imageUrl: imageUrl,
                imageID: restaurant.imageID,
                cloudImageId: restaurant.cloudImageId,
                address: restaurant.address
              });
            } else {
              console.warn('eventChannel不可用，已将数据存储在本地');
            }
          } catch (err) {
            console.error('传递餐厅数据失败:', err);
          }
        },
        fail: function(err) {
          console.error('导航到餐厅页面失败:', err);
          wx.showToast({
            title: '打开餐厅详情失败',
            icon: 'none'
          });
        }
      });
    }
  },
  showLetterMenu: function() {
    this.setData({
      showLetterMenu: true
    });
  },
  hideLetterMenu: function() {
    this.setData({
      showLetterMenu: false
    });
  },
  // 加载餐厅图片
  loadRestaurantImages: function() {
    // 使用提供的外部URL替代云存储图片
    const imageUrls = {
      // 原有URL
      'bzb': "https://i.ibb.co/4hh6mc3/bzb.png",     // 北自拍
      'bang': "https://i.ibb.co/6RNXmkhy/bang.png",  // 帮锅
      'xm': "https://i.ibb.co/dwPxbX3F/xm.png",      // 小马
      'slfw': "https://i.ibb.co/0jKW38Gr/slfw.png",  // 私藏料理
      'mk': "https://i.ibb.co/QjCG2x4n/mk.png",      // 马克思牛肉面
      'lj': "https://i.ibb.co/XfFftpS3/lj.png",      // 菱角湖高级料理
      'jzb': "https://i.ibb.co/hFsF5V4W/jzb.png",    // 匠之本铁板烧
      'jx': "https://i.ibb.co/7thj4232/jx.png",      // 江西菜馆
      'cl': "https://i.ibb.co/d4nkR9vq/cl.png",      // 草榴
      
      // 新增URL
      'jbl': "https://i.ibb.co/9HvskM8W/jbl.png",    // 聚宝楼
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
      'xml': "https://i.ibb.co/5XxwDyMY/xml.png",    // 小米粒
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
      18: imageUrls.hai,      // Hai Seafood Izakaya
      19: imageUrls.tklmg,    // TAKLAMAKAN
      20: imageUrls.qjbm,     // Jiao Kitchen 千椒百冒
      21: imageUrls.chiachia, // ChiaChia's Cafe
      22: imageUrls.chen,     // Chen's Nudelbar
      23: imageUrls.qc,       // Qin Cheng
      24: imageUrls.ld,       // LeDu Happy Dumplings
      25: imageUrls.cww,      // 川味王小面馆
      26: imageUrls.xxx,      // 湘香轩
      27: imageUrls.luis,     // Lui's Cake
      28: imageUrls.m2l,      // 面次郎
      29: imageUrls.ks,       // Kashgar Uyghur Restaurant
      30: imageUrls.wai,      // Wais Küche
      31: imageUrls.ld2,      // LeDu - Happy Dumplings
      32: imageUrls.kim,      // 老金韩国料理
      33: imageUrls.xysg,     // 小魚砂鍋
      34: imageUrls.qy,       // 柒叶 Kencho Matcha
      35: imageUrls.bang,     // BANG
      36: imageUrls.bzb,      // Baoz! Bar
      37: imageUrls.mmb1,     // Mamma Bao - Adalbertstraße
      38: imageUrls.ygf,      // 杨国福麻辣烫
      39: imageUrls.sen,      // SEEN RESTAURANT
      40: imageUrls.fy,       // 福源酒家
      41: imageUrls.mmb2,     // Mamma Bao
      42: imageUrls.ds,       // 鼎尚中餐
      43: imageUrls.m1l,      // 面太郎
      44: imageUrls.fan,      // FAN范
      45: imageUrls.sxc2,     // 送小厨
      46: imageUrls.yyz,      // 悠游之
      47: imageUrls.nhhh,     // 你好和合
      48: imageUrls.lxg,      // 老香港
      49: imageUrls.lc,       // 乐茶
      50: imageUrls.m4l,      // 面四郎
      51: imageUrls.cy,       // 茶艺
      52: imageUrls.slfw,     // 丝路风味
      53: imageUrls.yml,      // 悦满楼
      54: imageUrls.lj,       // 老金中餐馆
      55: imageUrls.xm,       // 小梅中餐馆
      56: imageUrls.jx,       // 匠心
      57: imageUrls.cl,       // 川流
      58: imageUrls.mk,       // 面客
      59: imageUrls.jzb,      // 饺子吧
      60: imageUrls.xml,      // 小米粒
      61: imageUrls.jbl       // 聚宝楼
    };
    
    // 创建字母到图片URL的映射（用于letter属性）
    const letterToImage = {
      'A': imageUrls.m2l,     // 默认A
      'B': imageUrls.bzb,     // 北，Baoz! Bar
      'C': imageUrls.chois,   // 川，Chois
      'D': imageUrls.ds,      // 鼎尚中餐
      'F': imageUrls.fan,     // FAN范
      'G': imageUrls.gll,     // 麻辣烫 Gululu
      'H': imageUrls.hai,     // Hai Seafood
      'J': imageUrls.jzb,     // 饺子吧
      'K': imageUrls.ks,      // Kashgar
      'L': imageUrls.lj,      // 老金中餐馆
      'M': imageUrls.mk,      // 面客
      'N': imageUrls.nhhh,    // 你好成都
      'Q': imageUrls.qy,      // 柒叶
      'S': imageUrls.sxc,     // Song's Kitchen
      'T': imageUrls.ts,      // 天山
      'W': imageUrls.wai,     // Wais Küche
      'X': imageUrls.xm,      // 小梅
      'Y': imageUrls.yanyu,   // 宴遇
      'Z': imageUrls.zl       // 张亮
    };
    
    // 更新餐厅图片
    const updatedRestaurants = this.data.restaurants.map(restaurant => {
      // 首先尝试通过ID直接匹配
      if (idToImage[restaurant.id]) {
        restaurant.image = idToImage[restaurant.id];
        return restaurant;
      }
      
      // 如果没有ID匹配，根据letter属性匹配
      if (restaurant.letter && letterToImage[restaurant.letter]) {
        restaurant.image = letterToImage[restaurant.letter];
        return restaurant;
      }
      
      // 如果都没有匹配，尝试从URL的文件名判断
      const imageID = restaurant.imageID || '';
      const filename = imageID.split('/').pop() || '';
      const filenameWithoutExt = filename.split('.')[0] || '';
      
      if (imageUrls[filenameWithoutExt]) {
        restaurant.image = imageUrls[filenameWithoutExt];
        return restaurant;
      }
      
      // 默认图片
      restaurant.image = '/images/logo.png';
      return restaurant;
    });
    
    // 更新数据
    this.setData({
      restaurants: updatedRestaurants
    }, () => {
      // 应用过滤
      this.applyFilters();
    });
  },
  
  // 处理图片加载失败
  onImageError: function(e) {
    const id = e.currentTarget.dataset.id;
    console.log('首页餐厅图片加载失败，ID:', id);
    
    // 查找餐厅并更新图片
    const restaurants = this.data.restaurants;
    const index = restaurants.findIndex(r => String(r.id) === String(id));
    
    if (index !== -1) {
      const restaurant = restaurants[index];
      console.log('图片加载失败的餐厅:', restaurant.name);
      
      // 使用默认图片
      const key = `restaurants[${index}].image`;
      this.setData({
        [key]: '/images/logo.png'
      });
    }
  },
  loadBgImage: function() {
    // 使用外部URL替代本地图片
    this.setData({
      bgImageUrl: 'https://i.ibb.co/Nd8MFZw7/bgimage.png'
    });
  },
  loadEmptyImage: function() {
    // 直接设置本地图片
    this.setData({
      emptyImageUrl: '/images/empty.png'
    });
  },
  // 加载收藏状态
  loadFavoriteStatus: function() {
    console.log('加载收藏状态');
    const favorites = wx.getStorageSync('favoriteRestaurants') || [];
    console.log('当前收藏列表:', favorites);
    
    const restaurants = this.data.restaurants.map(restaurant => {
      // 确保使用字符串比较
      restaurant.favorite = favorites.some(item => String(item.id) === String(restaurant.id));
      return restaurant;
    });
    
    console.log('更新后的餐厅列表:', restaurants.filter(r => r.favorite).map(r => r.name));
    this.setData({ restaurants });
  },
  initCloudEnv: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-8gaz8w8x9edb3a42',
        traceUser: true,
      });
    }
  },
})
