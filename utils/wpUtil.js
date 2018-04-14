var wxParse = require('../wxParse/wxParse.js');

const loadPosts = function (url, page, keyword, onSuccess, onFail) {
  wx.request({
    url: url,
    data: {
      page: page,
      search: keyword
    },
    success: function (res) {
      console.debug("loadPosts success" + res);
      if (res.statusCode == 200) {
        var posts = buildPost(res.data);
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
      } else {
      }
    },
    fail: function (res) {
      console.debug("loadPost fail" + res);
    }
  });
}

const buildPost = function (res) {
  var posts = [];
  for (var i = 0; i < res.length; i++) {
    var post = {};
    post.title = res[i].title.rendered;
    post.desc = res[i].excerpt.rendered;
    post.time = res[i].date;
    post.id = res[i].id;
    console.log(post)
    posts.push(post);
  }
  return posts;
}


module.exports = {
  loadPosts: loadPosts
}