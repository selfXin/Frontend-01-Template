# 第三周
## 周四
### Expressions表达式
+ member
+ Reference
+ Call
    * foo()
    * super()
    * foo()['b']
    * foo().b

+ left handside & right handside
```javascript
    var a = b = c = 1;
    a
    ++
    b
    ++
    c
```
+ Unary-单目运算符
    * delete
    * void---void 0(返回undefined)
    * typeof
    * +
    * -
    * ~ (位运算)
    * !
    * await
+ Multiplicative
    * */%
+ Additive
    * +-
+ Shift
    * <<
+ Relationship
    * < \> <= >=
+ Logical
    * &&
    * ||
+ Conditional
    * ?:
+ Boxing & UnBoxing
    * new Object()//Symbol()
    * typeof(){}
    * toString(){}
    * Symbol.toPrimitive

## 周六
### atom(原子)
+ Grammar
    * 简单语句
        - expressionStateMent
        - emptyStatement
        - DubggerStatement
        - ThrowStatement
        - ContinueStatement
        - BreakStatement
        - ReturnStatement
    * 组合语句
        - blockStatement
            + {
            + .....
            + .....
            + }
        - lteration
            + while(){}
            + do()while{}
            + for(;;)
            + for( in )
            + for( of )
    * 声明
+ runtime
    * completion Record（记录）
        - [[type]]:normal,break,continue,return,throw
        - [[value]]:Types
        - [[target]]:label
    * Lexical Environment
### 面向对象
+ state
+ identifiter
+ behavior

+ object-class
    * 基于分类
    * 必定有一个分类
+ object-prototype
    * 基于原型（描述对象的方法）
    * 基础（prototype)-----Nihilo（原型-null）

#### 面向对象解释
不应该按照语言描述干扰
在设计对象的状态和行为时，我们总是遵循‘行为改变状态’原则

object in javascript
object->property
      ->[[prototype]]

#### 方式结构
symbol->data
string->Accessor(访问器)

#### Object api
+ {} . [] object.defineProperty
+ Object.create/Object.setPrototypeOf/Object.getPrototypeOf
+ new/class/extends
+ new/function/prototype

### js标准所有特殊对象
+ Bound Function Exotic Objects#### Bound Function Exotic Objects
    * [[BoundTargetFunction]]
    * [[BoundThis]]
    * [[BoundArguments]]
    * [[Call]]
    * [[Construct]]
    * [[BoundArguments]]
+ Array Exotic Objects
    * [[DefineOwnProperty]] 
+ ArraySpeciesCreate
+ String Exotic Objects
    * [[GetOwnProperty]]
    * [[DefineOwnProperty]] 
    * [[OwnPropertyKeys]] 
    * StringCreate
    * StringGetOwnProperty
+ Arguments Exotic Objects
    * [[GetOwnProperty]]
    * [[DefineOwnProperty]] 
    * [[Get]]
    * [[Set]] 
    * [[Delete]]
    * CreateUnmappedArgumentsObject
    * CreateMappedArgumentsObject 
    * MakeArgGetter
    * MakeArgSetter
+ Integer-Indexed Exotic Objects
    * [[GetOwnProperty]]
    * [[HasProperty]] 
    * [[DefineOwnProperty]] 
    * [[Get]]
    * [[Set]]
    * [[OwnPropertyKeys]] 
    * IntegerIndexedObjectCreate
    * IntegerIndexedElementGet
    * IntegerIndexedElementSet
+ Module Namespace Exotic Objects
    * [[Module]]
    * [[Exports]]
    * [[Prototype]]
    * [[SetPrototypeOf]]
    * [[IsExtensible]]
    * [[PreventExtensions]] 
    * [[GetOwnProperty]]
    * [[DefineOwnProperty]]
    * [[HasProperty]] 
    * [[Get]]
    * [[Set]]
    * [[Delete]]
    * [[OwnPropertyKeys]] 
    * ModuleNamespaceCreate
+ Immutable Prototype Exotic Objects
    * [[SetPrototypeOf]]
    * SetImmutablePrototype
