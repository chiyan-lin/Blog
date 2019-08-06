---
sidebarDepth: 4
---

## linux 大盘点

### linux 用户权限
* linux 中每个文件都有三个身份 user group other root【最大的权限】
* 用户相关信息存放：/etc/passwd
* 个人密码存放: /etc/shadow
* 所有组名存放: /etc/group

### 展示文件的属性 >>> ls -al
`drwxr-xr-x   2 root root  4096 May 20 00:30 btrace_test
`
权限 | 连接 | 所有者 | 用户组 | 文件容量 | 修改日期 | 文件名
---|---|---|---|---|---|---
drwxr-xr-x  | 2 | root | root | 4096 | May 20 00:30 |  btrace_test

 权限 10 位 | 意义
---|---|---|---|---|---|---
第一位字符：d,-,l,b,c  | 目录，文件，连接文件，可提供存储的设备接口，串行端口设备
2-4 位 | 文件所有者权限
5-7 位 | 同用户组权限
8-10 位 | 其他用户组或用户权限
wxr | 可读、可写、可执行 权值 7
r-x | 可读、不可写，可执行 权值 5
r-- | 可读、不可写，不可执行 权值 4
w | 写的权限 权值 2
r | 读的权限 权值 4
x | 执行的权限 权值 1

### 改变文件属性与权限

指令 | 功能 | 使用
---|--- | --
chgrp | 改变文件所属用户组 | chgrp -R[递归改变文件夹下所有文件] group[存在于 /etc/group] [文件夹路径或者文件名]
chown | 改变文件所有者 | chown -R[递归改变文件夹下所有文件] user or user:group[存在于 /etc/passwd] [文件夹路径或者文件名]
chmod | 改变文件权限 | chmod -R[递归改变文件夹下所有文件] [总权值] [文件夹路径或者文件名]

### linux 文件系统 HFS

目录 | 功能
---|---
/bin | 开机最基础的指令
/boot | 开机使用文件
/etc | 重要的配置文件 [/etc/init.d/: 所有服务的默认启动脚本]
/home | 系统默认主文件夹 一般是一个用户有一个专属的文件夹 ~：目前这个用户的主文件夹
/lib | 开机时使用的主函数库
/media | 可删除的设备
/mnt | 用于暂时挂载设备的文件夹
/opt | 第三方软件的安装目录
/root | root 的主文件夹 root模式下 cd ~ 会到这个文件夹下
/sbin | 提供开机，系统维护，其他软件程序的指令
/srv | 一些网络服务启动的时候，提供数据服务的数据目录，可以放项目
/tmp | 暂时存放的文件 任何人都可以访问
/lost+found | 文件系统发生错误时才会产生，丢失的片段会放到这个文件夹里面
/proc | 存放进程的目录，存放的时候会被读到内存中
/sys | 记录与内核相关的信息
/usr | 可分享与不可变动
/usr/X11R6/ | X window 系统重要数据所防止的目录
/usr/bin | 绝大部分可用指令的存放
/usr/include/ | c/c++ 程序语言头文件与包含文件放置处
/usr/lib/ | 各个应用软件的函数库、目标文件，不经常使用的脚本
/usr/local/ | 系统管理员在本机自行安装自己下载的软件
/usr/sbin/ | 非系统运行所需的指令，常见就是下载软件的执行指令
/usr/share/ | 放置共享文件的地方 所有人可见
/usr/src/ | 放置一般源码
/var | 针对经常变化的文件 缓存 log 登录文件
/var/cache/ | 系统运行的暂存文件
/var/lib/ | 各个软件的数据目录
/var/lock/ | 文件或者软件上锁文件
/var/log/ | 登录文件，记录登录者的信息啊啥的
/var/mail/ | 个人电子邮箱
/var/run/ | 某些程序或者服务的 pid
/var/spool/ | 队列数据，比如邮箱收到的邮件

### 变量

* $PATH,, 在执行指令时 系统会去$PATH里面查找目标路径bin相关的路径下是否有对应的可执行文件，有的话就直接拿那个路径拼上指令 比如 `cat min => /root/cat min`
* `cp -ir srcDir destDir` 注意复制文件的文件权限问题
* `rm -rif file|dir` -f 就是强制的意思
* `mv -fiu file` -u 是在文件有变化的时候才执行 -f 强制覆盖 `mv test1 test2`重命名
* `cat -n | tac -n`
* `more `

### 查看文件
* `tail -f file | grep filterString` 查看实时日志并过滤
* `less | more`
* `ln -s src dest` 创建文件或者文件夹快捷方式

### 磁盘处理
1. 先用 `df -h` 找出当前系统可用的磁盘
2. ...

### 查找文件
* whereis -b[查找可执行文件] fileName
* locate -i[忽略大小写] -r[使用正则] filename
* find [path:用空格可以从多个目录开始查找] [option:可以查找用户名或者用户组相关的常用的 -name filename | -type d] [action:找到的路径进行的操作 -exec commond | -print]

### 文件压缩
* `gzip -9 -c -v fikename > filename.gz` 保留原文件
* `zcat filename.gz` 查看压缩文件内容
* `tar -zcpv -f filename.tar.gz tarDir` 将文件夹打包压缩 `--exclude=/root/sys* ` 不包含 /root/sys 的所有文件
* `tar -ztv -f filename.tar.gz` 查看
* `tar -zxv -f filename.tar.gz -C untarDir` 解压缩到指定文件夹

### vi 常用操作

按键 | 说明
---|---
一般模式下 | --
0 | 光标移动到该行第一个
$ | 光标移动到该行最后一个
G | 光标移动到最后一行
nG | 移动到第几行
gg | 光标移动到第一行
/key | 查找关键字为 key 的字符并高亮
:n1,n2s/key1/key2/g | 在n1行和n2行之间查找key1并替换为key2
:1,$s/key1/key2/g | 在1行和最后行之间查找key1并替换为key2
dd | 删除一整行
ndd | 删除光标下n行
yy | 复制光标行
p | 粘贴复制的东西到下一行
. | 重复上一个擦欧洲哦
:w[filename] | 另存为
y | 复制反白的文字或块
d | 删除反白的文字或块
Ctrl+v | 块选择
:sp [filename] | 多窗口打开同一个文件（不填写filename）或多个文件
ctrl + w + 箭头 | 转移多窗口光标
~/.vimrc, ~/.viminfo | vim 环境设置与记录

### Bash --- linux main shell [/bin/bash]

> gitlab runner 里面的起的 docker 默认是使用 /bin/sh 这个 shell

> alias la="ls -al"

变量 | 说明
---|---
环境变量 | PATH="$PATH":/home/bin [追加] export PATH [导出到全局]
普通变量 | varName=./home/jiazhi [一般用来设置路径]
env | 查看环境变量
set | 查看所有变量
daclare | 声明变量类型
alias | alias lm='ls -s | more

#### 路径的查找顺序
1. 以相对或者绝对路径的执行命令
2. alias 的命令
3. bash 的内置 buildin 命令、
4. $PATH 查找

#### bash 配置详情

文件 | header 2
---|---
环境设置 | ---
/etc/profile | 每个用户登录时取得bash将读取的配置
PATH MAIL USER HOSTNAME HISTORY | /etc/profile 中的各个字段 因为针对不同的用户 所以里面的各个字段都不一样
/etc/inputrc | 用户输入相关的
/etc/profile.d/*.sh | 下的所有 sh 文件都将被所有用户使用 用户设置共享的命令别名
/etc/sysconfig/i18n / | /etc/profile.d/lang.sh 会调用改文件设置环境变量的 LANG
登录获取的配置 | ---
~/.bash_profile | 第一个会读取的配置 有则不会往下在找了 里面的代码会再去读取 ~/.bashrc 的配置
~/.bash_login | 第二个会读取的配置 有则不会往下在找了
~/.profile | 第三个会读取的配置 有则不会往下在找了

#### `source 配置文件名` 将配置读写进当前bash环境中

### 数据流重定向

重定向符号 | 说明
---|---
> | 以覆盖的方式写入文件 ll / > ./filename [all]
>> | 以追加的方式append内容进文件 [all]
1> or 1>> | 处理正确的数据
2> or 2>> | 处理错误的数据
&> | 同时处理错误的和正确的数据
tee | 双重定向 tee targetDir

### 管道常用


命令 | 说明
---|---
cut | 切割 cut -d ':' -f 1 用‘：’切割并取出第一个
grep | grep -i --color=auto keyword targetDir
sort | sort -fb targetDir or sort -t ':' -k 3 以分隔符‘：’分割之后的第三位进行排序
xargs | find /sbin | xargs ls -l


### grep 高级用法
> 就是使用高级表达式


范例 | 说明
---|---
grep -n 't[ea]st' filename | 查找 test or tast
** '[^g]oo' ** | 没有g的oo
** '^the' ** | 首行是 the 的过滤
** '[:alpha:]' ** | a-z and A-Z [a-zA-Z]
** '[:digit:]' ** | 所有数字 [0-9]
** '[:alnum:]' ** | 上面两个合体
** '[:lower:]' ** | a-z
** '[:upper:]' ** | A-Z
** '[:space:]' ** | 空格
** 'ooo.*' ** | 重复 o 0到无穷次
** 'go\{n, m\}' ** | 重复 n 到 m 次

### sed 工具

`sed [-nefr] '[[n1[,n2]function(a,c,d,i,p,s)]]'`

### shell

#### test 命令执行测试功能
`test -参数 express 简写 [ -参数 xxxxx ]`
参数|说明
--|--
数值对比|---
-eq | 等于则为真
-ne | 不等于则为真
-gt | 大于则为真
-ge | 大于等于则为真
-lt | 小于则为真
-le | 小于等于则为真
字符串判断 | ---
= | 等于则为真
!= | 不相等则为真
-z 字符串 | 字符串的长度为零则为真
-n 字符串 | 字符串的长度不为零则为真
文件判断 | ---
-e 文件名 | 如果文件存在则为真
-r 文件名 | 如果文件存在且可读则为真
-w 文件名 | 如果文件存在且可写则为真
-x 文件名 | 如果文件存在且可执行则为真
-s 文件名 | 如果文件存在且至少有一个字符则为真
-d 文件名 | 如果文件存在且为目录则为真
-f 文件名 | 如果文件存在且为普通文件则为真
-c 文件名 | 如果文件存在且为字符型特殊文件则为真
-b 文件名 | 如果文件存在且为块特殊文件则为真
多重判断 | ---
-a | 两个条件同时成立 test -r file -a -x file
-o | 任何一个条件成立
! | 取反

#### 命令行后接参数
参数|说明
--|--
$# | 代表后接的参数个数
$@ | 代表 $1,$2
$* | "$1 $2 $3"

```
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac


if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/node_modules/@yy/feb/bin/feb.js" "$@"
  ret=$?
else
  node  "$basedir/node_modules/@yy/feb/bin/feb.js" "$@"
  ret=$?
fi
exit $ret
```

### linux 用户及用户组

`/etc/passwd ==> root:x:0:0:root:/root:/bin/bash`

`用户：密码：uid：gid：用户基本信息明列：主文件夹：shell`

`/etc/shadow ==> root:$6$h2SsCV8I$8uukYH4jvh2495yG2FLE6EDpbqwx9WMjXzUZ.DNQB2X1TQMQXo9kNgZ/lTVyAzmpO7gm8HALo2AvVzYH8nVFc1:17721:0:99999:7:::`

`账号名称：密码：最近变更日期时间戳：密码不可变动日期：密码需要更改的天数：密码更改前警告的天数：账号失效日期：保留字段`

`/etc/group => root:x:0:`

`用户组名称：用户组密码：gid：此用户支持的账户`


相关指令 | 说明
---|---
useradd [-u uid] [-g initGruop] [-G 2rdGroup] | 新增用户
useradd -D | 查看设置用户默认配置 /etc/default/useradd
/etc/login.defs | 密码参数默认设置文件
/etc/skel/* | 主目录源文件，其他用户文件夹初始化的根本
passwd [username | userid] [-l] | 设置密码 -l 表示锁住账号
chage username | 查看用户密码信息
usermod [-cdeg...] username | 微调账号的信息
userdel [-r] username | 删除用户的所有信息 -r 是连文件夹一起删除
finger username | 列出用户信息
groupadd [-g gid] usergroupname | 新增用户组
groupmod [-gn] username | 微调用户组的信息
groupdel username | 删除用户组
su username | 切换用户
sudo [-u username] commond | 以username为临时用户执行相关指令 没有指令就直接切换用户
visudo | /etc/sudoers 是当前用户是否可以进行sudo操作的配置文件 想让当前用户可以进行命令行的操作 修改这个文件 格式参考文件 root 分别是 用户账号【%开头的是用户组】、来源主机、可执行指令的绝对路径


### 进程

进程在linux里面是一个 pid ，系统每一个指令都是从当前 bash 衍生出来的进程，或者可以说是直接在父进程中拷贝一份，再以 exec 的方式来执行实际要进行的进程。 在一般状态下，衍生的进程会继承父进程的相关权限。在linux中每一个执行都会产生一个进程，只是很多进程执行很快。

#### 工作管理

命令 | 说明
---|---
commond & | 最后的&可以让指令在后台执行
jobs [-lrs] | 查看后台进程
[ctrl-z] | 将进程放到后台并暂停
fg jobNumber | 将后台的工作拿到前台处理
bg jobNumber | 将被暂停执行的后台进程变成在后台执行
kill -signal[1,2,9,15] %jobNumber or pid | 关闭后台进程


#### 进程管理

```
ps -l

F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
4 S     0 11200 11198  0  80   0 - 28881 do_wai pts/0    00:00:00 bash
0 R     0 11229 11200  0  80   0 - 37235 -      pts/0    00:00:00 ps

```

参数 | 说明
---|---
F | 进程标志
S | 进程状态 Running Sleep D[dead] T[stpo] Zombie
UID | 用户id
PID | 进程id
PPID | 父进程id
C | cpu使用率
PRI | 优先级
ADDR | 内存相关，在内存的哪个位置
SZ | 用掉多少内存
WCHAN | 是否在进行中
TTY | 登录者的终端机位置
TIME | 使用cpu的时间
CMD | 触发进程的命令

```
ps aux

USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1  51472  3668 ?        Ss   Apr14   2:20 /usr/lib/systemd/systemd --switched-root --system --deserialize 21
root         2  0.0  0.0      0     0 ?        S    Apr14   0:00 [kthreadd]

```

参数 | 说明
---|---
%CPU | 使用掉cpu百分比
%MEM | 使用掉内存百分比
VSZ | 使用虚拟内存量
RSS | 占用的固定内存量


命令 | 说明
---|---
ps aux | 查看所有进程
ps -l | 查看自己bash的进程
top [-d updateNum] | 动态查看进程情况 在界面输入 P [以cpu占用排序] M [以内存占用排序] r[修改进程优先级]
pstree -pu | 查看进程相关性，显示进程id及用户
kill -signal pid or %jobid | 给进程或者job修改进程状态 -1 启动被终止的程序 -9 强行中断一个进程 -15 正常结束进程
killall -i -signal 服务指令 | 管理一个服务的 signal 会把服务相关的进程统一处理

#### 调整进程优先级

* `nice [-n 数字] commond ` 数字的范围是 root:[-20 ~ 19], other:[0, 19] nice 为负值时优先级更高 这个指令只用于一开始执行程序时设定
* 同样的参数 为已经存在的进程调整优先级使用 `renice number pid`

### 查看系统资源


指令 | 说明
---|---
free -m or k or g -t | 查看系统内存，-t 表示是否显示虚拟内存
uname | 查看与内核相关的信息
netstat -tlnp | 查看系统当前的监听状态
vmstat | 检测系统资源变化
fuser | 通过文件找到使用文件的进程
lsof | 列出进程使用的文件名
pidof | 找出正在执行的进程的 pid

### SELinux

> 以进程为主体的，通过策略规则制定进程读取特定文件的一种安全强化的linux安全模式

进程的访问权限被更好地限制了，文件或文件夹的权限不仅仅跟用户有关，同时也跟进程绑定在一起了

`ls -Z`

身份识别 | 角色 | 在 targetd 下的意义
---|---|---
Root | system_r | 代表 root 的账号登录时取得的权限
system_u | system_r | 由于系统账号，因此是非交互的系统运行程序
user_u | system_r | 一般可用户登录的进程

```  /etc/selinux/config ```

### daemon

> 系统服务

* 进程所在的地址： /etc/init.d/daemon
* 进程状态： /etc/init.d/daemon status

快捷方式

service [daemon] (start | stop | restart)

### 服务的防火墙

修改这两个文件 `/etc/hosts.allow`(优先) 和 `/etc/hosts.deny`

`服务名称 : ip或域或主机名 : 操作`

### 查看系统的服务

```netstat -tulp [win： netstat -aon]```
```
// window
netstat -ano | findstr 80

tasklist | findstr 2000

taskkill -PID <进程号> -F
```







