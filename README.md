# 环境搭建及项目启动

> gitee图床 ，github被墙原因等，图片有可能加载不出来，可以挂梯子或者等网络状况好再查看

## 环境搭建

### IDE下载&安装

> 微信小程序开发工具下载（本项目选择的是老版本的Stable版本 读者下载最新版即可 ）： https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
>
> ![image-20210331210251444](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210331210251444.png)
>
> 安装过程比较简单，无需再赘述。

> ps:请先注册微信开发者平台账号，以及开通云开发功能，后续需要的APP ID，以及预览查看实际效果

> 扫码使用vx账号登录开发者工具

登入之后的界面：

![image-20210331211506218](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210331211506218.png)

> IDE具体使用参考官方手册文档，这里不再赘述：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html



### npm环境搭建

`npm --v`或`npm --version`查看npm版本

本项目使用需要==6.14.8==版本以上

### nodejs环境

`node -v`查看环境

本项目需要==14.12.0==版本之上

### clone本项目到本地

`git clone https://github.com/DengSchoo/vxSocialMinProgram.git  `



### 云数据库环境搭建（在项目导入后 再回到此部分来）

- 云开发控制台如下（需要保证左上角当前环境统一）

  ![image-20210331215853248](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210331215853248.png)

- 具体表字段可以参考代码与数据交互部分

- 可能存在的问题

  - 没有权限：请先开启每个用户对于数据库的权限（增删改）问题

  - _openid问题：笔者踩过的坑还是你自己踩一遍才好

  - 数据渲染问题：查数据库数据为异步操作，需要使用js阻塞或者查看vx开发文档看是否已经有解决方法

    

### vant-weapp前端框架的使用

可以参考学习视频链接：https://www.bilibili.com/video/BV1m54y1C7Kz?from=search&seid=5661977342081741060

### colorUI有手就行

## 项目启动

### 导入项目到本地

- 导入主文件夹

  ![image-20210331213147226](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210331213147226.png)

- 项目主目录：

![image-20210331213229710](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210331213229710.png)

- 配置项目

- ![image-20210331213637453](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210331213637453.png)

  -  AppID需要在开发者平台获取
  - 因为使用到云数据库故需要开通云开发

  ![image-20210331213752032](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210331213752032.png)

  - 如果成功达到上图效果 没有爆红即可建立该项目
  - 第一次启动较慢 耐心等待

- 创建项目后成功得到如图效果即成功导入

  ![image-20210331214131155](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210331214131155.png)

  - 需要注意的是 需要在上交切换到适合的机型预览

- 最后一步 查看控制台error 和 warning情况

  ![image-20210331214346071](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210331214346071.png)

  > 此处报错可以忽略 (貌似开发者工具的问题 具体读者可以百度该错误代码\^_\^

- vx接口版本问题

  > vx开发组经常会改动（大多数弃用）接口，读者可以warning根据提示移步开发者文档查看

## 最终登入成果

![image-20210331221730531](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210331221730531.png)

- 数据保存在云开发环境中 故读者应该没有这些数据 不要惊慌
- 看不懂本项目的文档结构的话 建议先入门微信小程序基础（基础+云开发）

## vx云开发数据库与云存储使用

### 云开发控制台

云开发提供了一个控制台用于可视化管理云资源。控制台包含以下几大模块。

- 概览：查看云资源的总体使用情况
- 用户管理：查看小程序的用户访问记录
- 数据库：管理数据库集合、记录、权限设置、索引设置
- 存储管理：管理云文件、权限设置
- 云函数：管理云函数、查看调用日志、监控记录
- 统计分析：查看云资源详细使用统计

若小程序由多名开发者共同维护，小程序管理员可以在控制台[权限设置](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/authority.html)中配置相应开发者权限。

在用户管理中会显示使用云能力的小程序的访问用户列表，默认以访问时间倒序排列，访问时间的触发点是在小程序端调用 `wx.cloud.init` 方法，且其中的 `traceUser` 参数传值为 `true`。例：

```js\
wx.cloud.init({
  env: 'test-123',
  traceUser: true,
})
```



### 云数据库

> API参考文档 :https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html

云开发提供了一个 JSON 数据库，顾名思义，数据库中的每条记录都是一个 JSON 格式的对象。一个数据库可以有多个集合（相当于关系型数据中的表），集合可看做一个 JSON 数组，数组中的每个对象就是一条记录，记录的格式是 JSON 对象。

关系型数据库和 JSON 数据库的概念对应关系如下表：

| 关系型          | 文档型            |
| :-------------- | :---------------- |
| 数据库 database | 数据库 database   |
| 表 table        | 集合 collection   |
| 行 row          | 记录 record / doc |
| 列 column       | 字段 field        |

每条记录都有一个 `_id` 字段用以唯一标志一条记录、一个 `_openid` 字段用以标志记录的创建者，即小程序的用户。需要特别注意的是，在管理端（控制台和云函数）中创建的不会有 `_openid` 字段，因为这是属于管理员创建的记录。开发者可以自定义 `_id`，但不可自定义和修改 `_openid` 。`_openid` 是在文档创建时由系统根据小程序用户默认创建的，开发者可使用其来标识和定位文档。

数据库 API 分为小程序端和服务端两部分，小程序端 API 拥有严格的调用权限控制，开发者可在小程序内直接调用 API 进行非敏感数据的操作。对于有更高安全要求的数据，可在云函数内通过服务端 API 进行操作。云函数的环境是与客户端完全隔离的，在云函数上可以私密且安全的操作数据库。

数据库 API 包含增删改查的能力，使用 API 操作数据库只需三步：获取数据库引用、构造查询/更新条件、发出请求。以下是一个在小程序中查询数据库的发表于美国的图书记录的例子：

简单使用：

```js
/ 1. 获取数据库引用
const db = wx.cloud.database()
// 2. 构造查询语句
// collection 方法获取一个集合的引用
// where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
// get 方法会触发网络请求，往数据库取数据
db.collection('books').where({
  publishInfo: {
    country: 'United States'
  }
}).get({
  success: function(res) {
  // 输出 [{ "title": "The Catcher in the Rye", ... }]
  console.log(res)
 }
})
```

#### 本项目共四张表

- ==users==:保存用户数据信息

  字段说明

  - ==_id==：在数据库中的唯一标识
  - ==openid==：微信用户id
  - ==avatarUrl==：用户的头像信息 可以授权获取 不用上传云存储
  - ==lxfs==：联系方式(命名姿势不太行
  - ==nuckName==：微信用户昵称
  - ==nj==：年级
  - ==num==：错误次数
  - ==xh==：学号
  - ==xy==：学院
  - ==zwms==：自我描述
  - ==zy==：专业

  ![image-20210403123030969](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210403123030969.png)

- ==acti==：保存描述活动信息

  - ==_id==
  - ==_openid==
  - ==act_photo==:活动封面照片
  - ==avatarUrl==：活动创建者头像
  - ==cxsc==：持续时长
  - ==cyrs==：参与人数
  - ==hdbt==：活动标题
  - ==hdlx==：活动类型
  - ==jssjHour==：结束时间Hour
  - ==jssjMin==：结束时间Hour
  - ==ksrq==：开始日期
  - ==kssj==：开始时间
  - ==nickName==：创建者昵称

  ![](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210403124018170.png)

- ==join_in==: 关系表，用于建立用户和参加对应活动的关系

  - ==_id==
  - ==_openid==
  - ==activity==：activity的ID

  ![image-20210403124106956](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210403124106956.png)

  > 因为是Json数据库，所以没有天然的关系交互，联合查询起来会有困难

- ==moments==：保存每个用户发表的瞬间信息

  - ==_id==
  - ==_openid==
  - ==avatarUrl==：用户头像
  - ==content==：内容
  - ==device==：发表瞬间设备
  - ==imgList==：图片列表
  - ==nickName==：昵称
  - ==time==：发布时间

  ![image-20210403124140259](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210403124140259.png)

### 云存储

> 项目中主要使用云存储来存储用户发表的”瞬间“活动照片

云开发提供了一块存储空间，提供了上传文件到云端、带权限管理的云端下载能力，开发者可以在小程序端和云函数端通过 API 使用云存储功能。

在小程序端可以分别调用 `wx.cloud.uploadFile` 和 `wx.cloud.downloadFile` 完成上传和下载云文件操作。下面简单的几行代码，即可实现在小程序内让用户选择一张图片，然后上传到云端管理的功能：

```js
// 让用户选择一张图片
wx.chooseImage({
  success: chooseResult => {
    // 将图片上传至云存储空间
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: 'my-photo.png',
      // 指定要上传的文件的小程序临时文件路径
      filePath: chooseResult.tempFilePaths[0],
      // 成功回调
      success: res => {
        console.log('上传成功', res)
      },
    })
  },
})
```

上传完成后可在控制台中看到刚上传的图片。

在本项目中文件名使用随机数和时间戳来特定标识fileName：

![image-20210403121858858](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210403121858858.png)

### 云开发环境

一个环境对应一整套独立的云开发资源，包括数据库、存储空间、云函数等资源。各个环境是相互独立的，用户开通云开发后即创建了一个环境，默认可拥有最多两个环境。在实际开发中，**建议每一个正式环境都搭配一个测试环境**，所有功能先在测试环境测试完毕后再上到正式环境。以初始可创建的两个环境为例，建议一个创建为 `test` 测试环境，一个创建为 `release` 正式环境。



## 多人协作开发注意事项

- 需要在开发者平台将协作开发者的vx号添加到开发者账号中

- y因为涉及到云数据库和云函数，故需要同步为同一个云开发环境
- 白嫖vx的数据库为对象数据库 调整表对应结构要通知到同组开发人员(不然debug 可能要.......)
- 删库或者删数据也要同步一下避免麻烦

## 参考的开源组件以及对应的开发文档

- vant-weapp

  https://vant-contrib.gitee.io/vant-weapp/#/intro

- 微信官方开发文档

  https://developers.weixin.qq.com/miniprogram/dev/framework/

- colorUI（强推）

  https://www.color-ui.com/

## 完整开发文档

>  详细开发文档 涉及小组成员信息等私密信息，如真需要可以提issue到本项目，留下联系方式，到时再私发去隐秘信息版的

## 写在后面

> > 本项目为竞赛作品，因为技术方向原因，不会再进一步维护了，感兴趣的读者可以fork一下，star一下（拒绝白嫖从我做起。
>
> > 心得体会：学会整合轮子很重要，这样对上手框架都很快，阅读开发文档，做信息检索同样重要，但是框架迭代更新很快，唯一不变的是背后的原理，如果一个框架组件的文档写得不全的话还是弃坑吧，hhhhh

> 项目竞赛演示视频、项目简介已经上传至本项目下的Docs目录

> 
>
> > 推广一下blog：https://www.cnblogs.com/DengSchoo
>
> > gitee（主要是做了图床 以及一些学习笔记）:https://gitee.com/DengSchoo374
>
> > 欢迎commit issue 说明文档V1.0 还不完善 后续根据issue更新叭
>
> 祝好。peace & love
>
> 

# 一、项目成果展示

![image-20210225152431968](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152431968.png)![image-20210225152436537](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152436537.png)

![image-20210225152443272](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152443272.png)![image-20210225152449004](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152449004.png)

![image-20210225152456503](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152456503.png)![image-20210225152503325](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152503325.png)

![image-20210225152516098](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152516098.png)![image-20210225152520389](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152520389.png)![image-20210225152526833](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152526833.png)![image-20210225152531992](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152531992.png)![image-20210225152538037](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152538037.png)![image-20210225152543218](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152543218.png)

# 二、前言

大学繁忙的学习生活有时候会让人喘不过气来，想找一些有趣、有意义的课余活动来宣泄一下自己压力，但是又不知道如何才能找到自己心仪的活动并且也找不到一个志趣相投的小伙伴可以一起玩耍，在参加完一个非常有意义活动后想要记录一下美好瞬间和时刻或者是想写一篇活动总结，想要分享给其它小伙伴，在这样一种需求下，Kindred Spirit就诞生了！！

# 三、产品介绍

## ***\*1.产品简介\****

Kindred Spirit，译为趣味相投的人，正如它的名字一样，其设计目的是为了让我们的用户找到身边志趣相投的人，他们可以是爱去图书馆学习的人、爱好球类运动的人、爱参加竞赛的人... 大学生繁忙的学习生活中，很难兼顾学习与课外生活同步发展，其中的原因之一：没有一个志趣相投的小伙伴相伴。在Kindred Spirit中，你可以看到所有其它小伙伴举办的活动，了解他们的志趣，开发自己的新爱好，记录你自己的活动瞬间，并将它分享给他人。

想象这样一个场景：今天晚上好想去打球啊，可是室友和自己的朋友要么不会打要么没时间，自己一个人又比较没意思。在这样一种情况下，我们往往选择宅在宿舍而放弃外出运动，原因就是缺少了陪伴，自己的动力就会变的不足。Kindred Spirit就会为你寻找志趣相投的人，想打球？点开球类运动 ，发现上面有这样一个活动：“今晚7.30 北区篮球场们口集合打1h 3v3 速来”，于是你开心的点击了参加，成功参与后，你可以在我参加的板块查看自己参与的活动。

自己的活动太小众？找不到自己想要参加的活动？不，你可以拥有自己活动，你不一定要去发现别人的活动，你可以让别人发现你。你可以方便快捷的注册一个活动，设置自己的活动标题和开始时间等，成为你的活动组织者，然后就等着志趣相投的小伙伴来找你啦。

活动过程十分快乐开心又或此次过程十分的有意义，但是没地方记录、分享和安利？Kindred Spirit提供了瞬间板块，用于记录活动瞬间，你可以文字+图片保存你的瞬间。

当然如果不小心注册了错误信息，也不用着急，我们提供一次修改基本信息的机会，要珍惜哦！

## **2.** ***\*创意描述\****

基于大学生的交友需求，但是又存在不知道如何去扩大自己的交际圈或者遇到志趣相投的小伙伴的概率很低这些问题，Kindred Spirit 这一面向大学生的交友小程序应运而生，用户可以在上面选择自己感兴趣的活动并参加，与此同时，也可以创建自己活动，在自己感兴趣的活动中与他人进行交流，寻找到自己的“知己”。在活动过后也能发布自己的活动感想，记录自己的点点滴滴。除此之外，Kindred Spirit 还能丰富我们的大学生活，使大学生走出宿舍走出课堂，更好地融入社会群体中。

## **3.** ***\*特色描述\****

l 界面美观大方，交互性强

l 操作简单，易上手

l 适用人群多，满足各种活动的爱好者的交友需求

l 以微信小程序的形式，可行性强

l 功能齐全，满足多种需求

 

## **4.** ***\*功能描述\****

![image-20210225152336309](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152336309.png) 

## **5.** ***\*开发工具与技术栈\****

前端：WXSS/json/js/WXML、ColorUI、Vant-weapp

后端：Node.js、云数据库

开发工具：微信开发者工具 Stable-1.03.2010240 git(代码版本管理)

 

 

## **6.** ***\*应用环境\****

![image-20210225152319958](https://gitee.com/DengSchoo374/img/raw/master/images/image-20210225152319958.png)

选择了用户占比最多的2.14.0的调试基础库，支持iOS7.0.17及版本以上，支持Android 7.0.10及以上版本，暂不支持MacOS和Windows

 

 

## **7.** ***\*实现思路\****

按照WX小程序官方给出的框架组建基本项目架构，前端用于和用户进行交互和信息展示，前端和云环境node.js进行数据交互，具体过程为：对于需要从云数据库拿数据的通过云函数或者对于pages下的js函数以及WX提供的API进行数据获取再动态的展现在用户面前，当用户需要对数据进行存储的时候绑定相关触发事件，数据动态的添加到云数据库。

