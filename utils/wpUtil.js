var wxParse = require('../wxParse/wxParse.js');

const loadAllPosts = function (url, page, keyword, onSuccess, onFail) {
  wx.request({
    url: url,
    data: {
      page: page,
      search: keyword
    },
    success: function (res) {
      console.debug("loadAllPosts success" + res);
      if (res.statusCode == 200) {
        var posts = buildPost(res.data);
        onSuccess(posts);
      } else {
        onFail(res);
      }
    },
    fail: function (res) {
      console.debug("loadAllPosts fail" + res);
      onFail(res);
    }
  });
};

const buildPost = function (res) {
  var posts = [];
  for (var i = 0; i < res.length; i++) {
    var post = {};
    post.title = res[i].title.rendered;
    post.desc = res[i].excerpt.rendered;
    post.time = res[i].date;
    post.url = res[i].link;
    posts.push(post);
  }
  return posts;
}


module.exports = {
  loadAllPosts: loadAllPosts
}