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
        "permission":false,
        target_act:-1 //表示 -1我的
      },
      this.act_type = [
        '音乐',
        '美术',
        '摄影',
        '跑步',
        '球类',
        '游戏',
        '美食',
        '学习',
        '竞赛',
        '讲座',
        '交流',
        '公益',
        '培训',
        '美妆',
        '其它',
      ],
        
      
      this.userInfo = {}
    }
    
    
    
    
  })