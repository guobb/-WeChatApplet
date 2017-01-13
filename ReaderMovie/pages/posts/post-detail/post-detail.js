var postsData = require('../../../data/posts-data.js')
var app = getApp();

Page({
    data: {
        isPlayingMusic:false
    },
    onLoad: function(option){
    
        var postId = option.id;
        this.data.currentPostId = postId;
        var postData = postsData.postList[postId];

        this.setData({
            postData:postData
            
            })
        
    
        var postsCollected = wx.getStorageSync('posts_Collected');
        var collected;
        if(postsCollected){
            var postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected
            })
        }
        else{
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected',postsCollected);
        }

       if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){
           //this.data.isPlayingMusic = true;
           this.setData({
               isPlayingMusic: true
           })
       } 
       this.setAudioMonitor();
      
    },

    setAudioMonitor: function (){
        var that = this;
        wx.onBackgroundAudioPlay(function(){
            that.setData({
                isPlayingMusic : true
            })
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = that.data.currentPostId;
        })

        wx.onBackgroundAudioPause(function(){
            that.setData({
                isPlayingMusic : false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        })
    },

    onColletionTap:function(event){
       //同步方法调用
       this.getPostsCollectedSyc();
       //异步方法调用
       //this.getPostsCollectedAsy();
    },
    // 异步方法
    getPostsCollectedAsy: function(){
        var that = this;
        wx.getStorage({
            key:"posts_collected",
            success: function(res){
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId];
                // 收藏变成未收藏，未收藏变为收藏
                postCollected = !postCollected;

                postsCollected[that.data.currentPostId] = postCollected;
                that.showModal(postsCollected, postCollected);
            }
        })
    },
    // 同步方法
    getPostsCollectedSyc: function(){
        var postsCollected = wx.getStorageSync('posts_collected');
        var postCollected = postsCollected[this.data.currentPostId];
        // 收藏变成未收藏，未收藏变为收藏
        postCollected = !postCollected;

        postsCollected[this.data.currentPostId] = postCollected;
        this.showModal(postsCollected, postCollected);
    },

    showModal: function(postsCollected, postCollected){
        var that = this;
        wx.showModal({
            title: "收藏",
            content:postCollected? "收藏该文章?":"取消收藏该文章?",
            showCancel: "true",
            cancelText: "取消",
            canfirmText:"确认",
            confirmColor: "#405f88",
            success: function(res){
              if(res.confirm) {
                    // 更新文章是否的缓存值
                    wx.setStorageSync('posts_collected', postsCollected);
                    // 更新数据绑定变量，从而实现切换操作
                    that.setData({
                        collected: postCollected
                    })
              }
            }
        })
    },

    showToast: function(postsCollected,postCollected){
        // 更新文章是否的缓存值
        wx.setStorageSync('posts_collected', postsCollected);
        // 更新数据绑定变量，从而实现切换操作
        this.setData({
            collected: postCollected
        })

        wx.showToast({
            title:postCollected?'收藏成功':'取消收藏',
            duration: 1000,
            icon:"success"
        })
    },
        
   onShareTap: function(){
       var itemList = [
               "分享给微信好友",
               "分享到朋友圈",
               "分享到QQ",
               "分享到微博"
           ];
       wx.showActionSheet({
           itemList:itemList,
           itemColor:"#405f80",
           success: function(res){
               // res.cancel 用户是不是点击了取消按钮
               // res.tapIndex 数组元素的序号，从0开始 
               wx.showModal({
                   title:"用户" + itemList[res.tapIndex],
                   content:"用户是否取消?" +res.cancel+" 现在无法实现分享功能"
               })
           }
       })
   },

    onMudicTap: function(event){
        var currentPostId = this.data.currentPostId;
        var postData = postsData.postList[currentPostId]

        var isPlayingMusic = this.data.isPlayingMusic;
        if(isPlayingMusic){
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic:false
            })
           // this.data.isPlayingMuisc = false;
        }
        else{
             wx.playBackgroundAudio({
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImg: postData.music.coverImg,
             })
             this.setData({
                 isPlayingMusic: true
             })
             //this.data.isPlayingMuisc = true;
        }
       
        
    }   
})