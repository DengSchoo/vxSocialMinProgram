// pages/setting/setting.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database();
const app = getApp();
const majors = {
    信息科学与技术学院: ['计算机科学与技术', '人工智能', '软件工程', '电子科学与技术', '通信工程','自动化','轨道交通信号与控制','网络工程'],
    土木工程学院: ['土木工程', '铁道工程', '道路桥梁与渡河工程', '城市地下空间'],
    机械工程学院: ['机械设计制造', '能源与动力工程', '车辆工程', '建筑环境与能源应用','测控技术与仪器','工业工程'],
    电气工程学院: ['电气工程及其自动化', '电子信息工程', '电气工程与智能控制'],
    经济管理学院: ['会计学','经济学','市场学', '工程与运营管理', '金融与财务学', '信息系统与运营管理','创新创业与管理学'],
    外国语学院: ['英语', '日语', '德语', '法俄','翻译','工程英语','国际汉语','商务英语'],
    交通运输与物流学院: ['交通运输', '交通工程', '物流工程', '物流管理','安全工程（运输安全）'],
    材料科学与工程学院: ['材料科学与工程', '材料成型及控制工程', '生物医学工程'],
    地球科学与环境工程学院: ['测绘工程', '地理信息科学', '地质工程','环境工程','消防工程','遥感科学与技术'],
    建筑与设计学院: ['建筑学', '城乡规划', '风景园林', '环境设计','视觉传达设计','产品设计','绘画'],
    物理科学与技术学院: ['应用物理学', '电子信息科学与技术'],
    人文学院: ['汉语言文学', '传播学', '广告学', '音乐表演'],
    公共管理与政法学院: ['公共管理', '政治学与行政学', '法学'],
    生命科学与工程学院: ['生物工程类', '化学化工', ' 药学'],
    力学与工程学院: ['工程力学', '飞行器设计与工程'],
    数学学院: ['数学与应用数学', '统计学', '数据科学与大数据技术'],
    马克思主义学院: ['思想政治教育'],
    心理研究与咨询中心: ['应用心理学'],
    利兹学院: ['土木工程', '机械设计制造', '电子信息工程', '计算机科学与技术'],
  };
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
        njbottom: false,
        grades: ['2015','2016','2017','2018','2019','2020'],
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
                                  num: 1
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
    onCancel() {          //隐藏选择器
        this.setData({njbottom: false,ksrqbottom: false,kssjbottom: false,cxscbottom:false})  
    },
    onConfirm(event) {    //点击选择器确认键    
        if(event.currentTarget.id == 'hdlx'){
            const { picker, value, index } = event.detail;
            this.setData({
                hdlx:value
            });
            this.onCancel()
        }  
        else if(event.currentTarget.id == 'njpopup'){
            this.setData({
                njbottom: false,    
                nj: event.detail,
            });
        }
        else if(event.currentTarget.id == 'timePicker'){
            this.setData({
                kssjbottom: false,    
                kssj: event.detail,
            });
        }

    },
    showBottom(event){      //显示选择器
        console.log(event.currentTarget.id)
        if(event.currentTarget.id == 'nj')
            this.setData({njbottom: true})  
        else if(event.currentTarget.id == 'ksrq')
            this.setData({ksrqbottom: true})   
        else if(event.currentTarget.id == 'kssj')
            this.setData({kssjbottom: true})     
        else if(event.currentTarget.id == 'cxsc')
            this.setData({cxscbottom: true})  
         console.log(this.data.njbottom) 
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