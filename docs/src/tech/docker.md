---
sidebarDepth: 4
---

## docker 心路历程

### 软件开发痛点
环境的配置，例如 python 有 2 和 3 有些语法还不兼容，在把代码给交付的时候，需要跟对方说好依赖的版本和库，在部署的也要在机器先配置好一样的环境

### 什么是 docker

1. Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。它是目前最流行的 Linux 容器解决方案。
2. Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。
3. Docker 的接口相对简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。
4. docker 的原理就是 集装箱 原理，在理解 docker 操作的时候，想象成在一艘货轮操作一个个集装箱。

### docker 能干什么

1. 提供一次性的环境。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。
2. 提供弹性的云服务。因为 Docker 容器可以随开随关，很适合动态扩容和缩容。
3. 组建微服务架构。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。
4. 应用的自动化打包、自动化测试和持续集成、发布。
5. 在服务型环境中部署和调整数据库或其他的后台应用。


### 和虚拟机的区别
![image](https://makefriends.bs2dl.yy.com/bm1540443626789.png)

### docker 在 window 上的正确使用姿势

* 工具准备

1. virtualbox 【VirtualBox 是一款开源虚拟机软件，可以直观地看到当前系统有多少虚拟机】
&& vagrant 【用于创建和部署虚拟化开发环境，这里主要用来安装 centos7 虚拟机到本地】
2. docker-machine 【用于创建和管理 安装了docker 容器虚机的一个工具，用 docker-machine  创建的 docker 容器可以在 virtualBox 管理，主要是可以帮助我们在远程的机器上安装和管理 Docker】--- [传送门](https://docs.docker.com/machine/)

![image](https://makefriends.bs2dl.yy.com/bm1540542725718.png)

* window 本地安装 docker 【满足想在 window 上跑 docker 的你】 [地址](https://docs.docker.com/docker-for-windows/install/)

* 安装本地虚拟机 centos7

    > [下载 VirtualBox](https://www.virtualbox.org/wiki/Downloads) &&
    [下载 vagrant](https://www.vagrantup.com/)

    1. 首先找一个目录用来专门放我们的虚拟机，在对应目录打开命令行工具
    2. 创建 Vagrantfile 文件 vagrant init centos/7    ##tip：Vagrantfile 文件可以存储要创建的虚机的版本并且在虚拟机启动的时候执行后面的脚本
    3. 安装 vagrant up
    4. 进入机器 vagrant ssh 或者 在 virtualbox 里面打开
    5. 登录虚机 name: root  psd: vagrant
    6. 安装 docker [地址](https://docs.docker.com/install/linux/docker-ce/centos/)

* 安装本地 docker-machine
    [地址](https://docs.docker.com/machine/install-machine/)
    打开 gitbash 【这是在 window 上创建 docker 的另一种姿势】
    ```
    base=https://github.com/docker/machine/releases/download/v0.14.0 &&
    mkdir -p "$HOME/bin" &&
    curl -L $base/docker-machine-Windows-x86_64.exe > "$HOME/bin/docker-machine.exe" &&
    chmod +x "$HOME/bin/docker-machine.exe"
    ```
    常用指令和[基本操作](https://www.cnblogs.com/sparkdev/p/7044950.html)

    1. docker-machine create demo 创建一台名称为 demo 的虚机 并且在里面安装好了 docker
    2. docker-machine env xxx  ---> eval $(docker-machine env xxx) 远程管理 docker
    3. docker-mechine ls
    4. docker-mechine ssh demo
    5. exit
    6. docker-mechine stop
    7. docker-mechine start

### docker 基本介绍及架构分析

* docker 提供了一个开发，打包，运行的 app 环境
* 把 app 和 底层的基础设施隔离开来
![image](https://makefriends.bs2dl.yy.com/bm1539327952764.jpg)
* docker 整体架构
![image](https://makefriends.bs2dl.yy.com/bm1539328186819.jpg)
1. 用户是使用Docker Client与Docker Daemon建立通信，并发送请求给后者。
2. Docker Daemon作为Docker架构中的主体部分，首先提供Server的功能使其可以接受Docker Client的请求；
3. Engine执行Docker内部的一系列工作，每一项工作都是以一个Job的形式的存在。
4. Job的运行过程中，当需要容器镜像时，则从Docker Registry中下载镜像，并通过镜像管理驱动graphdriver将下载镜像以Graph的形式存储；
5. 当需要为Docker创建网络环境时，通过网络管理驱动networkdriver创建并配置Docker容器网络环境；
6. 当需要限制Docker容器运行资源或执行用户指令等操作时，则通过execdriver来完成。
7. libcontainer是一项独立的容器管理包，networkdriver以及execdriver都是通过libcontainer来实现具体对容器进行的操作。

* docker 的几个关键指令如下：执行 docker build 的时候会根据 Dockerfile 创建一个集装箱，在集装箱里面可以指定集装箱的材质，在 build 的过程中，docker 会去 register 中取来这些材质，build 出来了一个集装箱的模子（image），在 run 的时候，docker 会根据这个 模子 创建一个真正的集装箱 container
![image](https://makefriends.bs2dl.yy.com/bm1539337368447.png)

### Image -- docker的模板

* image 基本介绍 [传送门](https://segmentfault.com/a/1190000009309347)
 ![image](https://makefriends.bs2dl.yy.com/bm1539346942008.jpg)

  * 文件和meta data的集合 （root filesystem）
  * 分层的结构，并且每一层都可以添加修改删除文件，成为一个新的image
  * 不同的 image 可以共享相同的 layer
  * image 本身是只读的

#### 搭建一个最最简单的 docker image

* 准备工作
  * yum install gcc [ 将 c 文件转换为可执行的二进制文件 ]
  * yum install glibc-static [ 附加的工具 ]

* 指令顺序
  1. 指定一个文件夹 mkdir hello
  2. 在 hello 下创建一个文件 hello.c 的文件
  3. 在文件编写简单的 c 代码
  ```
  #include<stdio.h>
  void mian(){
    printf('hello');
  }
  ```
  4. 使用指令 gcc -static hello.c -o hello 生成hello文件，通过 ./hello 可以看到我们文件的执行结果
  5. 接下来创建一个 Dockerfile 文件，文件的内容
  ```
  FORM scratch #空
  ADD hello /
  CMD ["/jz"]
  ```
  6. 启动 docker： systemctl start docker
  7. 打包我们的 image: docker build -t jz/hello . 【这个点是基于当前目录的 Dockerfile build 的】
  8. 查看 image：docker image ls
  9. 创建container并让我们的image跑起来：docker run jz/hello

### Container -- docker的集装箱

![image](https://makefriends.bs2dl.yy.com/bm1539347510597.png)

* 通过 Image 创建
* 在 Image layer 之上建立一个 container layer 【可读写】
* Image 负责 app应用 的存储和分发，container 负责运行app
* 就好像我们的类（image） 和 实例（container）

#### 基本指令介绍

  * 查看运行中 container：docker container ls === docker ps
  * 查看所有 container：docker container ls -a
  * 交互式地运行 image：docker run -it centos
  * 清除所有 container：docker rm $(docker container ls -aq)
  * 清除所有 exit 的 container：docker rm $(docker container ls -f "status-exited" -q)
  * 将在 container 做出的变化映射成一个新的image：docker container commit
  * 查看一个 image 的历史及资源： docker history imgId

### Dockerfile 语法

> 通过关键字的定义

* FROM [在什么base image 进行制作image]
  * FROM scratch (从头开始)
  * FROM centos (以 centos 作为基本 image )
  * 最佳实践 以官方的 image 作为基本 image

* LABEL [定义imgae的元信息]
  * LABEL maintainer="xxxxx@gmail.com"
  * LABEL version="1.0"
  * LABEL descrtion="xxxxx"

* RUN [运行命令并创建新的额 image layer]
  * 为了美观， 复杂的run使用反斜线换行，为了避免无用的分层，合并多条命令换成一行
  * RUN yum uodate && yum install -y vim\

* WORKDIR [设定当前目录, 相当于 cd]
  * 不用使用 RUN 进行目录生成，WORKDIR 可以多条使用，尽量使用绝对路径
  * WORKDIR /root

* ADD & COPY
  * 顾名思义 COPY 就是复制 ADD 除了复制还有解压
  * ADD hello /
  * ADD test.tar.gz /
  * WORKDIR /root   ADD hello ./test  ==> #/root/test/hello
  * COPY 优先于 ADD 添加远程文件使用 curl or wget

* ENV [设置环境变量申明常亮]
  * ENV MYSQL_VER 5.6  RUN apt-get install -y mysql-server="${mysql_ver}"
  * 尽量使用

* VOLUME [数据持久化相关]


* EXPOSE [暴露一个端口]

* CMD [设置容器启动后默认执行的命令和参数]
  * 可能被忽略，在被 -it 执行的时候

* ENTRYPOINT [设置容器启动时执行的命令，让容器以应用程序或者服务的的形式运行，一定会被执行]
  * ENTRYPOINT ["docker-entrypoint.sh"]

> image 运行时 debug 【就是进入 container 内部】

* docker run -it xxxxx


### docker 的 GitHub -- hub.docker [传送门](https://hub.docker.com/)

> 一个官方用来存个人或者官方 image 的地方

* 登录： docker login
* 个人的镜像必须以 docker 的用户名id命名 e.g：ljz126
* docker push ljz126/hello:[tag]


### 手撸一个简单的 node 服务

* 新建一个目录 `node-hello`
* 进入到目录中 `vim app.js`
*
    ```
    var http = require("http");
    //设置主机名
    var hostName = '0.0.0.0';
    //设置端口
    var port = 8080;
    //创建服务
    var server = http.createServer(function(req,res){
        res.setHeader('Content-Type','text/plain');
        res.end("hello nodejs");

    });
    server.listen(port,hostName,function(){
        console.log(`服务器运行在http://${hostName}:${port}`);
    });
    ```
* 新建 Dockerfile `vim Dockerfile`
*
    ```
    FROM node:4.6
    LABEL container="jiazhi"
    COPY app.js /app/
    WORKDIR /app
    CMD node app.js
    export 8080 #让端口可以在 docker 外访问
    ```
* docker build -t jz/node-hello .
* docker run -d jz/node-hello -p 8080:8080
* docker ps -a

### docker 网络处理

> 每次 docker 创建一个 container 的时候，会给每个 container 分配独立的 network linux Base，而且相互之前可以 ping 通

* 查看当前docker链接情况： docker network ls ===> bridge host none

#### 通过 docker run 起的两个 容器 的网络情况说明 【bridge】
![image](https://makefriends.bs2dl.yy.com/bm1539351828567.png)

* 查看网络 bridge 情况： brctl show
* 容器间的link：
    ```
    // 假设有 两个 mongo 和 app 的 image
    docker run -d --name mongo mongo
    docker run -d --name mongo --link mongo app 【相当于在 app 里面的设置了 dns mongo --> mongo 的 ip】
    ```
* 创建一个自己的 bridge 并连接：
  * docker network create my-bridge
  * docker run -d --network my-bridge --name mongo mongo
* 端口映射 docker 对外提供一个服务
  * docker run -p 8080:8080 -d --name nginx nginx
#### 通过 docker run --network none/host 起容器的网络情况说明【none/host】
![image](https://makefriends.bs2dl.yy.com/bm1539414765240.png)

#### 实例演示 一个 python-docker 程序去链接一个 redis-docker

```
docker run -d --name redis redis
docker run -d -p 5000:5000 --link redis --name py -e REDIS_HOST=redis py

// 问题来了 如果两个服务是在不同的服务器上呢
参考：[VXLAN](https://cizixs.com/2017/09/25/vxlan-protocol-introduction/) && 分布式存储工具 [etcd](https://www.hi-linux.com/posts/40915.html)
```

### docker 数据持久化
> 因为 docker 产生的数据只存储在 docker container 本身，所以当一个 container 被 stop 而且 rm 的时候，数据就会随之消失

* 生产

  * `/var/lib/mysql` 为 Dockerfile 的 VOLUME 的值
`docker run -d -v mysql:[VOLUME] --name masql1 -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql`

* 开发

  * 同一个文件 就是 docker 里面实际运行的 WORKDIR 就是 -v 后面的文件夹
`docker run -d -v $(pwd):[WORKDIR] --name masql1 mysql`

### docker 管理编排监控工具 [区别](https://blog.csdn.net/notsaltedfish/article/details/80959913)

#### docker 批量管理 --- docker compose

#### docker 集群编排工具 一 --- k8s

#### docker 集群编排工具 二 --- docker swarm

#### docker 运维和监控 --- Heapster + Grafana + InfluxDB + ELK + Fluentd


### docker 实用指令

* `docker exec -it dockerid xxxxx[命令]` --在docker内部执行linux指令

* `doicker rm $(docker ps -aq)` -- 清除所有已经停止的 docker

* `docker  run -d --name=demo dockeImage` -- 给docker命名

* `docker rm -f demo` --强制关闭运行中的docker

* `docker stop demo`

* `docker start demo`

* `docker rm demo`

* `docker inspect docker dockerId` -- 查看docker的详细信息

* `docker log dockerId` --进入docker的log

---


### 实战实践 --- 基于 gitlab 的 docker 持续集成以及持续构建

> 使用 vue-cli 进行构建，发布的话把 build 好的目录加上项目名称发到另外的服务器上，另外的服务器通过 nginx 处理静态文件

* 怎么安装 Gitlab [传送门](https://www.gitlab.com.cn/installation/#centos-7) 记住 最好用 8g 内存的来安装这个 不然好卡的

* 怎么安装 GitLab-runner  [传送门](https://segmentfault.com/a/1190000007180257)
> 值得一提的是 gitlab-runner 不需要和 gitlab 处于同一个服务器，可以试另外的机器甚至是本地虚拟机

* 可以修改gitlab配置文件 `vim /etc/gitlab/gitlab.rb` && `gitlab-ctl reconfigure`（gitlab安装了并不会自动 running 要执行这个）

#### 准备工作

* 本地制作 vue-cli 的 docker image
```
>> Dockerfile
FROM node:8.11
LABEL container="jiazhi"
# 主要安装你的构建工具
RUN npm install -g @vue/cli
# 一些其他依赖 这个视工具而定
RUN npm i -g @vue/cli-plugin-babel
RUN npm i -g @vue/cli-plugin-eslint
RUN npm i -g @vue/cli-service
RUN npm i -g vue-template-compiler
CMD echo vue-cli up

>> 执行指令 docker build -t vue .

```

> 先普及一波 [gitlab-runner](https://docs.gitlab.com/runner/)

* runner分类
  * share-runner 这种 runner 可以给所有项目使用，但是要以管理员身份登录 gitlab 查看
  * project-runner 只能给当前项目使用，其他项目需要去 runner ci 的配置里面启用
  ![image](https://makefriends.bs2dl.yy.com/bm1539398577470.png)

* runner 配置
```
gitlab-ci-multi-runner register
// 输入 gitlab 地址
Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com )
》上图1
Please enter the gitlab-ci token for this runner
》上图2
Please enter the gitlab-ci description for this runner
my-runner
INFO[0034] fcf5c619 Registering runner... succeeded
Please enter the executor: shell, docker, docker-ssh, ssh?
docker
Please enter the Docker image (eg. ruby:2.1):
vue
INFO[0037] Runner registered successfully. Feel free to start it, but if it's
running already the config should be automatically reloaded!

>> 成功创建 runner 一个
```

一步到位
```
gitlab-runner register \
  --non-interactive \
  --url "http://gitlab.levii.cn/" \
  --registration-token "7mcMLfT1heLQmhrgF9FF" \
  --executor "docker" \
  --docker-image fev \
  --description "fev" \
  --tag-list "fev" \
  --run-untagged \
  --locked="false" \
  # 下面这个要是不行就要手动改配置文件哦 主要是设置 bash 的目录，npm g 的全局命令装在 bash 里面呢
  --env="["BASH_ENV=~/.bashrc", "FORCE_COLOR=1"]" \
  --docker-pull-policy="if-not-present"
```

* 修改 runner [配置](https://docs.gitlab.com/runner/configuration/advanced-configuration.html) `vim /etc/gitlab-runner/config.toml`，runner 默认是去 docker hub 上拉取 image 的 真恶心
```
concurrent = 1
check_interval = 0

[[runners]]
  name = "docker-host"
  url = "http://gitlab.docker.com/"
  token = "ce6744ffcdab965485f3646d4e1009"
  executor = "shell"
  [runners.cache]

[[runners]]
  name = "docker-host"
  url = "http://gitlab.docker.com/"
  token = "56aa96e7179179e77efc1dd1cc610e"
  executor = "docker"
  [runners.docker]
    tls_verify = false
    image = "vue"
    privileged = false
    disable_cache = false
    volumes = ["/cache"]
    # 虚拟机的话 要加上这个 不然 gitlab.docker.com 是找不到 ip 的，除非你自己另外起一个 nds server 直接这样就好了
    extra_hosts = ["gitlab.docker.com:192.168.205.10"]
    # 最主要是下面这个啦 如果本地有就在本地拿否则就去hub上拿
    pull_policy = "if-not-present"
    shm_size = 0
  [runners.cache]

[[runners]]
  name = "docker-host"
  url = "http://gitlab.docker.com/"
  token = "a5e63806dfa5cedc7281014b359fb7"
  executor = "docker"
  [runners.docker]
    tls_verify = false
    image = "alpine:latest"
    privileged = false
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0
    pull_policy = "if-not-present"
    extra_hosts = ["gitlab.docker.com:192.168.205.10"]
  [runners.cache]

```

* 配置 [.gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/)
```
# 定义两个流程 构建和发布
stages:
  - build
  - deploy

# build 流程
build:
  stage: build
  # 指定哪个 runner 作为构建
  tags:
    - vue
  # 创建工件 就是保存哪些目录或文件到runner的运行目录下
  artifacts:
    expire_in: 1 week
    paths:
    - dist/
  # 前置脚本
  before_script:
    - echo 我是前置脚本
  # 执行脚本
  script:
    # gitlab 常量 获取项目名称 [其他](https://docs.gitlab.com/ce/ci/variables/README.html)
    - echo $CI_PROJECT_NAME
    - vue --version
    - pwd
    - npm i
    - npm run build
  # 后置脚本
  after_script:
    - git log -1 --pretty=medium >> gitlog
  # 指定哪个分支可以运行本流程
  only:
    - master

# 发布流程
deploy:
  stage: deploy
  # 这里就直接用另外的 runner 在注册 runner 的时候选 shell 的，也可以用 vue 这个 runner 但是纯脚本的用 shell 超快的
  tags:
    - sh
  variables:
    GIT_STRATEGY: none
  before_script:
    - pwd
    - ls -a
  # 发布就是直接 -- 自己看吧 相信可以看懂的
  # 两台 linux 的文件互传需要密码 先在 runner 的机器上切换用户 su gitlab-runner 然后设置信任实现免密[最下的链接有]
  # 这一步我搞了好久 因为没认识到要切换用户，用 sudo 去跑也要输入密码，在 runner 中我们没办法输入
  script:
    - if [ -d $CI_PROJECT_NAME ]; then
    - rm -rf $CI_PROJECT_NAME
    - fi
    - mkdir $CI_PROJECT_NAME
    - mv ./dist/* $CI_PROJECT_NAME
    - rsync -avz ./$CI_PROJECT_NAME root@192.168.205.26:/usr/share/nginx/html/www
  environment:
    name: master
  allow_failure: false
  only:
    - master
```

* 好了 大功告成 修改文件 --> push 最后看看我linux nginx 的配置
```
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    keepalive_timeout  65;
    #gzip  on;
    server
  {
    listen 80;#监听端口
    server_name www.nginx.net;#域名
    index index.html index.htm index.php;
    root /usr/share/nginx/html/www;#站点目录
    access_log off;
    location ^~ /a/ {
        alias /usr/share/nginx/html/www/;
    }
  }
    include /etc/nginx/conf.d/*.conf;
}
```

* 怎么设置 gitlab page
  * `vim /etc/gitlab/gitlab.rb` --> /gitlab_pages['enable'] vim 搜索功能
  * 找到 `gitlab_pages['enable'] = false` 并设置为 true 即可 其他别动
  * `gitlab-ctl reconfigure`

---

#### 参考链接

* [docker image Container 的区别](http://dockone.io/article/783)
* [docker命令大全](http://www.runoob.com/docker/docker-command-manual.html)
* [简化linux指令](https://blog.csdn.net/enhancing/article/details/12836437)
* [centos 图形化](https://segmentfault.com/a/1190000006233614)
* [ip地址](https://zhuanlan.zhihu.com/p/43212685)
* [ifconfig](https://my.oschina.net/Sheamus/blog/612059)
* [centos 安装 node](https://www.jianshu.com/p/7d3f3fa056e8)
* [安装 gitlab](https://www.gitlab.com.cn/installation/#centos-7)
* [处理centos防火墙](https://jingyan.baidu.com/article/5552ef47f509bd518ffbc933.html)
* [安装 注册 gitlab runner](https://segmentfault.com/a/1190000007180257)
* [安装 gitlab runner 官方](https://docs.gitlab.com/runner/install/linux-repository.html)
* [注册 gitlab runner 官方](https://docs.gitlab.com/runner/register/index.html)
* [Linux进程前后台切换](https://blog.csdn.net/YuZhiHui_No1/article/details/44564963)
* [使用本地docker镜像](https://www.jianshu.com/p/2b7e73b0a096)
* [使用虚拟机runner host error](https://gitlab.com/gitlab-org/gitlab-runner/issues/1036)
* [linux安装dns server](https://www.jianshu.com/p/e3a2a1376ca9)
* [创建 share-runner ](https://www.jianshu.com/p/2b43151fb92e)
* [ci原理浅析](https://tech.upyun.com/article/246/%E5%BD%93%E8%B0%88%E5%88%B0%20GitLab%20CI%20%E7%9A%84%E6%97%B6%E5%80%99%EF%BC%8C%E6%88%91%E4%BB%AC%E9%83%BD%E8%AF%A5%E8%81%8A%E4%BA%9B%E4%BB%80%E4%B9%88%EF%BC%88%E4%B8%8B%E7%AF%87%EF%BC%89.html)
* [远程文件拷贝](http://www.weiruoyu.cn/?p=669)
* [权限ssh权限问题](http://www.voidcn.com/article/p-fhdkkcov-bgb.html)
* [两台linux怎么免密传输文件](https://blog.csdn.net/nfer_zhuang/article/details/42646849)
* [inux远程执行shell文件](https://blog.csdn.net/s_sunnyy/article/details/79093646)
* [CentOS 7 yum 安装 Nginx](https://blog.csdn.net/u012486840/article/details/52610320)
* [gitlab操作](https://www.cnyunwei.cc/archives/1204)
