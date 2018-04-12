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
      type: String
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

  attached:function() {
    console.log(this.properties.desc);
    wxParse.wxParse('article', 'html', this.properties.desc, this, 5);
  },

  ready:function () {

  }

})
