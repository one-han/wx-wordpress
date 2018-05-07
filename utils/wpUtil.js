var wxParse = require('../wxParse/wxParse.js');

const loadPosts = function (url, page, keyword, category, onSuccess, onFail) {
  wx.request({
    url: url,
    data: {
      page: page,
      search: keyword,
      categories: category
    },
    success: function (res) {
      console.debug("loadPosts success" + res);
      if (res.statusCode == 200) {
        var posts = buildPosts(res.data);
        onSuccess(posts);
      } else {
        onFail(res);
      }
    },
    fail: function (res) {
      console.debug("loadPosts fail" + res);
      onFail(res);
    }
  });
};

const loadPost = function (url, onSuccess, onFail) {
  wx.request({
    url: url,
    data: {
    },
    success: function (res) {
      console.debug("loadPost success" + res);
      if (res.statusCode == 200) {
        var post = buildPost(res.data);
        onSuccess(post);
      } else {
        onFail(res);
      }
    },
    fail: function (res) {
      console.debug("loadPost fail" + res);
    }
  });
}

const buildPosts = function (res) {
  var posts = [];
  for (var i = 0; i < res.length; i++) {
    var post = {};
    post.title = res[i].title.rendered;
    post.desc = res[i].excerpt.rendered;
    post.time = res[i].date;
    post.id = res[i].id;
    posts.push(post);
  }
  return posts;
}

const buildPost = function (res) {
  var post = {};
  post.title = res.title.rendered;
  post.content = res.content.rendered;
  post.time = res.date;
  post.id = res.id;
  return post;
}

const loadCategories = function (url, onSuccess, onFail) {
  wx.request({
    url: url,
    data: {
    },
    success: function (res) {
      console.debug("loadCategories success" + res);
      if (res.statusCode == 200) {
        var categories = buildCategories(res.data);
        onSuccess(categories);
      } else {
        onFail(res);
      }
    },
    fail: function (res) {
      console.debug("loadCategories fail" + res);
    }
  });
}

const buildCategories = function (res) {
  var categories = [];
  for (var i = 0; i < res.length; i++) {
    var category = {};
    category.name = res[i].name;
    category.count = res[i].count;
    categories.push(category);
  }
  return categories;
}

module.exports = {
  loadPosts: loadPosts,
  loadPost: loadPost,
  loadCategories: loadCategories
}