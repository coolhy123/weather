const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: app.globalData.defaultCity
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(city)
    var inTheatersUrl = 'https://api.douban.com/v2/movie/in_theaters?start=0&count=6'   //豆瓣即将上映得电影
    var comingSoonUrl = 'https://douban.uieee.com/v2/movie/coming_soon?start=0&count=6'  //豆瓣正在热映得电影
    var top250Url = 'https://douban.uieee.com/v2/movie/top250?start=0&count=6'   //豆瓣电影top250

    this.getMovies(inTheatersUrl,"inTheaters", "正在热映")
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

  getMovies: function (movieurl, settedKey, categoryTitle){
    var vm = this
    wx.showNavigationBarLoading();
    wx.request({
      url: movieurl,
     
      header:{
        "Content-Type": "json"
      },
      success(res){
        
        if (res.statusCode == 200 && settedKey =='inTheaters'){
          console.log("查询电影成功")
          console.log(res)
          vm.processDoubanData(res.data, settedKey, categoryTitle)
        } else if (res.statusCode == 200 && settedKey == 'inTheaters'){

        }
      },
      fail(res){
        // wx.showModal({
        //   title: '',
        //   content: '加载数据失败！！',
        //   success: function (res) {
        //     if (res.confirm) {
        //       wx.navigateTo({
        //         url: '../home/home',
        //       })

        //     }
        //     }
        // })
      }
    })

 },

  processDoubanData: function (moviseData, settedKey, categoryTitle){}
})