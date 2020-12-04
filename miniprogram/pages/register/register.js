// pages/register/register.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database();
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        xh:"",
        nj:"",
        xy:"",
        zy:"",
        nl:"",
        lxfs:"",
        zwms:"",
        xm:"",
        index: null,
        picker: ['2016', '2017', '2018','2019','2020'],
        photo:"",
        
      },
      PickerChange(e) {
        console.log(e);
        this.setData({
          index: e.detail.value
        })
        
      },
      onClickIcon(){
        Toast('请根据提示如实填写');
      },
      commitInfo(e){
          for(let key in this.data){
            if(this.data[key] == "" && key != "zwms") {
                Toast.fail('必填不能为空');
                return
            }
          }

          for(let key in this.data){
              app.userInfo[key]=this.data[key];
          }
          app.userInfo['avatarUrl']=app.globalData['avatarUrl'];
          app.userInfo['nickName']=app.globalData['nickName'];
          
          db.collection('users').add({
            data:{
                nickName: app.userInfo['nickName'],
                userPhoto: app.userInfo['avatarUrl'],
                xm: app.userInfo['xm'],
                xh: app.userInfo['xh'],
                nj: app.userInfo['nj'],
                xy: app.userInfo['xy'],
                zy: app.userInfo['zy'],
                nl: app.userInfo['nl'],
                lxfs: app.userInfo['lxfs'],
                zwms: app.userInfo['zwms'],

            }
          }).then((res)=>{
              db.collection('users').doc(res._id).get().then((res)=>{
                  app.userInfo = Object.assign(app.userInfo, res.data);
              });
              Toast.success('注册成功!');
              //app.globalData["permission"] = true;
              wx.reLaunch({
                url: '../login/login',
              })
          });
          
      },

      onDectError(e) {
        switch(e.currentTarget.id){
            case "xh":{
                if (!(/(20)\d{8}/.test(e.detail.value))) {
                    wx.showToast({
                    title: '学号格式有误,请检查',        
                    duration: 2000,
                    icon:'none'
                    });          
                    return        
                }
            }break;
            case "xm":{
                
            }break;
        }
      },
      onChange(event) {
        // event.detail 为当前输入的值
       
        switch(event.currentTarget.id){
            case "xm": this.setData({
                xm:event.detail
            });break;
            case "xh": this.setData({
                xh:event.detail
            }); break;
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            photo: app.globalData['userPhoto']
        })
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