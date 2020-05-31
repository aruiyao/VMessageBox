# VMessageBox
在使用ElementUI中的MessageBox时，在点击确定后，有些情况下需要等待执行完成后再关闭消息框

此组件针对以下两点功能做了封装，不需要这两个功能的无需用此组件

1、消息框只在处理完自定义事件后才关闭

2、默认给确认按钮加上loading状态



## Install

此组件基于ElementUI，请先安装ElementUI

```
npm install element-ui -S
npm install vmessagebox -S
```



## Quick Start

```js
import 'element-ui/lib/theme-chalk/index.css';
import VMessageBox from 'vmessagebox';

VMessageBox.msgBox('此操作将永久删除该文件, 是否继续?', 'warning', {distinguishCancelAndClose:true},() => alert('已确认'),undefined,() => alert('已关闭') ).catch(() => {});
```

示例中已用distinguishCancelAndClose来[区分取消与关闭事件](https://element.eleme.cn/#/zh-CN/component/message-box)，`.catch(() => {})`必须要有，否则取消或关闭时控制台会报错，这是ElementUI的问题

### 方法及参数

```js
msgBox (message, type, options, confirmCallback, cancelCallback, closeCallback)
```

| 参数            | 作用             |
| --------------- | ---------------- |
| message         | 同Element        |
| type            | 同Element        |
| options         | 同Element        |
| confirmCallback | 确认按钮回调事件 |
| cancelCallback  | 取消按钮回调事件 |
| closeCallback   | 关闭按钮回调事件 |

