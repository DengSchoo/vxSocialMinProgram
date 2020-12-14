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
        hdbt:"",
        kssj:"",
        ksrq: null,
        cxsc:"",
        jssjHour:"",
        jssjMin:"",
          
        hdnr:"",
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
        activityTypes:["演出","出游","电影","跑步","球类","游戏","美食","学习","竞赛","讲座","奶茶会","公益","游泳","购物","其它"],
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
            Hour = parseInt(Time.substring(0,2))   
            Min = parseInt(Time.substring(3,5) )
            Time = Hour + "小时" + Min + "分钟"  
            
            var Time1 =  this.data['kssj']
            Hour += parseInt(Time1.substring(0,2))
            Min += parseInt(Time1.substring(3,5))
            if(Min >= 60)
                {
                    Min -= 60
                    Hour += 1
                }
            Time1 = Hour + ":" + Min
            this.setData({
                cxscbottom: false,
                cxsc:Time,
                jssjHour:Hour,
                jssjMin:Min
            });
        }
    },
    
    onChange(event) {       //输入内容时触发,回调参数为value: 当前输入值
        // event.detail 为当前输入的值
        switch(event.currentTarget.id){           
            case 'hdbt': this.setData({
                hdbt:event.detail
            });break;
            case 'hdnr': this.setData({
                hdnr:event.detail
            });break;
        }
        },
        commitInfo(e){
            for(let key in this.data){
              if(this.data['hdlx'] == "" || this.data['hdbt'] == "" || this.data['ksrq'] == "" || this.data['kssj'] == "" || this.data['cxsc'] == "" || this.data['hdnr'] == "") {
                  Toast.fail('请填写完整');
                  return
              }
            }
            for(let key in this.data){
                app.userInfo[key]=this.data[key];
            }

            app.userInfo['nickName']=app.globalData['nickName']; 
            app.userInfo['avatarUrl']=app.globalData['userPhoto'];
            var type = app.userInfo['hdlx']
            var photo
            if (type == '演出') 
                photo='https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?cs=srgb&dl=pexels-monica-silvestre-713149.jpg&fm=jpg'
            else if(type == '出游')
                photo='https://images.pexels.com/photos/5064930/pexels-photo-5064930.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            else if(type == '电影')
                photo='https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            else if(type == '跑步')
                photo='https://images.pexels.com/photos/39308/runners-silhouettes-athletes-fitness-39308.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            else if(type == '球类')
                photo='https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            else if(type == '游戏')
                photo='https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            else if(type == '美食')
                photo='https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            else if(type == '学习')
                photo='https://images.pexels.com/photos/5472310/pexels-photo-5472310.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            else if(type == '竞赛')
                photo='https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            else if(type == '讲座')
                photo='https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            else if(type == '奶茶会')
                photo='https://cdn.pixabay.com/photo/2019/11/28/06/26/milk-tea-4658495_960_720.jpg'
            else if(type == '公益')
                photo='https://images.pexels.com/photos/5340280/pexels-photo-5340280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            else if(type == '游泳')
                photo='https://images.pexels.com/photos/52988/swim-water-diving-underwater-52988.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            else if(type == '购物')
                photo='https://images.pexels.com/photos/5910700/pexels-photo-5910700.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            else if(type == '其它')
                photo='https://cdn.pixabay.com/photo/2019/02/03/16/52/taiwan-3973014__340.jpg'

            db.collection('acti').add({
              data:{
                  nickName: app.userInfo['nickName'],
                  avatarUrl: app.userInfo['avatarUrl'],
                  hdlx: app.userInfo['hdlx'],
                  hdbt: app.userInfo['hdbt'],
                  ksrq: app.userInfo['ksrq'],
                  kssj: app.userInfo['kssj'],
                  jssjHour: app.userInfo['jssjHour'],
                  jssjMin: app.userInfo['jssjMin'],
                  cxsc: app.userInfo['cxsc'],
                  hdnr: app.userInfo['hdnr'],
                  cyrs: 1,
                  act_photo: photo
                  
              }
            }).then((res)=>{
                db.collection('join_in').add({
                    data:{
                        activity: res._id,
                    }
                })
                // db.collection('acti').doc(res._id).get().then((res)=>{
                //     app.userInfo = Object.assign(app.userInfo, res.data);
                    
                // });
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