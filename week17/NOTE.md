# 每周总结可以写在这里
## panel组件
carosel组件的变形
## css解析
匹配后缀，在自己定义的css处理其中处理css样式
```
 {
        test: /\.css/,
        use:{
            loader: require.resolve("./cssLoader.js")
        }
    }
```
## 工具链
按照开发顺序整理工具链
初始化 -> 开发/调试 -> 测试 -> 发布
## yeoman
创建步骤
+ 创建generator-xxx文件夹，文件名有用处，作为yo的创建参数
+ 创建─generators目录
generators/
    ├───app/
    │   └───index.js
    └───router/
        └───index.js
+ package.json中添加files
"files": [
    "app",
    "router"
  ]
+ npm link创建关联
+ 新建其他文件夹采用yo xxx创建新项目