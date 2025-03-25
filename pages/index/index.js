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
        hours: '周一至周日11:30-21:30',
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
        hours: '周六至周日 9:30-20:00',
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
        hours: '周一至周日 11:30-22:00',
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
        hours: '周一至周日 17:00-23:00',
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
        hours: '周一至周日 11:30-22:30',
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
        hours: '周一至周日 12:00-23:00',
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
        id: 58,
        name: '饺子吧 Gyoza bar',
        imageID: '	cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/images/restaurants/jzb.png',
        image: '',
        favorite: false,
        address: 'Augustenstraße 47, 80333 München',
        cuisine: '面馆简餐',
        price: '10-20€',
        hours: '周一至周日 11:30-22:30',
        phone: '无',
        cloudImageId: '	cloud://cloud1-8gaz8w8x9edb3a42.636c-cloud1-8gaz8w8x9edb3a42-1348967216/restaurants/jzb.png',
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
      '家': 'J', '江': 'J', '津': 'J', '京': 'J', '鸡': 'J', '匠': 'J',
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
    // 先获取所有云存储图片的临时URL，再设置图片
    const cloudIds = [];
    this.data.restaurants.forEach(restaurant => {
      if (restaurant.imageID && restaurant.imageID.indexOf('cloud://') === 0) {
        cloudIds.push(restaurant.imageID);
      }
      if (restaurant.cloudImageId && restaurant.cloudImageId.indexOf('cloud://') === 0) {
        cloudIds.push(restaurant.cloudImageId);
      }
    });
    
    // 如果没有云存储ID，直接应用过滤器
    if (cloudIds.length === 0) {
      this.applyFilters();
      return;
    }
    
    // 将云存储ID分批处理，每批最多50个
    const batchSize = 50;
    const batches = [];
    
    for (let i = 0; i < cloudIds.length; i += batchSize) {
      batches.push(cloudIds.slice(i, i + batchSize));
    }
    
    // 处理每一批
    let completedBatches = 0;
    const urlMap = {};
    
    batches.forEach((batchIds, index) => {
      wx.cloud.getTempFileURL({
        fileList: batchIds,
        success: res => {
          if (res.fileList && res.fileList.length > 0) {
            res.fileList.forEach(file => {
              if (file.fileID && file.tempFileURL) {
                urlMap[file.fileID] = file.tempFileURL;
              }
            });
          }
        },
        fail: err => {
          console.error(`获取第${index+1}批临时URL失败:`, err);
        },
        complete: () => {
          completedBatches++;
          
          // 当所有批次处理完成时，更新餐厅图片
          if (completedBatches === batches.length) {
            this.updateRestaurantImages(urlMap);
          }
        }
      });
    });
  },
  
  // 更新餐厅图片URL
  updateRestaurantImages: function(urlMap) {
    // 更新餐厅图片URL
    const updatedRestaurants = this.data.restaurants.map(restaurant => {
      // 优先使用imageID的临时URL
      if (restaurant.imageID && urlMap[restaurant.imageID]) {
        restaurant.image = urlMap[restaurant.imageID];
      } 
      // 其次使用cloudImageId的临时URL
      else if (restaurant.cloudImageId && urlMap[restaurant.cloudImageId]) {
        restaurant.image = urlMap[restaurant.cloudImageId];
      }
      // 如果都没有，使用默认图片
      else {
        restaurant.image = '/images/logo.png';
      }
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
