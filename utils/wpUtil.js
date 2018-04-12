var wxParse = require('../wxParse/wxParse.js');

const loadAllPosts = function (url, page, onSuccess, onFail) {
  wx.request({
    url: url,
    data: {
      page: page
    },
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200) {
        var posts = buildPost(res.data);
        onSuccess(posts);
      } else {
        onFail(res);
      }
    },
    fail: function (res) {
      console.log(res);
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