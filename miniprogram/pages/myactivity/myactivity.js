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
        join_list:[]
    },
    quit(e){
        
    },
    join(e){
        console.log(e);
        db.collection('join_in').where({
            _openid : this.data.UserInfo['_openid'],
            activity : e.currentTarget.id
        }).get({}).then(res => {
            if (res.data.length != 0) {
                console.log("aaa");
                return;
            }
        })
        db.collection('join_in').add({
            data:{
                activity:e.currentTarget.id
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {

        this.setData({
            UserInfo:app.userInfo
        });
        this.getTabBar().init();

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
                        act : acti
                    })
                })
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
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log(this.data.act)
        console.log(this.data.myacti)
    },
    
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async  function () {
        //const that = this;
        this.getTabBar().init();

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
                        act : acti
                    })
                })
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

        
        
    },
    test(e){
        this.getJoin();
        console.log("sss");
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