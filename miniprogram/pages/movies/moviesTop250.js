const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: app.globalData.defaultCity,
    navbar: ['正在热映', '即将上映', '评分最高', '更多>>'],
    currentTab: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm = this
    vm.city = app.globalData.defaultCity
    console.log(vm.city)
  
    var top250Url = 'https://douban.uieee.com/v2/movie/top250?' + vm.city + 'start=0&count=6'   //豆瓣电影top250

    this.getMovies(top250Url, "top250", "即将上映")
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

  getMovies: function (movieurl, settedKey, categoryTitle) {
    var vm = this
    wx.showNavigationBarLoading();
    wx.request({
      url: movieurl,

      header: {
        "Content-Type": "json"
      },
      success(res) {

        if (res.statusCode == 200) {
          console.log("查询电影成功")
          console.log(res)
          vm.processDoubanData(res.data, settedKey, categoryTitle)
        }
      },
      fail(res) {
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

  processDoubanData: function (moviseData, settedKey, categoryTitle) {
    var vm = this
    var movies = [];
    for (var idx in moviseData.subjects) {
      var subject = moviseData.subjects[idx];
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        movieId: subject.id,
        coverageUrl: subject.images.large,
        genres: subject.genres,//类型
        actors: subject.casts,//演员
        count: subject.collect_count

      }
      movies.push(temp)
    }

    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    vm.setData({
      readyData: readyData,
      movies: movies
    });
    console.log(readyData)
    wx.hideNavigationBarLoading();


  },

  //导航监听事件
  navbarTap: function (e) {
    console.log(e);
    var vm = this
    if (e.target.dataset.idx == 0) {
      console.log("电影")
      wx.navigateTo({
        url: '../movies/movies',
      })

    } else if (e.target.dataset.idx == 1) {
      wx.navigateTo({
        url: '../movies/moviesSoon',
      })
    } else if (e.target.dataset.idx == 3) {
      wx.navigateTo({
        url: '../movies/more/moreMovies',
      })
    }
    vm.setData({
      currentTab: e.currentTarget.dataset.idx
    })

  },

})