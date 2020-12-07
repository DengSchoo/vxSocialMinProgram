// pages/create_act/create_act.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database();
const app = getApp();
const activityType=["演出","出游","电影","球类","游戏","美食","学习","竞赛","讲座","奶茶会","公益","游泳","购物","其它"]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hdlx:"",
        kssj:"",
        jssj:"",
        dd:"",
        lxfs:"",
        hdms:"",
        bz:""
    },
//还有图片还没搞
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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