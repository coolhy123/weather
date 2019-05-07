const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    showday: ['今天', '明天', ''],
    weatherImg:{
      qing:"",
      yin:"",
      yu:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var date = new Date();
    //设置数组第三个是周几
    that.setData({
      'showday[2]': this.data.weekday[(date.getDay() + 2) % 7],
    });
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
    var that = this;
    // var city = app.globalData.defaultCity.slice(0, 2);
    var city = app.globalData.defaultCity;
    console.log("天气页面1")
    console.log(app.globalData.defaultCity)

    that.setData({
      city: app.globalData.defaultCity, //今天天气情况数组 
      district: app.globalData.defaultCounty //生活指数
    });
    that.getWeather(city);//获得天气
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
    
  },

  //从全局变量直接获取天气信息，首页加载时存的
  getWeather: function (city) {
    console.log("天气页面")
    console.log(app.globalData.weatherData)
    var that = this;
    that.setData({
      now: app.globalData.weatherData.now, //今天天气情况数组 
      forecast: app.globalData.weatherData.daily_forecast,
      quality: app.globalData.weatherData.aqi

    });
  },

})