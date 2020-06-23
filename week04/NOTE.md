#第四周

## 结构化

### 事件循环
第三方调用，本身不具有事件循环
放入事件队列的类型：模块，代码片段，函数

js微任务(特别注意)
宏任务，浏览器或者其他服务调用 js
（setTimeout)浏览器

```javascript
var a = (1,2,3);
console.log(a);

```
```
new Promise();
```


## 结构化程序设计-基础设施

### JS Context => Realm
### 宏任务
### 微任务（Promise)
### 函数调用（Execution Content)
#### stack
+ code evaluation state
+ Function
+ Script or Module
+ Generator(*yeild*语句)
+ Realm
+ LexicalEnvironment（词法环境）
    * this
    * new.target
    * super
    * 变量
+ VariableEnvironment
    * 处理var声明
    * eval中有声明
    * with

E


### 语句/声明
### 表达式
### 直接量/变量/this

Realm(具有一套完整的内置对象)
对象列表=》