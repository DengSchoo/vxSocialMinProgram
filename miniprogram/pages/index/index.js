const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    cardCur: 0,
    userinfo:{},
    swiperList: [{
      id: 0,
      type: 'image',
      url:'http://article.fd.zol-img.com.cn/t_s640x2000/g4/M06/0A/08/Cg-4y1UH3GiILebHAAFXPMRDttIAAW4fgN4pf0AAVdU053.jpg'
      //url:'https://cdn.pixabay.com/photo/2016/09/08/21/09/piano-1655558__340.jpg'
      //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url:'https://img1.qunarzz.com/travel/d1/1601/2d/2d33f2ad520666f7.jpg_r_720x480x95_89ab886b.jpg'
      //url:'https://cdn.pixabay.com/photo/2020/01/21/20/27/theater-4783908_960_720.jpg'
        //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url:'https://cdn.pixabay.com/photo/2019/02/10/09/21/lecture-3986809_960_720.jpg'
      //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url:'https://cdn.pixabay.com/photo/2017/10/27/16/31/team-2894828__340.jpg'
      //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url:'https://images.pexels.com/photos/2956376/pexels-photo-2956376.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
     //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url:'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
      //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url:'https://img.cc0.cn/pixabay/2019102906494764718.jpg!cc0.cn.jpg'
      //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],

    
    iconList: [{
      id:0,
      icon: 'musicfill',
      color: 'red',
      badge: 120,
      name: '音乐'
    }, {
      id:1,
      icon: 'colorlens',
      color: 'orange',
      badge: 1,
      name: '美术'
    }, {
      id:2,
      icon: 'camerafill',
      color: 'yellow',
      badge: 0,
      name: '摄影'
    }, {
      id:3,
      icon: 'noticefill',
      color: 'orange',
      badge: 22,
      name: '跑步'
    }, {
      id:4,
      icon: 'appreciate',
      color: 'red',
      badge: 0,
      name: '球类'
    }, {
      id:5,
      icon: 'game',
      color: 'orange',
      badge: 0,
      name: '游戏'
    }, {
      id:6,
      icon: 'discoverfill',
      color: 'yellow',
      badge: 0,
      name: '美食'
    }, {
      id:7,
      icon: 'questionfill',
      color: 'pink',
      badge: 0,
      name: '学习'
    }, {
      id:8,
      icon: 'upstagefill',
      color: 'red',
      badge: 0,
      name: '竞赛'
    }, {
      id:9,
      icon: 'creative',
      color: 'orange',
      badge: 0,
      name: '讲座'
    }, {
      id:10,
      icon: 'community',
      color: 'red',
      badge: 0,
      name: '交流'
    }, {
      id:11,
      icon: 'discoverfill',
      color: 'pink',
      badge: 0,
      name: '公益'
    }, {
      id:12,
      icon: 'questionfill',
      color: 'red',
      badge: 0,
      name: '培训'
    }, {
      id:13,
      icon: 'clothesfill',
      color: 'orange',
      badge: 0,
      name: '美妆'
    }, {
      id:14,
      icon: 'brandfill',
      color: 'purple',
      badge: 0,
      name: '其他'
    }],
    gridCol:3,
    skin: false,
  },
  findActivity(e){
    app.globalData['target_act'] = e.currentTarget.id;
    console.log(app.globalData['target_act']);
    wx.reLaunch({
      url: '../activities/activities',
    })
  },
  TapTest(e){
    console.log(e);
    if( e.currentTarget.id == 1)
      wx.redirectTo({
        url: '../activities/activities',
      })
    else console.log("111");
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.towerSwiper('swiperList');
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
    const userinfo = wx.getStorageSync("userinfo");
        var arr = Object.keys(userinfo);
        if(arr.length == 0) return;
        this.setData({
            userinfo
        })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})