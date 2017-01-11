Page({
  data:{
    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var posts_content = [
        {
            date:"Sep 18 2016",
            title: "正是虾肥蟹壮时",
            post_img: "/images/post/crab.png",
            author_img: "/images/avatar/1.png",
            content: "菊黄蟹正肥肥品，尝秋之味",
            view_num: "112",
            collect_num: "96"
        },
        {
            date:"Nov 25 2016",
            title: "比利林嫩中场故事",
            post_img: "/images/post/bl.png",
            author_img: "/images/avatar/2.png",
            content: "李安是位绝不重复自己的导演",
            view_num: "112",
            collect_num: "90"
        }
    ]

    this.setData({post_key:posts_content})
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    //console.log('onReady');
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
   // console.log('onShow');
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
   // console.log('onHide')
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
   // console.log('onUnload')
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    //console.log('onPullDownRefresh')
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
   // console.log('onReachBottom')
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})