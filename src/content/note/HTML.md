---
title: 'HTML'
description: 'HTML标签和样式笔记'
pubDate: 'Jan 12 2024'
---

###### 标签

`repeat`和`fixed`不能同时使用，想实现`fixed`功能必须先去掉`repeat`

透明色：`transparent`

椭圆径向渐变（以距离圆心最远的角的距离为渐变半径）：`backgroud-image:redial-gradient(ellipse frathest-corner (50% 50%)`



配套使用的东西：
`summary+details` 语义化
`fieldset>legend` 分区域

`ruby rt rp`
汉字注音

`map area`
可点击区域的图像

`source`为`picture`，`video`，`audio`指定媒体资源

```html
<picture>
    <source media=" (min-width: 1024px)" srcset="big.jpg">
    <source media-"(min-width: 512px)" srcset="small.jpg">
    <img src="normal.jpg" alt="小姐姐"style="width:auto;">
</picture>
```





###### 常用标签和文本属性：p27

`time`标签 datetime属性
类语义化，在任何浏览器中都无任何特殊效果


<p>每天<time>00:00-08:00</time>进入高防状态</p>
<p><time datetime="2002-05-20">诞生日</time></p>

`meter`

<meter value="3" min="0" max="10">显示3</meter>

<meter value="0.6">60%</meter>

`progress`

下载进度：<progress value="22" max="100"></progress>

`bdo`

```html
<bdo dir="rtl"> 
Welcome
</bdo>```
```

输出：emocleW





###### BFC

Formatting Context
Formatting context 是它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的有 Block formatting context (简称BFC)和 Inline formatting context (简称IFC)。BFC是块级格式化上下文，用于对块级元素排版，默认情况下只有根元素（body）一个块级上下文，但是如果一个块级元素设置了float: left,overflow: hidden或position: absolute样式，就会为这个块级元素生产一个独立的块级上下文，使这个块级元素内部的排版完全独立。

BFC的特性
1、属于同一个BFC的两个相邻容器的上下margin会重叠（重点）
2、计算BFC高度时浮动元素也参于计算（重点）
3、BFC的区域不会与浮动容器发生重叠（重点）
4、BFC内的容器在垂直方向依次排列
5、元素的margin-left与其包含块的border-left相接触
6、BFC是独立容器，容器内部元素不会影响容器外部元素

成为BFC的触发条件
1、根元素（<html>）
2、float值非none
3、overflow值auto、scroll或hidden（非visible）
4、display值为inline-block、table-cell、table-caption、flex、inline-flex
5、position值为absolute、fixed

总结:
1.BFC是一个独立渲染的渲染块.
2.一个BFC区域只包含其子元素，不包括其子元素的子元素





###### 多列布局的实现方式

`float`
`position`
`column-count`（瀑布流布局）

属性选择器：
`[href]{}`
`[attr=''val'']{}`

z-index生效条件：
position不为默认值（static）
父元素不为relative

伪元素是行内显示样式
使用::before ::after时需要写
`content:' ';`
`display:block;`

resize必须和overflow一起使用

flex是`flex-grow`,`flex-shrink`,`flex-basis`的缩写，
`flex:1`表示自动填充剩余空白部分

3D：
`transform-style: preserve-3d;`

一种企业常用渐变：
`background-image： linear-gradient( transparent, rgba(0,0,0,.6) )`





###### LESS

禁止导出：
`//out:false`

导出目录：
`//out:'../styles/'`

全局导出目录
`less.complie`
`''out'': ''../styles/''`





<button>  在  <form>  内默认就是  type="submit" 

The default value of the  type  attribute for a  <button>  element inside a form is  "submit" .

