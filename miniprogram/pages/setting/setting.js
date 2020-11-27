// pages/setting/setting.js
import Toast from '@vant/weapp/toast/toast';
const db = wx.cloud.database();
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeNames: ['1'],
        userinfo:{},
        
        xh:app.userInfo['xh'],
        nj:app.userInfo['nj'],
        xy:app.userInfo['xy'],
        zy:app.userInfo['zy'],
        nl:app.userInfo['nl'],
        lxfs:app.userInfo['lxfs'],
        zwms:app.userInfo['zwms'],
        xm:app.userInfo['xm'],

        permmsion:false,
        disabled:true,
        msg:"修改信息"
    },
    modifyBtn(e) {
        
        var id = app.userInfo["_id"]
        
        this.setData({
            disabled:false,
            msg:"保存提交"
        });
        if (this.data.permmsion != false)
            wx.cloud.callFunction({
                name:'updateSetting',
                
                data:{
                    collection : 'users',
                    doc : id,
                    data : {
                        xm: this.data.xm,
                        xh: this.data.xh,
                        nj: this.data.nj,
                        xy: this.data.xy,
                        zy: this.data.zy,
                        nl: this.data.nl,
                        lxfs: this.data.lxfs,
                        zwms: this.data.zwms,
                    }
                }
            }).then((res)=>{
                Toast.success('修改信息成功!');
                console.log(res);
                //app.globalData["permission"] = true;
                this.setData({
                    permmsion:false
                })
                wx.reLaunch({
                    url: '../setting/setting',
                })
                
            })

            // db.collection('users').update({
            //     data:{
            //         nickName: app.userInfo['nickName'],
            //         userPhoto: app.userInfo['userPhoto'],
            //         xm: this.data.xm,
            //         xh: this.data.xh,
            //         nj: this.data.nj,
            //         xy: this.data.xy,
            //         zy: this.data.zy,
            //         nl: this.data.nl,
            //         lxfs: this.data.lxfs,
            //         zwms: this.data.zwms,
            //     }
            // }).then((res)=>{
            //     db.collection('users').doc(res._id).get().then((res)=>{
            //         app.userInfo = Object.assign(app.userInfo, res.data[0]);
            //         this.setData({
            //             xh:app.userInfo['xh'],
            //             nj:app.userInfo['nj'],
            //             xy:app.userInfo['xy'],
            //             zy:app.userInfo['zy'],
            //             nl:app.userInfo['nl'],
            //             lxfs:app.userInfo['lxfs'],
            //             zwms:app.userInfo['zwms'],
            //             xm:app.userInfo['xm'],
            //         })
            //     });
            //     Toast.success('修改信息成功!');
            //     //app.globalData["permission"] = true;
            //     wx.reLaunch({
            //         url: '../setting/setting',
            //     })
            //     this.setData({
            //         permmsion:false
            //     })
            // });
        this.setData({
            permmsion:true
        });
        
        
    },
    cancelBtn(){
        this.setData({
            disabled:true,
            permmsion:false,
            msg:"修改信息",
            xh:app.userInfo['xh'],
            nj:app.userInfo['nj'],
            xy:app.userInfo['xy'],
            zy:app.userInfo['zy'],
            nl:app.userInfo['nl'],
            lxfs:app.userInfo['lxfs'],
            zwms:app.userInfo['zwms'],
            xm:app.userInfo['xm'],
        })
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const userinfo=wx.getStorageSync("userinfo");
        this.setData({userinfo,
            xh:app.userInfo['xh'],
            nj:app.userInfo['nj'],
            xy:app.userInfo['xy'],
            zy:app.userInfo['zy'],
            nl:app.userInfo['nl'],
            lxfs:app.userInfo['lxfs'],
            zwms:app.userInfo['zwms'],
            xm:app.userInfo['xm'],
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const userinfo=wx.getStorageSync("userinfo");
        this.setData({userinfo
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().init();
        const userinfo=wx.getStorageSync("userinfo");
        this.setData({userinfo});
        
        
    },
    onChange(event) {
        // event.detail 为当前输入的值
        
        switch(event.currentTarget.id){
            case "xm": this.setData({
                xm:event.detail
            });break;
            case "xh": this.setData({
                xh:event.detail
            });break;
            case 'nj': this.setData({
                nj:event.detail
            });break;
            case 'xy': this.setData({
                xy:event.detail
            });break;
            case 'zy': this.setData({
                zy:event.detail
            });break;
            case 'nl': this.setData({
                nl:event.detail
            });break;
            case 'lxfs': this.setData({
                lxfs:event.detail
            });break;
            case 'zwms': this.setData({
                zwms:event.detail
            });break;

        }
        //console.log(event);
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