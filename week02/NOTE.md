# 第二周总结
## 语言基础
介绍了语言产生的最基本的组成方式，便于我们从语言的组成语法上理解语言；
### BNF产生式
一种用于表示上下文无关文（由终结符号，非终结符号，一个开始符号和一组产生式组成）法的语言
产生式理解BNF
+ 0型 无限制文法
    * *？：：=？
+ 1型 上下文文法
+ 2型 上下文无关文法
+ 3型 正则文法

### 图灵完备性
+ 图灵完备性
    * 命令式-图灵机
        - goto
        - if和while
    * 声明式-lambda
        - 递归
        
### 动态/静态
+ 动态
    * 用户设备/服务器上
    * 产品实际运行时
    * runtime（运行时）
+ 静态
    * 程序员设备上
    * 产品开发时
    * Complietime(编译时)

## 类型系统
+ 动态类型/静态类型
+ 强类型(无隐式转换)/弱类型
    * String+Number
    * String==Boolean
+ 复合类型
    * 结构体
    * 函数签名
+ 子类型
    * 逆变/协变

## 命令式编程语言
+ Atom原子
+ Expression
+ Statement
+ Structure
+ Program

## 词法类型
介绍Unicode编码的重点编码及用法和js的几大基础类型
### InputElement
+ WhiteSpace
    * <TAB> tab
    * <VT> 纵向制表符
    * <FF>
    * <SP> 空格
    * <NBSP> -no-break（不能经常用）-防止断词
    * <ZWNBSP> 
    * <USP>
+ LineTermination
+ Comment
### 类型
+ Number
    * IEEE 754 Double Float
        - sign
        - Exponent
        - Fraction
    * Grammar
        - DecimalLiteral
            + 0
            + 0.
        - 0b111
        - 0o10
        - 0xFF
+ String
    * Character
    * Code Point
    * Encoding

### 字符串编码
+ ASCII
+ Unicode
+ UCS U+0000- U+FFFF
