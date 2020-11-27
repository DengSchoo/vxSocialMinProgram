//app.js
App({
    onLaunch: function() {
      if (wx.cloud) {
        wx.cloud.init({
          traceUser: true,
          //env:'dsh1999',
        })
      }
      this.globalData = {
        "permission":false
      },
      
      this.userInfo = {}
    }
    
    
    
    
  })