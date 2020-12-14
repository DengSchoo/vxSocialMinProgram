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
        this.setData({
            userinfo: app.userInfo
        });
        
        app.globalData['target_id']=e.currentTarget.id;
        //console.log(app.globalData['target_id']); 
        wx.navigateTo({
            url: '../act_detail/act_detail',
          })
        //  wx.reLaunch({
        //    url: '../act_detail/act_detail',
        //  })
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            UserInfo:app.userInfo,
            cur_act:app.globalData['target_act']
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
     
    },
    join(e){
        var openid = "";
        var time = "";
        this.data.activities.forEach((value,index)=> {
            if (e.currentTarget.id == value._id) {
                openid = value._openid;           
            }
        })
        db.collection('acti').where({
            _id : e.currentTarget.id
        }).get({}).then(res => {
            var myDate = new Date();
            myDate.toLocaleString( );                   //获取日期与时间
            var Hour=myDate.getHours()
            var Min=myDate.getMinutes()
            if((Hour > res.data[0].jssjHour)||(Hour == res.data[0].jssjHour && Min > res.data[0].jssjMin))
            {
                Toast.fail('活动已结束');
                return;
            }
        })
        db.collection('join_in').where({
            _openid : this.data.UserInfo['_openid'],
            activity : e.currentTarget.id
        }).get({}).then(res => {
            
            if (res.data.length != 0) {
                Toast.fail('已经参加');
                return;
            }
            else{
                db.collection('join_in').add({
                    data:{
                        activity:e.currentTarget.id
                    }
                }).then( res =>{ 
                    
                    wx.cloud.callFunction({
                        name:'updateJoin',
                        data:{
                            collection : 'acti',
                            doc : e.currentTarget.id,
                            openid : openid
                        }
                    })

                })

                
                
                    

                // const _ = db.command
                // var openid = "";
                // this.data.activities.forEach((value,index)=> {
                //     if (e.currentTarget.id == value._id) {
                //         openid = value._openid;
                //     }
                // })
                // console.log(openid);
                // db.collection('acti').doc(e.currentTarget.id).update({
                //     data: {
                //         // 表示指示数据库将字段自增 1
                //         _openid:openid,
                //         cyrs: _.inc(1)
                //     },
                //     success: function(res) {
                //         console.log(res.data)
                //     }
                // })
                Toast.success('加入成功');
                // setTimeout(function(){
                //     wx.reLaunch({
                //       url: '../activities/activities',
                //     })
                // }, 1000)
            }
            
        })  
        
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