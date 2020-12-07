// pages/myactivity/myactivity.js
const app = getApp();
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        UserInfo:{},
        cur_act:"",
        acti:[],
        activities:[{
            id:"0", // 活动唯一标识
            status:true, // 活动状态  用于判断是否正在进行
            type:"", // 卡片展示状态 为： 类型 - 活动状态
            photo:"https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // 用户头像
            //url:"../act_detail/act_detail",
            content:"在南区体育场跑步三圈", // 活动的具体内容
            location:"", //地点
            nickName:"刘德华", // 活动发起人
            Img:"", // 发起人头像
            startTime:"2020-11-19-14:00", // 活动开始时间 精确到分钟
            lastTime:"",
            join:"1"  // 当前参加人数
        },{
            id:"1",
            status:true,
            photo:"https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            //url:"../act_detail/act_detail",
            type:"史诗 - 正在进行",
            content:"sss",
            nickName:"周杰伦",
            startTime:"2018-02",
            join:"10"
        }
    ]
    },

    toDetail:function(e){
        wx.redirectTo({
          url: '../act_detail/act_detail',
        })

    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            UserInfo:app.globalData,
            //cur_act:app.act_type[app.globalData['target_act']]
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let temp = this.data.acti;
        console.log(app.userInfo["_openid"])

        

          
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
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
        wx.reLaunch({
          url: '../index/index',
        })
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