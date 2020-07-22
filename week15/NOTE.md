# 第15周
## vue-sfc风格组件
一个文件为一个组件，需要自定义组件文件的解析和编译方式,到达特定语法、功能支持的目的
### 解析步骤（webpack-loader)
+ 在webpack内添加文件解析loader，对自定义后缀文件解析
```
    {
    test: /\.view/,
    use:{
        loader: require.resolve("./myLoader.js")
    }
```
+ myLoader内配置解析规则，我们是按照浏览器html逻辑对解析文件，如果有特殊的语法还需自定义解析方式
```
    //浏览器html解析逻辑
    parser.parseHTML(source);
```
+ 按照组件的风格方式输入组件，采用jsx风格，借用了label对jsx语法处理loader
```
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: [[
                "@babel/plugin-transform-react-jsx",
                {pragma:"create"}
            ]]
        }
    }
```
## 动画
### css动画
非稳定动画，无法通过api准确控制结束、暂停等状态，在对动画控制不严格的场景可以使用
### js动画
通过自定义api控制动画时长、延时、结束、暂停、重制、运动规律
一个完整的动画控制组件一般分为两部分
#### animation
类似于定义一种数据结构，存储动画的相关数据,目前设定如下参数
+ object 实例对象，能在该对象获取动画属性，一般运动库传入dom对象或可动画属性对象
+ property 参与动画属性
+ template 外部控制渲染，填补属性的其他结构
+ start 启示状态（非固定）transform/opacity/color有差别
+ end 结束状态（非固定）transform/opacity/color有差别
+ duration 运动时长
+ delay 开始延时
+ timingFunction 运动方式，通过运动学公式算出线性点对应的非线性点位
```
    object,property,template,start,end,duration,delay,timingFunction
```
#### TimeLine
动画控制类，控制动画执行、渲染、开始、结束、暂停、重置等操作，并且可以对动画序列准确控制

