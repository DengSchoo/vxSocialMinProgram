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
        target_act:-1, //表示 -1我的
        target_id:null
      },
      this.act_type = [
        '演出',
        '出游',
        '电影',
        '跑步',
        '球类',
        '游戏',
        '美食',
        '学习',
        '竞赛',
        '讲座',
        '奶茶会',
        '公益',
        '游泳',
        '购物',
        '其它',
      ],
        
      
      this.userInfo = {}
    }  
  })