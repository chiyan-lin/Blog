
## post 和 get的那些事


### get 和 post 的小区别
* GET在浏览器回退时是无害的，而POST会再次提交请求。
* GET产生的URL地址可以被Bookmark，而POST不可以。
* GET请求会被浏览器主动cache，而POST不会，除非手动设置。
* GET请求只能进行url编码，而POST支持多种编码方式。
* GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
* GET请求在URL中传送的参数是有长度限制的，而POST么有。
* 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
* GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
* GET参数通过URL传递，POST放在Request body中。
* GET产生一个TCP数据包；POST产生两个TCP数据包。
对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。


#### get 请求
众所周知，get请求就是将参数 `json2query` 一遍，然后带在 `url` 后面发送就完事了


#### post 请求
> post请求会根据设置的 `content-type` 的不同而不同

1、`"Content-Type": "application/json; charset=utf-8"`

我们携带的参数会在我们的网络请求的 `Request Payload` 中看到，参数格式为JSON格式：{"key":"value","key":"value"...}
* 使用 `fetch` 进行 `ajax` 请求的前端代码和后端代码
    * 前端

    ```
    function _fetch (path) {
      let url = `//test.kk.com:12306${path}`
      fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ ley: 123 }), // body data type must match "Content-Type" header
      })
      .then(response => { console.log('re', response) }); // parses response to JSON
    }
    ```
    ![image](https://makefriends.bs2dl.yy.com/bm1536843718200.png)

    * 后端 `koa` 代码， 因为用了中间件 所以不用自己手动处理，后端 getRequestPayload

    ```
    router.post(`/npc/getUris`, (ctx, next) => {
      console.log('resquest body', ctx.request.body || 'no body')
      console.warn(JSON.stringify(ctx, null, 2))
      ctx.body = {
        code: 1,
        data: 123
      }
    })
    ```
    ![image](https://makefriends.bs2dl.yy.com/bm1536843900603.png)

2、`"Content-Type": "application/x-www-form-urlencoded"`

这种请求是 ajax 默认的 post 请求方式，我们携带的参数会在我们的网络请求的 `Form Data` 中看到，参数格式为String格式：key=value&key=value&key=value...，这种方式后端拿到了要先解一次码。
* 使用 `fetch` 进行 `ajax` 请求的前端代码和后端代码
    * 前端

    ```
    function _fetch (path) {
      let url = `//test.kk.com:12306${path}`
      fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'ley=123', // body data type must match "Content-Type" header
      })
      .then(response => { console.log('re', response) }); // parses response to JSON
    }
    ```
    ![image](https://makefriends.bs2dl.yy.com/bm1536845422835.png)

    * 后端 `koa` 代码， 因为用了中间件 所以不用自己手动处理，java 后端 getParameters 方式获取，在 tomcat 的 requset.getParameters 里，对于 application/x-www-form-urlencoded 有做一层判断，对这种编码回去解析body里面的数据，填充到parameters 里，后续想通过流的方式读取 body 是读取不到的

    ```
    const bodyparser = Bodyparser()
    app.use(convert(bodyparser))
    router.post(`/npc/getUris`, (ctx, next) => {
      console.log('resquest body', ctx.request.body || 'no body')
      console.warn(JSON.stringify(ctx, null, 2))
      ctx.body = {
        code: 1,
        data: 123
      }
    })
    ```
    ![image](https://makefriends.bs2dl.yy.com/bm1536846203992.png)


* [fetch的使用姿势](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [koa-router](https://github.com/alexmingoia/koa-router)
* [HTTP请求中的form data和request payload的区别](http://www.cnblogs.com/btgyoyo/p/6141480.html)
