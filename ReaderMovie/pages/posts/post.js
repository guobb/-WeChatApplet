var postData = require('../../data/posts-data.js')

Page({
  data:{
    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
    this.setData({
        post_key:postData.postList
        })
  },

  onPostTop:function(event){
      var postId = event.currentTarget.dataset.postid;
     // console.log('onposttap')
      wx.navigateTo({
        url: 'post-detail/post-detail?id=' + postId
        
      })
  }
})

