// pages/create_act/create_act.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database();
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hdlx:"",
        hdms:"",
        ksrq: null,
       // kssj:"",
        cxsc:"",
        cyrs:"",
        lxfs:"",    
        bz:"",
        lxbottom: false,
        ksrqbottom: false,
        kssjbottom: false,
        cxscbottom: false,
        currentDate: '12:00',
        minHour: 0,
        maxHour: 23,
        defautlast: '2:00',
        minH: 0,
        maxH: 8,
        activityTypes:["演出","出游","电影","球类","游戏","美食","学习","竞赛","讲座","奶茶会","公益","游泳","购物","其它"],
    },
   
    /**
     * 生命周期函数--监听页面加载
     */
    showBottom(event){      //显示选择器
        if(event.currentTarget.id == 'hdlxcell')
            this.setData({lxbottom: true})  
        else if(event.currentTarget.id == 'ksrq')
            this.setData({ksrqbottom: true})   
        else if(event.currentTarget.id == 'kssj')
            this.setData({kssjbottom: true})     
        else if(event.currentTarget.id == 'cxsc')
            this.setData({cxscbottom: true})          
    },
    onCancel() {          //隐藏选择器
        this.setData({lxbottom: false,ksrqbottom: false,kssjbottom: false,cxscbottom:false})  
    },
    formatDate(ksrq) {
        ksrq = new Date(ksrq);
        return `${ksrq.getFullYear()}/${ksrq.getMonth() + 1}/${ksrq.getDate()}`;
      },
    onConfirm(event) {    //点击选择器确认键    
        if(event.currentTarget.id == 'hdlx'){
            const { picker, value, index } = event.detail;
            this.setData({
                hdlx:value
            });
            this.onCancel()
        }  
        else if(event.currentTarget.id == 'calender'){
            this.setData({
                ksrqbottom: false,    
                ksrq: this.formatDate(event.detail),
            });
        }
        else if(event.currentTarget.id == 'timePicker'){
            this.setData({
                kssjbottom: false,    
                kssj: event.detail,
            });
        }
        else if(event.currentTarget.id == 'lasttime'){
            var Time = event.detail, Hour, Min
            Hour = Time.substring(0,2)
            Min = Time.substring(3,5) 
            Time = Hour + "小时" + Min + "分钟"           
            this.setData({
                cxscbottom: false,
                cxsc:Time
            });
        }

    },
    
    onChange(event) {       //输入内容时触发,回调参数为value: 当前输入值
        // event.detail 为当前输入的值
        switch(event.currentTarget.id){           
            case 'hdms': this.setData({
                hdms:event.detail
            });break;
            case 'bz': this.setData({
                bz:event.detail
            });break;
        }
        },
        commitInfo(e){
            for(let key in this.data){
              if(this.data['hdlx'] == "" || this.data['hdms'] == "" || this.data['ksrq'] == "" || this.data['kssj'] == "" || this.data['cxsc'] == "" ) {
                  Toast.fail('请填写完整');
                  return
              }
            }
            for(let key in this.data){
                app.userInfo[key]=this.data[key];
            }
            app.userInfo['nickName']=app.globalData['nickName']; 
            app.userInfo['avatarUrl']=app.globalData['userPhoto'];
            db.collection('acti').add({
              data:{
                  nickName: app.userInfo['nickName'],
                  avatarUrl: app.userInfo['avatarUrl'],
                  hdlx: app.userInfo['hdlx'],
                  hdms: app.userInfo['hdms'],
                  ksrq: app.userInfo['ksrq'],
                  kssj: app.userInfo['kssj'],
                  cxsc: app.userInfo['cxsc'],
                  bz: app.userInfo['bz'],
                  cxrs: 1
              }
            }).then((res)=>{
                db.collection('acti').doc(res._id).get().then((res)=>{
                    app.userInfo = Object.assign(app.userInfo, res.data);
                });
                Toast.success('活动创建成功!');
                wx.reLaunch({
                  url: '../myactivity/myactivity',
                })
            });
            
        },
    onLoad: function (options) {
        this.setData({
            UserInfo:app.globalData
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
        this.getTabBar().init();
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