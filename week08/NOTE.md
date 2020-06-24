# 第八周作业
## 选择器
### 语法
+ 简单选择器
    * *
    * tag
    * .
    * #
    * [attr=value]
    * :
    * ::
+ 复合选择器
    * 简单*
+ 复杂选择器
    * 复合 +（sp > ~ + ||) + 复合
+ 选择器优先级
    * [,id,.,tag]
```
    div#a.b .c[id=x] [0,1,3,1]
    #a:not(#b) [0,2,0,0]
    *.a [0,0,1,1]
    div.a [0,0,1,1]
```
+ 伪类
    * :any-link
    * :link :visited
    * :hover
    * :focus
    * :target
    * :active
+ 伪类-树结构
    * :empty
    * :nth-child()
    * :nth-last-child()
    * :first-child :last-child :only-child
+ 伪类-逻辑
    * :not
    * :where :has
+ 伪元素

## 排版
### 盒（box)
+ 产生原因
    * inline（换行）
    * 伪元素
### 盒模型（为了排版）
+ margin->图片周围的留白
### 正常流
收集盒进行
计算盒在行中排版

inline formatting context----IFC
block formatting context---BFC
### 行模型
对齐，行高计算，vertical-align对行高影响很大
### float,clear
### BFC
BEC合并；display:visible会和父级合并
