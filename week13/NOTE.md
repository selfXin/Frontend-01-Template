# 第十三周
## proxy
定义基本操作的自定义行为
+ 语法
```
    const p = new Proxy(target, handler)
```
+ target
目标对象
+ handler
捕获对象
## 组件化
### component构成
+ 组件自身
    * state
    * children
+ 外部
    * attribute
        - 强调描述性
    * method
    * property
        - 自身所属
    * event
### liftcycle