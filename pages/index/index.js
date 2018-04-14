//index.js
var wpUtil = require('../../utils/wpUtil.js');

//获取应用实例
const app = getApp()
var postUrl = app.globalData.server + '/wp-json/wp/v2/posts';

Page({
  data: {
    posts: [],
    page: 1,
    keyword: "",
    hasMore: true,
  },


  onSuccess: function (result) {
    for (var i = 0; i < result.length; i++) {
      this.data.posts.push(result[i]);
    }
    this.setData({
      posts: this.data.posts,
      hasMore: result.length == 10
    })
  },

  onFail: function (result) {
    if (result.data.code == 'rest_post_invalid_page_number') {
      this.data.hasMore = false;
    }
  },

  onSearch: function(e) {
    this.data.posts = [];
    this.data.page = 1;
    this.data.hasMore = true;
    this.data.keyword = e.detail
    wpUtil.loadAllPosts(postUrl, this.data.page, this.data.keyword, this.onSuccess, this.onFail);
    this.data.page++;
  },

  onLoad: function () {
    wpUtil.loadAllPosts(postUrl, this.data.page, this.data.keyword, this.onSuccess, this.onFail);
    this.data.page++;
  },

  onPullDownRefresh: function () {
    this.data.posts = [];
    this.data.page = 1;
    this.data.hasMore = true;
    wpUtil.loadAllPosts(postUrl, this.data.page, this.data.keyword, this.onSuccess, this.onFail);
    this.data.page++;
    wx.stopPullDownRefresh()
  },

  onReachBottom: function () {
    console.debug("has more" + this.data.hasMore);
    if (this.data.hasMore) {
      wpUtil.loadAllPosts(postUrl, this.data.page, this.data.keyword, this.onSuccess, this.onFail);
      this.data.page++;
    } else {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
    }
  }

})