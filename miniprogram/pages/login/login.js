// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1453718649,1499996929&fm=26&gp=0.jpg",
        btninfo:"微信用户实名登录",
        permission:false,
        userinfo:{},
        list: [{
          name: 'shake',
          color: 'mauve'
        },]

    },
    toggle(e) {
        console.log(e);
        var anmiaton = e.currentTarget.dataset.class;
        var that = this;
        that.setData({
          animation: anmiaton
        })
        setTimeout(function() {
          that.setData({
            animation: ''
          })
        }, 1000)
      },
    handleUserInfo:function(e){
        
        const {userInfo} = e.detail;

        wx.setStorageSync('userinfo', userInfo);

        const userinfo = wx.getStorageSync("userinfo");
        
        this.setData({
            userinfo
        })
        if(this.data.permission == true) {
            wx.reLaunch({
              url: '../index/index',
            })
        }
        this.setData({
            Img:userinfo.avatarUrl,
            btninfo:userinfo.nickName + " 现在开始",
            permission:true
        })
        
    },

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
        const userinfo = wx.getStorageSync("userinfo");
        var arr = Object.keys(userinfo);
        if(arr.length == 0) return;
        this.setData({
            userinfo
        })
        if(this.data.permission == true) {
            wx.reLaunch({
              url: '../index/index',
            })
        }
        this.setData({
            Img:userinfo.avatarUrl,
            btninfo:userinfo.nickName + " 现在开始",
            permission:true
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