Component({
    data: {
    active: 0,
    list: [
      {
        "url": "/pages/index/index",
        "icon": "wap-home-o",
        "text": "首页"
      },
      {
        "url": "/pages/activities/activities",
        "icon": "apps-o",
        "text": "活动"
      },
      {
        "url": "/pages/myactivity/myactivity",
        "icon": "like-o",
        "text": "我的"
      },
      {
        "url": "/pages/setting/setting",
        "icon": "setting-o",
        "text": "设置"
      }
    ]
    },
    methods: {
     onChange(e) {
        // console.log(e,'e')
        this.setData({ active: e.detail });
        wx.switchTab({
          url: this.data.list[e.detail].url
        });
     },
     init() {
         const page = getCurrentPages().pop();
         this.setData({
        　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
         });
        }
     }
});