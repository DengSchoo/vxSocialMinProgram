// pages/create_mom/create_mom.js
const app = getApp();
const db = wx.cloud.database();
var util = require('utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        imgList: [],
        textareaAValue :""
    },

    getRandomStr(len){
      len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
    },

    post(moments) {
        db.collection('moments').add({
            data:{
                nickName: moments.nickName,
                avatarUrl: moments.avatarUrl,
                content: moments.textareaAValue,
                imgList: moments.images,
                content: moments.content,
                time:moments.time,
                device:moments.device
            }
          }).then((res)=>{
            setTimeout(function(){  }, 500);
              wx.reLaunch({
                url: '../moments/moments',
              })
          });
    },


    postBtn(e) {
        const that = this;
        if (this.data.textareaAValue.length == 0 || this.data.imgList.length == 0) {
            wx.showModal({
                title: '提示',
                content: '内容和照片不能为空 ',
                confirmText: '确定',})
            return
        }

        let device = "";
        const res = wx.getSystemInfoSync();
        device = res.brand + res.model;
        var currenTime= util.formatTime(new Date());
        

        const moments = {
            time : currenTime,
            device : device,
            nickName: app.userInfo['nickName'],
            openid: app.userInfo['_openid'],
            avatarUrl: app.globalData['userPhoto'],
            content: this.data.textareaAValue
        }

        // 上传图片获取云存储路径
        const cloudUrl = [];
        wx.showLoading({
          title: '请稍后....',
        })
        if(that.data.imgList.length > 0) {
          
            that.data.imgList.forEach((value, index) => {
              const cloudPath = "moments/"  + app.userInfo['_openid'] + Math.random().toString(36).slice(-6) + ".jpg";
                wx.cloud.uploadFile({
                    filePath: value,
                    cloudPath: cloudPath,
                    success: res => {
                        cloudUrl.push(res.fileID);
                        if (cloudUrl.length == that.data.imgList.length) {
                            moments.images = cloudUrl;
                            that.post(moments);
                            wx.hideLoading({});
                            wx.showToast({
                              title: '图片上传完成',
                            })
                        }
                    }
                })
            })
        }


    },
    ChooseImage() {
        wx.chooseImage({
          count: 9, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            if (this.data.imgList.length != 0) {
                
              this.setData({
                imgList: this.data.imgList.concat(res.tempFilePaths)
              })
            } else {
                                                                                                                                                                                                                                                                                                                                                           
              this.setData({
                imgList: res.tempFilePaths
              })
            }
          }
        });
      },
      ViewImage(e) {
        wx.previewImage({
          urls: this.data.imgList,
          current: e.currentTarget.dataset.url
        });
      },
      DelImg(e) {
        wx.showModal({
          title: '',
          content: '确定要删除这张照片',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              this.data.imgList.splice(e.currentTarget.dataset.index, 1);
              this.setData({
                imgList: this.data.imgList
              })
            }
          }
        })
      },
      textareaAInput(e) {
        this.setData({
          textareaAValue: e.detail.value
        })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        wx.reLaunch({
            url: '../moments/moments',
          })
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