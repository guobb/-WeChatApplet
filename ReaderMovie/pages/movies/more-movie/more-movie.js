var app = getApp();
var util = require('../../../utils/util.js');

// pages/movies/more-movie/more-movie.js
Page({
  data:{
    movie:{},
    navigateTitle:"",
    requestUrl:"",
    totalCount:0,
    isEmpty:true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
  },

  onScrollLower: function(event){
    var nextUrl = this.data.requestUrl + 
    "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh: function(event){
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  processDoubanData:function(moviesDouban){
    var movie = [];
    for(var idx in moviesDouban.subjects){
        var subject = moviesDouban.subjects[idx];
        //console.log(subject)
        var title = subject.title;
        if(title.length >= 6){
          title = title.substring(0,6) + '...';
        }
        var temp = {
          title: title,
          average: subject.rating.average,
          coverageUrl: subject.images.large,
          movieId: subject.id,
          stars: util.convertToStarArray(subject.rating.stars)
        }
        movie.push(temp);
    }
    var totalMovies = {};
   
    if(!this.data.isEmpty){
      totalMovies = this.data.movie.concat(movie);
    }
    else{
      totalMovies = movie;
      this.data.isEmpty = false;
    }
    this.setData({
      movie:totalMovies
    });
     this.data.totalCount += 20;
     wx.hideNavigationBarLoading();
     wx.stopPullDownRefresh();
  },

  onReady: function(event){
  wx.setNavigationBarTitle({
    title:this.data.navigateTitle,
    success:function(res){

    }
      })
  },
  onMovieTop: function (event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url:'../movie-detail/movie-detail?id=' + movieId
    })
  }

})