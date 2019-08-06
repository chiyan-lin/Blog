### 前后端都需要知道的跨域

#### what 跨域

* 跨域（跨域 HTTP 请求）就是前端在访问接口的时候，与访问的接口的 协议、域名、端口号 不是同一个，就会有跨域问题，这里产生跨域问题的原因是 XmlHttpRequest同源策略 ，也就是禁止使用XHR对象向不同源的服务器地址发起HTTP请求。

#### why 跨域
* AJAX同源策略主要用来防止CSRF攻击。如果没有AJAX同源策略，相当危险，因为我们发起的每一次HTTP请求都会带上请求地址对应的cookie。


#### 请求的种类

1、简单请求
<table>
    <tr>
        <td>请求方法</td>
        <td>header</td>
    </tr>
    <tr>
        <td>HEAD</td>
        <td rowspan="3">
            Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type(只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain)
        </td>
    </tr>
    <tr>
        <td>GET</td>
    </tr>
    <tr>
        <td>POST</td>
    </tr>
</table>

2、非简单请求

除了上面的请求方法外的其他方法 delete、put 两个，还有携带其他自定义的请求头 即为非简单请求。

#### 浏览器处理简单请求

1、基本流程

先增加一个 Origin 字段，这个是直接拿的请求发起页面的http协议和域名还有端口

服务端需要支持我们这个origin跨域请求，各个版本的跨域设置看文章底部。
``` json
{
    <!--必须 设置允许跨域的 origin -->
    "Access-Control-Allow-Origin": string
    <!--可选 设置允许跨域请求带的 requset header -->
    "Access-Control-Allow-Headers": String
    <!--可选 设置允许跨域的 Methods -->
    "Access-Control-Allow-Methods": String
    <!--可选 设置允许跨域的 cookie, 开启此字段，前端 ajax 需要 设置withCredentials 且 Access-Control-Allow-Origin 不能为 *  -->
    "Access-Control-Allow-Credentials": Boolean
    <!--可选 设置option预检请求的缓存时间 -->
    "Access-Control-Max-Age": Number
}
```

#### 浏览器处理复杂请求

* 复杂请求在跨域请求的时候浏览器会发送一个预检请求，method 为 option，服务端需要首先通过验证这个预检请求，给这个请求返回 200 ，此时的 header 和 method 必须和 `access-control-allow` 中设置的保持一致。浏览器收到 option 响应，确认设置的 method 和 header 对上了，认为预检通过了，就开始正式的发送这个请求。
```
// 一次option预请求
:authority: i-863.kaixindou.net
:method: OPTIONS
:path: /gameInfo/fetchPkWinStreakShareInfo?uid=101001638&streakWin=3
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
access-control-request-headers: x-lang,x-ostype
access-control-request-method: GET
origin: https://www.kaixindou.net
user-agent: Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Mobile Safari/537.36
```
* 预检请求的允许通过，此时预检请求返回 200 在 `preview` 中看到 200 或者一个空页面
```
access-control-allow-credentials: true
access-control-allow-headers: x-lang, x-ostype
access-control-allow-methods: OPTIONS,GET,POST
access-control-allow-origin: https://www.kaixindou.net
content-length: 0
date: Wed, 15 Aug 2018 13:09:38 GMT
server: nginx
status: 200
vary: Access-Control-Request-Method
vary: Origin
vary: Access-Control-Request-Headers
```
* 预检请求不允许通过，预检请求同样返回 200 ，在  `preview` 中看到 nothing to preview，response没有返回 `access-control-allow` 相关字段
    * header 报错
    ```
    // console 的报错
    Request header field xxxx is not allowed by Access-Control-Allow-Headers in preflight response.
    ```
    ```
    // 网络请求的 response
    Content-Type: application/json; charset=utf-8
    ```
    * origin 报错
    ```
    // console 的报错
    Origin xxxxxxxxxx is not allowed by Access-Control-Allow-Origin.
    ```
    ```
    // 网络请求的 response
    Content-Type: application/json; charset=utf-8
    ```

#### 怎么避免这个预请求

* 我们一般开发，会涉及到预请求的无非就是设置了其他的 header，方法我们也只是用到 get 和 post
1. 让服务端缓存我们的预请求
```
// 让服务器设置下面这个头，在多次请求的时候可以避免二次预检
Access-Control-Max-Age: ms
```
2. 和服务端协商，设置的 header 使用 Last-Event-ID 等浏览器预置的 header，从根本上避免 option 的预请求

#### 开发中遇到的问题

* jq的 ajax 的携带 header 好坑，怎么都带不上去，建议使用 [axios](https://www.kancloud.cn/yunye/axios/234845)
    ```
    // axios比较烦的 get 请求和 post 请求的参数位不一样,建议使用自己简单封装下
    Axios({
      url: url[region] + '/wemeet/set_img_status',
      method: 'post',
      data: data,// post 使用
      param: data,// get 使用
      headers: { 'X-Auth-Token': encodeURIComponent(token) }
    }).then(rsp => rsp.data).catch(err => {
      console.log(err.message)
    })
    ```
* 封装过的
    ```
    export const axios = (url, type = 'GET', data = {}) => {
      if (typeof url === 'object') {
        return Axios(url)
      }
      if (typeof type === 'object') {
        data = type
        type = 'GET'
      }
      const axiosData = {
        withCredentials: true,
        method: type,
        url
      }
      if (type === 'GET') {
        axiosData.params = data
      }
      if (type === 'POST') {
        axiosData.data = data
      }
      axiosData.headers = { header: '12321' }
      return Axios(`${url}`, axiosData).then(rsp => {
        console.log(`${url}`, rsp.data)
        return rsp.data
      }).catch(e => {
        alert(e.message)
      })
    }
    ```

### 附录
* node express 跨域设置
``` javascript
// 使用express中间件
const whiteList = [ xx.com ]
app.use('*', (req, res, next) => {
	let origin = req.headers.origin
	let allowOrigin = 'http://fe.xx.com'
	origin && whiteList.forEach(v => {
		if (origin.indexOf(v) !== -1) {
			allowOrigin = origin
		}
	})
	res.header("Access-Control-Allow-Origin", allowOrigin)
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Max-Age", 1728000)
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  res.send(200)
	} else {
	  next()
	}
});
```

* go 跨域设置
``` go
func allowCrossOrigin(rw http.ResponseWriter, req *http.Request) {
	if strings.ContainsAny(req.Header.Get("Origin"), "yy.com") {
		rw.Header().Set("Access-Control-Allow-Origin", req.Header.Get("Origin"))
		rw.Header().Set("Access-Control-Allow-Method", "PUT,OPTIONS,POST,GET")
		rw.Header().Set("Access-Control-Allow-Credentials", "true")
		rw.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Auth-Token")
	}
}

func HttpGetImgList(rw http.ResponseWriter, req *http.Request) {
    if req.Method == http.MethodOptions {
    	allowCrossOrigin(rw, req)
    	com_http.SendCommonResp(rw, req.URL.Query().Get("callback"), 0, "r u ok", "")
    	return
    }
}
```


##### 参考链接
* [HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#HTTP_%E5%93%8D%E5%BA%94%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5)
* [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
* [跨域的那些事儿](https://zhuanlan.zhihu.com/p/28562290)
* [HTTP Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
