//app.js
App({
    onLaunch: function() {
      if (wx.cloud) {
        wx.cloud.init({
          traceUser: true
        })
      }
      
    },
    globalData:{
      position:"首页",
    },
    
    
  })