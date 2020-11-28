// pages/login/login.js
const db = wx.cloud.database();
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Img:"https://images.pexels.com/photos/3662824/pexels-photo-3662824.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        btninfo:"微信用户实名登录",
        //permission:false,
        userinfo:{},
        list: [{
          name: 'shake',
          color: 'mauve'
        },]

    },
    toggle(e) {
        
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
      // 用户先授权登录 获得openid  再根据id去数据库查询 若查询结果不存在则转去完善用户信息 存在则继续现在开始
      //console.log(e.detail.userInfo.avatarUrl);
      const {userInfo} = e.detail;
      wx.setStorageSync('userinfo', userInfo);
      app.globalData['userPhoto'] = e.detail.userInfo.avatarUrl;
      app.globalData['nickName'] = e.detail.userInfo.nickName;
      app.globalData['gender'] = e.detail.userInfo.gender;

      
      

      wx.cloud.callFunction({
        name:'login',
        data:{}
      }).then((res)=>{
        db.collection('users').where({
          _openid : res.result.openid
        }).get().then((res)=>{
          if (res.data.length == 0) {
            wx.reLaunch({
            url: '../register/register',
            });
            return
          } else 
            {
              
              if (this.data.userinfo.length != 0) {
                app.globalData["permission"] = true
              }

              if (app.globalData["permission"] == true) {
                app.userInfo = Object.assign(app.userInfo, res.data[0]);
                wx.reLaunch({
                  url: '../index/index',
                })
                return;
              }
               
               this.setData({
                Img:app.globalData['userPhoto'],
                btninfo:app.globalData['nickName'] + " 现在开始",
                //permission:true
                })
                app.globalData["permission"] = true
            }

            
            
        })
      })

        

        
        // if(this.data.permission == true) {
        //     wx.reLaunch({
        //       url: '../index/index',
        //     })
        // }
        // this.setData({
        //     Img:userinfo.avatarUrl,
        //     btninfo:userinfo.nickName + " 现在开始",
        //     permission:true
        // })
        // app.userInfo['userPhoto'] = userinfo.avatarUrl;
        // app.userInfo['nickName'] = userinfo.nickName;
        
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
        if(app.globalData['permission'] == true) {
            wx.reLaunch({
              url: '../index/index',
            })
        }
        this.setData({
            Img:userinfo.avatarUrl,
            btninfo:userinfo.nickName + " 现在开始"
        })
        app.globalData['permission'] = false;
        
        
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