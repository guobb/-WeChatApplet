var util = require('../../utils/util.js');
//引入全局变量
var app = getApp();

// pages/movies/movies.js
Page({
  data:{
    inTheaters:{},
    comingSon:{},
    top250:{}
  },
  onLoad:function(event){
    var inTheatersUrl = app.globalData.doubanBase +  "/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +  "/v2/movie/coming_soon"+"?start=0&count=3";
    var top250Url = app.globalData.doubanBase +  "/v2/movie/top250"+"?start=0&count=3";
    
    this.getMovieListData(inTheatersUrl, "inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl, "comingSon","即将上映");
    this.getMovieListData(top250Url, "top250","豆瓣top250");
  },
  getMovieListData: function(url, settedKey, catetoryTitle){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type":"application/xml"
      },
      success: function(res){
        // success
        console.log(res)
        that.processDoubanData(res.data,settedKey, catetoryTitle);
      },
      fail: function() {
        // fail
        console.log('调用失败')
      },
      complete: function() {
        // complete
      }
    })

  },

  processDoubanData:function(moviesDouban, settedKey, catetoryTitle){
    var movie = [];
    for(var idx in moviesDouban.subjects){
        var subject = moviesDouban.subjects[idx];
        console.log(subject)
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
    var readyData = {};
    readyData[settedKey] = {
      catetoryTitle:catetoryTitle,
      movie:movie

    }
  
    this.setData(readyData)
  
  },
   
})