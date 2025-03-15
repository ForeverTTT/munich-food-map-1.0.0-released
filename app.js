// app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 初始化云环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "cloud1-8gaz8w8x9edb3a42",
        traceUser: true
      })
      console.log('云环境初始化成功')
    }
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功:', res)
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.statusBarHeight = e.statusBarHeight
        this.globalData.screenHeight = e.screenHeight
        this.globalData.windowHeight = e.windowHeight
      }
    })
  },
  
  onShow: function() {
    // 小程序启动或从后台进入前台显示时触发
  },
  
  onHide: function() {
    // 小程序从前台进入后台时触发
  },
  
  onError: function(err) {
    // 小程序发生脚本错误或 API 调用报错时触发
    console.error('应用程序错误:', err)
  },
  
  globalData: {
    userInfo: null,
    statusBarHeight: 0,
    screenHeight: 0,
    windowHeight: 0,
    // 可以在这里添加其他全局数据
    baseUrl: 'https://your-api-domain.com', // 替换为您的API域名
    version: '1.0.0'
  }
})
