// pages/setting/setting.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
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

        permmsion:false,
        disabled:true,
        msg:"修改信息"
    },
    modifyBtn(e) {
        var openid = app.userInfo["_openid"]
        var id = app.userInfo["_id"]
        db.collection('users').where({_openid : openid}).get({}).then(res => {
               //如果查询成功的话    
                console.log(res.data[0].num)
                if (res.data[0].num == 0) {
                  Toast.fail('修改次数已用完');
                  return
              } else{
                  console.log(res.data[0].num)
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
                                  xh: this.data.xh,
                                  nj: this.data.nj,
                                  xy: this.data.xy,
                                  zy: this.data.zy,
                                  nl: this.data.nl,
                                  lxfs: this.data.lxfs,
                                  zwms: this.data.zwms,
                                  num: 0
                              }
                          }
                      }).then((res)=>{
      
                          db.collection('users').where({
                              _id : app.userInfo["_id"]
                          }).get().then((res)=>{
                              app.userInfo = Object.assign(app.userInfo, res.data[0]);
                              
                          
                              this.setData({
                                  permmsion:false,
                                  xh:app.userInfo['xh'],
                                  nj:app.userInfo['nj'],
                                  xy:app.userInfo['xy'],
                                  zy:app.userInfo['zy'],
                                  nl:app.userInfo['nl'],
                                  lxfs:app.userInfo['lxfs'],
                                  zwms:app.userInfo['zwms'],
                                  num: 0
                              })
                              wx.reLaunch({
                                  url: '../setting/setting',
                              });
                              Toast.success('修改信息成功!');
                          });            
                      })
                  this.setData({
                      permmsion:true
                  });  
                }

    })
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