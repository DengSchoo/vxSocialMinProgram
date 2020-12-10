// pages/myactivity/myactivity.js
const app = getApp();
const db = wx.cloud.database();
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        UserInfo:{},
        cur_act:"",
        
        activities:[]
    },

    toDetail:function(e){
        console.log(e);
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
        
     
    },
    join(e){
        console.log(e);
        db.collection('join_in').where({
            _openid : this.data.UserInfo['_openid'],
            activity : e.currentTarget.id
        }).get({}).then(res => {
            if (res.data.length != 0) {
                console.log("aaa");
                Toast.fail('已经参加');
                return;
            }
        })
        db.collection('join_in').add({
            data:{
                activity:e.currentTarget.id
            }
        })
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
              res.data.reverse()
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