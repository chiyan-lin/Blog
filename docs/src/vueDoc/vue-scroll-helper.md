### vue-scroll-helper

> 一个基于 vue 的滚动组件

*WHY：写这个组件是在写一个无限滚动的列表，使用过其他组件感觉不够灵活，整老半天用起来还不是很方便。所以在react项目写完之后，觉得可以自己封一个更加完美的。其实类似的轮子网上有的是，但是还是觉得可以在造一个，并不是因为闲的发慌，是觉得这样可以锻炼自己考虑作为一个组件的全面性，怎么设置属性可以更好的适应各种场景啥的，一直都是在使用别人的组件，是时候自己动手弄一弄了。自己造轮子还可以根据自己的需要进行定制，多爽* ƪ(‾ε‾“)ʃƪ(


#### 例子[走起](https://kxd-test.yy.com/a/interfaces-201805-feat-mob/scrollHelper.html)
![](https://makefriends.bs2dl.yy.com/bm1534680729467.png)

#### 安装
```
npm install vue-scroll-helper --save
yarn add vue-scroll-helper --save

```

#### 参数
props|含义|类型|值
--|--|--|--
mod|使用无限滚动模式还是点击加载更多的模式|String|auto【默认】、manual【需要点击才会加载】
limit|最多翻到的页数|Number|0【默认无限滚动】
pageStart|滚动的起始页|Number|0【默认从0开始计数】
threshold|到达哪个阈值触发下一页|Number|250【页面底部到显示容器的距离】
isOver|是不是加载完了|Boolean|false
isAutoLoad|设置组件加载完成自动完成第一页的加载显示|Boolean|false
isInWindow|是不是以window作为显示容器，此时显示页面为html|Boolean|false
onLoadNextFn|触发加载下一页的回调函数【设置了pageStart 的话，此时的回调返回 pageStart+1 】|Function|必设【回调参数返回下一页页码】
wrapStyle|显示容器的样式|Object| {}
wrapClass|显示容器的样式|Object/String| ''
list|你的 v-for 列表|slot| 必设
loading|自定义显示的加载的样式|slot| Loading...
loadMore|自定义点击加载更多的样式|slot| Click To Load More
noMore|自定义没有更多的样式|slot| No More

#### 简约
```
<template>
  <div id="app">
    <vueScrollHelper
      :isOver="isOver"
      wrapClass="youclass"
      :onLoadNextFn="onLoadNextFn">
      <template slot="list">
        <div v-for="(v, i) in client" :key="i" class="item">
          {{v}}
        </div>
      </template>
      <template slot="loading">
        <div style="width:100%;text-align:center">加载中</div>
      </template>
      <template slot="loadMore">
        <div style="width:100%;text-align:center">点击加载更多</div>
      </template>
      <template slot="noMore">
        <div style="width:100%;text-align:center">我是有底线的</div>
      </template>
    </vueScrollHelper>
  </div>
</template>

<script>
import vueScrollHelper from '@/component/vue-scroll-helper'

export default {
  name: 'app',
  data () {
    return {
      client: [],
      count: 10,
      logMsgs: '',
      isOver: true
    }
  },
  components: {
    vueScrollHelper
  },
  created () {
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    async onLoadNextFn (page) {
      console.log('加载下一页', page)
      var data = []
      for (var i = 0, j = 10; i < j; i++) {
        data.push(this.count++);
      }
      await new Promise(function (fulfill) {
        setTimeout(fulfill, 2000)
      })
      if (this.client.length >= 40) {
        this.isOver = false
      } else {
        this.client = this.client.concat(data)
      }
    }
  }
}
</script>

<style lang="scss">

</style>

```


#### 使用姿势
```
<template>
  <div id="app">
    <vueScrollHelper
      mod="auto"
      :wrapStyle="{height:'500px', border: '1px solid red'}"
      :isOver="isOver"
      wrapClass="bg"
      :onLoadNextFn="onLoadNextFn"
      :isAutoLoad="true"
      :limit="0"
      :threshold="250"
      :isInWindow="false"
      :pageStart="0">
      <template slot="list">
        <div v-for="(v, i) in client" :key="i" class="item">
          {{v}}
        </div>
      </template>
      <template slot="loading">
        <div style="width:100%;text-align:center">加载中</div>
      </template>
      <template slot="loadMore">
        <div style="width:100%;text-align:center">点击加载更多</div>
      </template>
      <template slot="noMore">
        <div style="width:100%;text-align:center">我是有底线的</div>
      </template>
    </vueScrollHelper>
  </div>
</template>

<script>
import vueScrollHelper from '@/component/vue-scroll-helper'

export default {
  name: 'app',
  data () {
    return {
      client: [0,1,2,3,4,5,6,7,8,9],
      count: 10,
      logMsgs: '',
      isOver: true
    }
  },
  components: {
    vueScrollHelper
  },
  created () {
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    async onLoadNextFn (page) {
      console.log('加载下一页', page)
      var data = []
      for (var i = 0, j = 10; i < j; i++) {
        data.push(this.count++);
      }
      await new Promise(function (fulfill) {
        setTimeout(fulfill, 2000)
      })
      if (this.client.length >= 40) {
        this.isOver = false
      } else {
        this.client = this.client.concat(data)
      }
    }
  }
}
</script>

<style lang="scss">
html,body {
  border: 0;
  margin: 0;
  padding: 0;
}

.bg {
  background: pink;
}

.item {
  width: 100%;
  height: 100px;
  border: 1px solid #bbb;
  margin-bottom: 10px;
}

</style>

```

#### 检测原理
![](https://makefriends.bs2dl.yy.com/bm1534673858922.png)

#### 优点

1、支持直接滚动到底部加载和滚动到底部出现按钮点击加载

2、使用 vue-scroll-helper 不需要自己在组件中控制 loading 的显示，vue-scroll-helper 已经自己实现检测 slot=list 的节点变化，不会重复触发设置的加载下一页的回调函数

3、更加丰富的设置项

#### 不足

* 觉得在检测 slot = list 这个的变化上，我用的是 [MutationObserver](https://caniuse.com/#search=MutationObserver) 检测节点变化 ，似乎兼容性一般，这个后面再看。

#### 对比

*没有对比，那写这个组件有什么说服力，拿组内一直在使用的 vue-infinite-scroll 来互相伤害，从别人的源码还是看到一些有意思的实现，文末有总结*

1、实现姿势

vue-scroll-helper|vue-infinite-scroll
--|--
使用组件加载的形式，直接import到项目|使用 Vue.directive 的方式处理

2、检测到达阈值的实现

基本的实现方式没大差别，只是获取滚动元素上看到了一段有意思的代码

* 拿到容器后 vue-infinite-scroll 这样去获取节点

```
var getScrollEventTarget = function (element) {
  var currentNode = element;
  // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    var overflowY = getComputedStyle(currentNode).overflowY;
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return window;
}
```
* 拿到容器后 vue-scroll-helper 这样去获取节点

```
// 因为我是直接把容器放在我的组件里面的，组件有个属性 ref="wrap"
var getScrollEventTarget = this.$refs.wrap

```

3、功能区别
vue-scroll-helper|vue-infinite-scroll
--|--
支持使用window作为容器层|从文档和源码看起来似乎不支持，有不同看法的可以来diss我
不需要控制loading的状态|需要控制loading的状态，列表没了页需要手动添加控制nomore的显示

4、代码上
发现人家代码里面设置变量有 var 和 const 交叉使用，强迫症看起来很难受

。。。

#### 思考
* 在指令里面监听组件的姿势
```
  // bind是directive的钩子 https://cn.vuejs.org/v2/guide/custom-directive.html
  bind(el, binding, vnode) {
    el[ctx] = {
      el,
      vm: vnode.context,
      expression: binding.value
    };
    const args = arguments;
    console.log(el['@@oIo'], binding, vnode)
    ** 就是这里，我不截出去了 **
    el[ctx].vm.$on('hook:mounted', function () {
      el[ctx].vm.$nextTick(function () {
        // 判断元素是不是已经挂载
        if (isAttached(el)) {
          doBind.call(el[ctx], args);
        }
        el[ctx].bindTryCount = 0;
        var tryBind = function () {
          if (el[ctx].bindTryCount > 10) return; //eslint-disable-line
          el[ctx].bindTryCount++;
          if (isAttached(el)) {
            doBind.call(el[ctx], args);
          } else {
            setTimeout(tryBind, 50);
          }
        };
        tryBind();
      });
    });
  },
```
2、在组件加载的时候看看有没有 vue 这个对象，有的话直接 install
```
const install = function(Vue) {
  Vue.directive('InfiniteScroll', InfiniteScroll);
};

if (window.Vue) {
  ** 这里有个问题，为什么要挂载window对象上面 **
  window.infiniteScroll = InfiniteScroll;
  Vue.use(install); // eslint-disable-line
}

InfiniteScroll.install = install;
```
