// pages/myactivity/myactivity.js
const app = getApp();

const db = wx.cloud.database();
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

    },
    join(e){

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function () {
        this.setData({
            UserInfo:app.globalData
        });
        this.getTabBar().init();
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
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
                    acti.reverse();
                    //console.log(acti);
                    that.setData({
                        act : acti,
                        length : 1
                    })
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