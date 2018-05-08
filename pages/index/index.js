//index.js
var wpUtil = require('../../utils/wpUtil.js');

//获取应用实例
const app = getApp();
var postsUrl = app.globalData.server + 'wp/v2/posts';

var param = {
  page: 1,
  keyword: ""
};

var hasMore = true;

Page({
  data: {
    posts: [],
  },


  onSuccess: function (result) {
    for (var i = 0; i < result.length; i++) {
      this.data.posts.push(result[i]);
    }
    hasMore = result.length == 10
    this.setData({
      posts: this.data.posts,
    })
  },

  onFail: function (result) {
    if (result.data) {
      if (result.data.code == 'rest_post_invalid_page_number') {
        hasMore = false;
      }
    } else {
      wx.showToast({
        title: '网络开小差了',
        icon: 'none'
      })
    }
  },

  onSearch: function (e) {
    this.data.posts = [];
    param.page = 1;
    param.keyword = e.detail
    hasMore = true;
    wpUtil.loadPosts(postsUrl, param, this.onSuccess, this.onFail);
    param.page++;
  },

  onLoad: function () {
    wpUtil.loadPosts(postsUrl, param, this.onSuccess, this.onFail);
    param.page++;
  },

  onPullDownRefresh: function () {
    this.data.posts = [];
    param.page = 1;
    hasMore = true;
    wpUtil.loadPosts(postsUrl, param, this.onSuccess, this.onFail);
    param.page++;
    wx.stopPullDownRefresh()
  },

  onReachBottom: function () {
    console.debug("has more" + this.data.hasMore);
    if (hasMore) {
      wpUtil.loadPosts(postsUrl, param, this.onSuccess, this.onFail);
      param.page++;
    } else {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
    }
  }

})