//index.js
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
const app = getApp()



Page({
  data: {
    title: '\u559c\u95fbLet&#8217;s Encrypt\u652f\u6301\u901a\u914d\u7b26Https\u8bc1\u4e66',
    desc: '<p>3\u670815\u65e5\uff0cLet&8217;s Encrypt\u5ba3\
u5e03\u652f\u6301\u901a\u914d\u7b26Https\u8bc1\u4e66\u4e86\uff0c\u559c\u6b22\u66f4\u65b0\u7684\u6211\u53c8\u5fcd\u4e0d\u4f4f\u6298\u817e\u4e00\u4e0b\u3002<\/p>\n<p>https:\/\/certbot.eff.org\/lets-encrypt\/centosrhel7-nginx<\/p>\n<p>\u8fd9\u662f\u5b98\u7f51\u6559\u7a0b\uff0c\u9047\u5230\u5b89\u88c5dns plugins\u7684\u65f6\u5019\u5361\u58f3\u4e86\uff0c\u4e0d\u77e5\u9053\u662f\u4f55\u7269\u3002\u7f51\u4e0a\u641c\u4e86\u4e00\u4e0b\uff0c\u627e\u5230\u5982\u4e0b\u9b54\u6cd5\u8bed\u53e5\uff1a<\/p>\n<pre class=\"hljs bash\"><code>.\/certbot-auto --server https:\/\/acme-v02.api.letsencrypt.org\/directory <span class=\"hljs-_\">-d<\/span> <span class=\"hljs- string\">\"*.xxx.com\"<\/span> --manual --preferred-challenges dns-01 certonly<\/code><\/pre>\n<div>\u6539\u5199\u4e00\u4e0b<\/div>\n<pre>certbot --server https:\/\/acme-v02.api.letsencrypt.org\/directory \\\n-d *.waha.me -d waha.me \\\n--manual --preferred-challenges dns-01 certonly<\/pre>\n<p>\u4e2d\u9014\u9047\u5230\u63d0\u793a\u9700\u8981\u4fee\u6539\u4e00\u4e0bDNS\uff0c\u52a0\u5165\u4e24\u4e2aTXT\u89e3\u6790\uff0c\u641e\u5b9a\u3002\u5b8c\u7f8e\uff01 <\/p>\n',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function () {
    wx.showToast({
      title: 'Hello',
    })
  },
  onLoad: function () {
    var article = '<p>3\u670815\u65e5\uff0cLet&#8217;s Encrypt\u5ba3\u5e03\u652f\u6301\u901a\u914d\u7b26Https\u8bc1\u4e66\u4e86\uff0c\u559c\u6b22\u66f4\u65b0\u7684\u6211\u53c8\u5fcd\u4e0d\u4f4f\u6298\u817e\u4e00\u4e0b [&hellip;]<\/p>\n';
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    var that = this;
    WxParse.wxParse('article', 'html', article, that, 0);

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onPullDownRefresh: function () {
    wx.showToast({
      title: 'Hello Top',
    })
  },
  onReachBottom: function () {
    wx.showToast({
      title: 'Hello Button',
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
