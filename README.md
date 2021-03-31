# 环境搭建及项目启动

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

