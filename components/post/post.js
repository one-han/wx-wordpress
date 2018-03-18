// components/post/post.js
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

  ready:function () {
    this.setData({
      image: base64.icon20,
    });
  }

})
