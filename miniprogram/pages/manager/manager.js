const app = getApp()
var bmap = require('../../js/bmap-wx.min.js');
var day = ["今天", "明天", "后天"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: day,
    today:"",
    navbar: ['天气', '电影', '交通', '更多>>'],
    currentTab: 0,
    imgUrl:[
          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1579515538,324936754&fm=26&gp=0.jpg",
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1684773360,1787347359&fm=26&gp=0.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557142014907&di=5b0d6a255e70be98fce69c4ddf01f260&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1506%2F16%2Fc71%2F8523875_1434464825745_mthumb.jpg"
    ],
    latitude:"",
    longitude:"",
    localdata:{
      country:"",
      province:"",
      city:"",
      district:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm =this;
    var today = app.globalData.day;
    vm.setData({
      today: today
    })
   vm.getLocation();
    // this.getLocal(this.latitude, this.longitude)
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
    return {
      title: '益 生活',
      desc: '分享个小程序，希望你喜欢☺️~',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "分享成功",
          duration: 1000,
          icon: "success"
        })
      }
    }
  },

  // 导航切换监听
  navbarTap: function (e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
getMap:function(){

  wx.createMapContext({
    success: res => {
      console.log("ssssss")
      console.log(res)
  }
})
},

  navbarTap:function(ss){
    if (ss.target.dataset.idx == 1){
    console.log("电影")
    wx.navigateTo({
      url: '../movies/movies',
    })

    }
if(ss.target.dataset.idx==2){
  wx.getLocation({
    type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
    success(res) {
      const latitude = res.latitude
      const longitude = res.longitude
      wx.openLocation({
        latitude,
        longitude,
        scale: 18
      })
    }
  })
    } if (ss.target.dataset.idx == 3) {

    }else{

    }
  },
  // 获取经纬度
  getLocation:function(){
var vm=this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
       
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        // vm.latitude=latitude
        // vm.longitude=longitude
        vm.getLocal(latitude, longitude)
      }, 
   

      
    })

  },

/**
 * 获取当前位置
 */
  getLocal: function (latitude, longitude){
 
    var vm = this
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "NmosY34Cm6Ggqykozf7XUWWFgP4Drd6T",
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data:params,
      success(res){
       
        if(res!=null&&res.data.status==0){
          const country = res.data.result.addressComponent.country
          const province = res.data.result.addressComponent.province
          const city = res.data.result.addressComponent.city
          const district = res.data.result.addressComponent.district

          //设置全局的默认城市
          app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity : res.data.result.addressComponent.city;
          app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty : res.data.result.addressComponent.country;
          vm.setData({
            country:country,
            province:province,
            city: city,
            district, district
            
          })
          var descCity = city.substring(0, city.length - 1);
          // console.log("城市截取"+descCity)
          vm.getWeather(descCity)
          // console.log(country + " " + province + " " + " " + city + " " + district)
        }else{
          wx.showModal({
            title: '获取位置信息失败',
            content: '是否退出再进一次',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../home/home',
                })
                
              } else if(res.cancel){

              }
            }
          })
        }
        

       
      }
    })
  },
  /**
   * 更改当前位置
   */
  jump:function(){
    var vm=this
    wx.chooseLocation({
      success: function(res) {
        // console.log("更改之后的信息")
        // console.log(res)
        if (res.errMsg ="chooseLocation:ok"){
          const latitude = res.latitude
          const longitude = res.longitude

          vm.setData({
            latitude:latitude,
            longitude:longitude 
          })
          //更改地址之后再次调用获取城市函数
          vm.getLocal(latitude, longitude)
          
        }
      
      },
    })
  },
  /**
   * 获取天气函数
   */

    getWeather:function(city){
      var vm = this
      var url = "https://free-api.heweather.com/v5/weather"
      var params = {
        city: city,
        key: "894fc2a749104d679fa022c3e71afe83"
      }
      wx.request({
        url: url,
        data:params,
        success(res) {
          console.log(res)
          var tmp = res.data.HeWeather5[0].now.tmp; //温度
          var txt = res.data.HeWeather5[0].now.cond.txt; //天气  晴
          var code = res.data.HeWeather5[0].now.cond.code; //
          var qlty = res.data.HeWeather5[0].aqi.city.qlty;//空气质量
          var dir = res.data.HeWeather5[0].now.wind.dir;  //风向
          var sc = res.data.HeWeather5[0].now.wind.sc; //风级
          var hum = res.data.HeWeather5[0].now.hum;   //相对湿度
          var pm25 = res.data.HeWeather5[0].aqi.city.pm25; //pm2.5
          var fl = res.data.HeWeather5[0].now.fl;  //体感温度
          var trav = res.data.HeWeather5[0].suggestion.trav.txt //旅游指数
          var daily_forecast = res.data.HeWeather5[0].daily_forecast;
          app.globalData.weatherData = res.data.HeWeather5[0].status == "unknown city" ? "" : res.data.HeWeather5[0];
          var weatherData = app.globalData.weatherData ? app.globalData.weatherData.now : "暂无该城市天气信息";
          var dress = app.globalData.weatherData ? res.data.HeWeather5[0].suggestion : { txt: "暂无该城市天气信息" };
          vm.setData({
            tmp: tmp,
            txt: txt,
            code: code,
            qlty: qlty,
            dir: dir,
            sc: sc,
            hum: hum,
            fl: fl,
            trav:trav,
            daily_forecast: daily_forecast
          })
        },
        fail(res){
          console.log("获取信息失败")
        }
      })
    

    },
  gotoWeather:function(){
    wx.navigateTo({
      url: '../weather/weather',
    })

  }



 
})