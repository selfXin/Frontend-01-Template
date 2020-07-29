# 第16周总结
## 移动端手势
基于移动端基础事件封装
+ ontouchstart
+ ontouchend
+ ontouchmove
+ ontouchcancle
## 需要的手势
+ tap 点击
+ pan 滑动
+ press 按压
+ flick 快速扫过
## 转化逻辑
+ start
    * 快速点击 —— tap事件
    * 按下超过0.5s —— press start事件
        - 移动>10px —— pan start事件
        - 不移动 —— press end
    * 移动>10px —— pan start事件
        - 继续移动 —— pan move
            + 快速划过 —— flick事件
            + 抬起 —— panend事件