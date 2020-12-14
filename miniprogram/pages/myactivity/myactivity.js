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
        act:[],
        myacti:[],
        join_list:[],
        length:0
    },
    quit(e){
         
         var openid = ""
        db.collection('join_in').where({
            _openid : this.data.UserInfo['_openid'],
            activity : e.currentTarget.id
        }).get({}).then(res => {
            this.data.myacti.forEach((value,index)=> {
                if (e.currentTarget.id == value._id) {
                    openid = value._openid
                    if (value._openid == app.userInfo['_openid']) {
                        db.collection('acti').doc(e.currentTarget.id).remove({
                        })
                    }
                }
            })

            wx.cloud.callFunction({
                name:'descJoin',
                data:{
                    collection : 'acti',
                    doc : e.currentTarget.id,
                    openid : openid
                }
            })

            db.collection('join_in').doc(res.data[0]._id).remove({

                success: function(res) {

                    Toast.success('退出成功');

                    setTimeout(function(){
                        wx.reLaunch({
                            url: '../myactivity/myactivity',
                          })
                    }, 1000);
                    
                }
              })
            
            
        })
        
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function () {
        this.setData({
            UserInfo:app.userInfo
        });
        this.getTabBar().init();
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },
    toDetail(e){
        this.setData({
            userinfo: app.userInfo
        });
         
  
        app.globalData['target_id']=e.currentTarget.id;
         
         wx.navigateTo({
           url: '../act_detail/act_detail',
         })
    },

    
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async  function () {
        //const that = this;
        this.getTabBar().init();
        
        if (this.data.length != 0) {
            this.setData({
                act:app.globalData['temp']
            })
            return;
        }

        const that = this;
        const acti = [];
        const resList = await Promise.all([
            db.collection('join_in').where({
                _openid : app.userInfo["_openid"],
            }).get({}).then(res => {
                
                that.setData({
                    join_list : res.data
                });
                
                that.data.join_list.forEach( (value, index) =>{
                    
                    db.collection( 'acti' ).where({
                        _id : value.activity
                    }).get({}).then( res=>{             
                        acti.push(res.data[0]);
                    })
                    
                })
                acti.reverse();
                    // 
                    that.setData({
                        act : acti,
                        length : 1
                    })
                app.globalData['temp'] = this.data.act;
                return this.data.act;
            }),
            db.collection('acti').where({
                _openid : app.userInfo["_openid"],
            }).get().then( res=>{
                res.data.reverse();
                that.setData({
                    myacti:res.data
                })
                
                return this.data.myacti;              
            })
        ])
        setTimeout(this.onShow, 500);
    },
    
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.setData({
            length : 0
        })
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