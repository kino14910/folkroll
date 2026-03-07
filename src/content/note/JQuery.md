---
title: 'JQuery'
description: 'JQuery常用方法笔记'
pubDate: 'Jan 20 2024'
---

attr()	prop()：都是获取元素属性的方法，如果属性的类型是Boolean, 则使用prop()方法,否则使用attr()方法。

$(selector)：相当于querySelector

$(:selector)：相当于querySelectorAll

添加样式：$(element).attr("class","green")

修改样式：$(element).addClass("class")

删除样式：$(element).removeClass("class")

添加具体样式：

单个样式：$(element).css("font-size", "40px")

多个样式：$(element).css({"font-size": "40px", "color": "green"})