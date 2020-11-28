// pages/myactivity/myactivity.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        UserInfo:{},
        cur_act:"",
        activities:[{
            id:"", // 活动唯一标识
            status:true, // 活动状态  用于判断是否正在进行
            type:"", // 卡片展示状态 为： 类型 - 活动状态
            photo:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkGZ7klSn27UHeDfCg1VH72JoeVHpEE8c7nabanA0sgSYNJibNgRn55PxNS7ibhibsCQQ93Xj9st1JA/132", // 用户头像
            
            content:"sss", // 活动的具体内容
            location:"", //地点
            nickName:"", // 活动发起人
            Img:"", // 发起人头像
            startTime:"", // 活动开始时间 精确到分钟
            lastTime:"",
            join:""  // 当前参加人数
        },{
            id:"",
            status:true,
            photo:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            type:"史诗 - 正在进行",
            content:"sss",
            nickName:"周杰伦",
            startTime:"2018-02",
            join:"10"
        }
    ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            UserInfo:app.globalData,
            cur_act:app.act_type[app.globalData['target_act']]
        })
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