//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqMap = new QQMapWX({
  key: 'UMCBZ-DI6C4-JHEUD-XWNJ6-PV2SH-EBBX2' 
});
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    county: app.globalData.defaultCounty,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
var page =this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }



    wx.getLocation({
      success: function (res) {
        // console.log("getLocation--" + res.latitude +" --  "+ res.longitude +"---"+ res.speed + res.accuracy)
        var latitude = res.latitude
        var longitude = res.longitude
        qqMap.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            page.setData({
              county: res.result.address_component.district,
            
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });

     
      }
    })

  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function () {
    var data = app.globalData.defaultCounty
    if(data!=null){
      this.setData({
        county: data


      })
    }
   
  },
  addressClick:function(e){
    wx.showLoading({
      title: '跳转中',
    })
      wx.navigateTo({
        url: '../switchcity/switchcity',
        complete: function () {
          wx.hideLoading()
        }
      })
      

  }
})
