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
        activities:[]
    },

    toDetail:function(e){
        this.setData({
            userinfo: app.userInfo
        }),

        app.globalData['target_id']=e.currentTarget.id;
        console.log(app.globalData['target_id']); 
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
            cur_act:app.globalData['target_act']
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let temp = this.data.acti;
        console.log(app.userInfo["_openid"])
    },
    join(){

    },

    quit(){

    },
    

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        db.collection('acti').where({
            hdlx : app.globalData['target_act']
        }).get().then( res=>{
              
              this.setData({
                activities:res.data
              })
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
        // wx.reLaunch({
        //   url: '../index/index',
        // })
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