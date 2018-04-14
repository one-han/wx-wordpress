// pages/article/article.js
var wpUtil = require('../../utils/wpUtil.js');
var wxParse = require('../../wxParse/wxParse.js');

//获取应用实例
const app = getApp()
var postUrl = app.globalData.server + '/wp-json/wp/v2/posts/';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: ""
  },

  onSuccess: function (result) {
    console.log(result);
    this.setData({
      title: result.title
    })
    wxParse.wxParse('article', 'html', result.content, this, 5);
  },

  onFail: function (result) {
    if (result.data.code == 'rest_post_invalid_page_number') {
      this.data.hasMore = false;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = postUrl + options.id
    wpUtil.loadPost(url, this.onSuccess, this.onFail)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})