const app = getApp();
Component({
    data: {
    Active: 0,
    list: [
      {
        "url": "/pages/index/index",
        "icon": "wap-home-o",
        "text": "首页"
      },
      {
        "url": "/pages/myactivity/myactivity",
        "icon": "manager-o",
        "text": "我的"
      },
      {
        "url":"/pages/create_act/create_act",
        "icon":"add-o",
        "text":"创建"
      },
      {
        "url":"/pages/moments/moments",
        "icon":"notes-o",
        "text":"瞬间"
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
        this.setData({ Active: e.detail });
        wx.switchTab({
          url: this.data.list[e.detail].url
        });
     },
     init() {
         const page = getCurrentPages().pop();
         this.setData({
        　  Active: this.data.list.findIndex(item => item.url === `/${page.route}`)
            
         });
        }
     }
});