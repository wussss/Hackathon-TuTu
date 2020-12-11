### Hackathon-TUTU 微信小程序：一键生成美妆&动漫风照片

> 技术栈:Taro+React+TS+SCSS
> 接口服务使用的是 https://github.com/anthhub/makeup-photo-flask-server

```JavaScript
//需安装微信官方提供的 .d.ts 文件，把miniprogram-api-typings 目录移动到@types下
npm install miniprogram-api-typings
```

#### 功能列表(MVP 版本)

- [x] 产品介绍页
  - [x] 展示宣传语和图标
  - [x] 展示动态loading
  - [x] 跳过介绍页
  - [x] 妆面预加载
  - [x] 自动进入产品主页
- [x] 产品主页
  - [x] 左上角展示产品LOGO，不影响图片内容
  - [x] 展示示例图
  - [x] 提供预设妆面选择
   - [x] 包括动漫风
  - [x] 上传自定义妆面
  - [x] 上传照片
  - [x] 一键生成指定妆面(包括预设和自定义)的照片
   - [x] 再次点击取消妆面
   - [x] 生成中展示动态loading
   - [x] 生成失败提醒
   - [x] 原图和生成图切换时的动画效果：渐隐渐现
   - [x] 图片支持预览、放大、保存到本地、发送给朋友
   - [x] 将小程序分享给朋友


#### 目录结构
- src 业务逻辑
 - components 通用组件
 - constants 预设常量，主要是妆面列表
 - pages 页面逻辑
 - res 静态资源
 - app.config.ts 项目配置，主要配置页面路由、请求超时时间
 - app.tsx 项目入口文件
 - base.scss  通用样式变量
 - config.ts 后端服务的请求地址

#### 功能截图

<image width='200' src="https://github.com/wussss/Hackathon-TuTu/blob/master/screenshot/1.png"><image width='200' src="https://github.com/wussss/Hackathon-TuTu/blob/master/screenshot/2.png"><image width='200' src="https://github.com/wussss/Hackathon-TuTu/blob/master/screenshot/3.png">
