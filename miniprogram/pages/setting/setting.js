// pages/setting/setting.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database();
const app = getApp();
const majors = {
    信息科学与技术学院: ['计算机科学与技术', '人工智能', '软件工程', '电子科学与技术', '通信工程','自动化','轨道交通信号与控制','网络工程','其他'],
    土木工程学院: ['土木工程', '铁道工程', '道路桥梁与渡河工程', '城市地下空间','其他'],
    机械工程学院: ['机械设计制造', '能源与动力工程', '车辆工程', '建筑环境与能源应用','测控技术与仪器','工业工程','其他'],
    电气工程学院: ['电气工程及其自动化', '电子信息工程', '电气工程与智能控制','其他'],
    经济管理学院: ['会计学','经济学','市场学', '工程与运营管理', '金融与财务学', '信息系统与运营管理','创新创业与管理学','其他'],
    外国语学院: ['英语', '日语', '德语', '法俄','翻译','工程英语','国际汉语','商务英语','其他'],
    交通运输与物流学院: ['交通运输', '交通工程', '物流工程', '物流管理','安全工程（运输安全）','其他'],
    材料科学与工程学院: ['材料科学与工程', '材料成型及控制工程', '生物医学工程','其他'],
    地球科学与环境工程学院: ['测绘工程', '地理信息科学', '地质工程','环境工程','消防工程','遥感科学与技术','其他'],
    建筑与设计学院: ['建筑学', '城乡规划', '风景园林', '环境设计','视觉传达设计','产品设计','绘画','其他'],
    物理科学与技术学院: ['应用物理学', '电子信息科学与技术','其他'],
    人文学院: ['汉语言文学', '传播学', '广告学', '音乐表演','其他'],
    公共管理与政法学院: ['公共管理', '政治学与行政学', '法学','其他'],
    生命科学与工程学院: ['生物工程类', '化学化工', ' 药学','其他'],
    力学与工程学院: ['工程力学', '飞行器设计与工程','其他'],
    数学学院: ['数学与应用数学', '统计学', '数据科学与大数据技术','其他'],
    马克思主义学院: ['思想政治教育','其他'],
    心理研究与咨询中心: ['应用心理学','其他'],
    利兹学院: ['土木工程', '机械设计制造', '电子信息工程', '计算机科学与技术','其他'],
    其他:['其他']
  };
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oldnj:"",
        oldxy:"",
        oldzy:"",
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
        xybottom: false,
        grades: ['2015','2016','2017','2018','2019','2020'],
        permmsion:false,
        disabled:true,
        zwmsdisable:true,
        msg:"修改信息",
        flag:1,
        xhError:"",
        lxfsError:"",
        nlError:"",
        num: 0,
        columns: [
            {
              values: Object.keys(majors),
              className: 'column1',
            },
            {
              values: majors['信息科学与技术学院'],
              className: 'column2',
            },
          ],
    },
    modifyBtn(e) {
        var openid = app.userInfo["_openid"]
        var id = app.userInfo["_id"]
        
        db.collection('users').where({_openid : openid}).get({}).then(res => {
               //如果查询成功的话  
                this.setData({
                    oldnj:res.data[0].nj,
                    oldxy:res.data[0].xy,
                    oldzy:res.data[0].zy
                })
               if(this.data['msg'] == "修改信息") 
                    this.setData({
                        flag:res.data[0].num
                    })

            if (res.data[0].num == 0) {
                if(this.data['msg'] == "修改信息")
                    Toast('您目前只能修改自我描述');
                  this.setData({
                    disabled:true,
                    zwmsdisable: false,
                    msg:"保存提交"
                });
                  
              } else{
                     if(this.data['msg'] == "修改信息")
                         Toast('您只有一次修改机会(自我描述不在此限制范围)');
                    this.setData({
                        disabled:false,
                        zwmsdisable: false,
                        msg:"保存提交"
                    });
                    if(this.data['oldnj'] != this.data['nj']|| this.data['oldxy'] != this.data['xy'] || this.data['oldzy'] != this.data['zy'])
                        this.setData({
                            flag: 0
                        })
                    
                }
                  if (this.data.permmsion != false)             
                  {   

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
                                  num: this.data.flag
                              }
                          }
                      }).then((res)=>{
                      
                    db.collection('users').where({
                        _id : app.userInfo["_id"]
                    }).get().then((res)=>{
                        app.userInfo = Object.assign(app.userInfo, res.data[0]);
                        if(this.data['nj'] == "" || this.data['xh'] == ""|| this.data['lxfs'] == ""|| this.data['xy'] == ""|| this.data['zy'] == ""|| this.data['nl'] == "") {
                            Toast.fail('必填不能为空');
                            return
                        }
                        else if(this.data['xhError'] != ""|| this.data['lxfsError'] != ""||this.data['nlError'] != "")
                        {
                            Toast.fail('请正确填写信息');
                            return
                        }
                            this.setData({
                                permmsion:false,
                                xh:app.userInfo['xh'],
                                nj:app.userInfo['nj'],
                                xy:app.userInfo['xy'],
                                zy:app.userInfo['zy'],
                                nl:app.userInfo['nl'],
                                lxfs:app.userInfo['lxfs'],
                                zwms:app.userInfo['zwms'],
                                num:app.userInfo['num']
                            })
                            
                            wx.reLaunch({
                                url: '../setting/setting',
                            });
                            Toast.success('修改信息成功!');
                           
                    });            
                })
            }
                this.setData({
                    permmsion:true
                });  
                

    })
},
    onCancel() {          //隐藏选择器
        this.setData({njbottom: false,xybottom: false})  
    },
    onConfirm(event) {    //点击选择器确认键   
        if(event.currentTarget.id == 'njpopup'){
            this.setData({
                njbottom: false,    
                nj: event.detail.value,
            });
        }
        else if(event.currentTarget.id == 'xypopup'){
            const { value, index } = event.detail;
            this.setData({
                xybottom:false,
                xy:value[0],
                zy:value[1],
            });
        }

    },
    onDectError(e) {
        switch(e.currentTarget.id){
            case "xh":{
                if (!(/(20)\d{8}/.test(e.detail.value))) {
                  this.setData({
                    xhError : "学号格式错误,请检查"
                   });             
                } else{
                  this.setData({
                     xhError : ""
                  });  
                }
            }break;
            case "lxfs":{
                if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(e.detail.value))) {
                  this.setData({
                    lxfsError : "手机号格式错误,请检查"
                   });             
                } else{
                  this.setData({
                     lxfsError : ""
                  });  
                }
            }break;
            case "nl":{
              if (!(/^[1-9]\d?/.test(e.detail.value))) {
                this.setData({
                  nlError : "年龄格式错误,请检查"
                 });             
              } else{
                this.setData({
                   nlError : ""
                });  
              }
          }break;
        }
      },
    showBottom(event){      //显示选择器
        if(event.currentTarget.id == 'nj')
            this.setData({njbottom: true})  
        else if(event.currentTarget.id == 'xy')
            this.setData({xybottom: true})   
    },
    cancelBtn(){
        this.setData({
            disabled:true,
            zwmsdisable:true,
            permmsion:false,
            msg:"修改信息",
        })
        wx.reLaunch({
          url: '../setting/setting',
        })
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const userinfo=wx.getStorageSync("userinfo");
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
        // this.setData({
        //     //userinfo:app.userInfo
        // });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().init();
        const userinfo=wx.getStorageSync("userinfo");
        // this.setData({userinfo});
        
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
    onChange(event) {
        // event.detail 为当前输入的值
        if(event.currentTarget.id == 'xypopup'){
            const { picker, value, index } = event.detail;
            picker.setColumnValues(1, majors[value[0]]);          
        }
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