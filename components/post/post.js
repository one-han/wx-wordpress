// components/post/post.js
var wxParse = require('../../wxParse/wxParse.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image: {
      type: String
    },
    title: {
      type: String
    },
    time: {
      type: String
    },
    desc: {
      type: String,
      observer: function (e) {
        wxParse.wxParse('article', 'html', e, this, 5);
      }
    },
    category: {
      type: String
    },
    likes: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
  },

})
