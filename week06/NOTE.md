# 浏览器原理
## 状态机
### 有限状态机
• 每一个状态都是一个机器
• 在每一个机器里，我们可以做计算、存储、输出......
• 所有的这些机器接受的输入是一致的
• 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应 该是纯函数(无副作用)
• 每一个机器知道下一个状态
• 每个机器都有确定的下一个状态(Moore)
• 每个机器根据输入决定下一个状态(Mealy)
###JS中的有限状态机(Mealy)
```javascript
//每个函数是一个状态
function state(input) //函数参数就是输入
{
//在函数中，可以自由地编写代码，处理每个状态的逻辑
return next;//返回值作为下一个状态 }
/////////以下是调用////////// while(input) {
//获取输入
state = state(input); //把状态机的返回值作为下一个状态 }
```
##  HTML的解析
### 解析流程
- url(http)
- html(parse)
- dom(css computing)
- dom with css(layout)
- dom with position(render)
- bitmap
### 解析html步骤
+ 创建一个单独的文件处理html结构
+ 根据文档创建解析html状态机
+ 解析标签
    * 开始
    * 结束
    * 自封闭
+ 创建元素
    * 加入元素处理的方法
    * 标签结束提交token
+ 处理属性
    * 单引号/双引号/无引号三种类型
    * 属性结束把属性加到token上
+ 构建dom
    * 创建根为document的栈
    * 开始标签入栈，结束标签出栈
    * 自封闭立即出栈
+ 文本节点
    * 文本节点合并
+ 
