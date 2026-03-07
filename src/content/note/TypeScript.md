---
title: 'TypeScript'
description: 'TypeScript类型声明和基础语法'
pubDate: 'Jan 31 2024'
---

# **1.类型声明**

```typescript
let a: string //变量a只能存储字符串
let b: number //变量a只能存储数值
let c: boolean //变量a只能存储布尔值
a = &#39;hello&#39;
a = 100 //警告：不能将类型“number”分配给类型“string”
b = 666
b = &#39;你好&#39;//警告：不能将类型“string”分配给类型“number”
c = true
c = 666 //警告：不能将类型“number”分配给类型“boolean”
// 参数x必须是数字，参数y也必须是数字，函数返回值也必须是数字
function demo(x:number,y:number):number{
return x + y
}
demo(100,200)
demo(100,&#39;200&#39;) //警告：类型“string”的参数不能赋给类型“number”的参数
demo(100,200,300) //警告：应有 2 个参数，但获得 3 个
demo(100) //警告：应有 2 个参数，但获得 1 个
```

# **2.类型推断**

```typescript
let d = -99 //TypeScript会推断出变量d的类型是数字
d = false //警告：不能将类型“boolean”分配给类型“number”
```

# **3.类型总览**

**JavaScript 中的数据类型：**

string 、 number 、 boolean 、 null 、 undefined 、 bigint 、 symbol 、 obje

ct

备注：其中 object 包含： Array 、 Function 、 Date ......

**TypeScript 中的数据类型：**

**1.** 以上所有

**2**. 四个新类型： void 、 never 、 unknown 、 any 、 enum 、 tuple

**3.** ⾃定义类型： type 、 interface

注意点： JS 中的这三个构造函数： Number 、 String 、 Boolean ，他们只⽤于包装对象，正常开发时，很少去使⽤他们，在TS 中也是同理。

```typescript
let n = 56
n.toFixed(2)
/*
当执⾏n.toFixed(2) ，底层做了这⼏件事：
1.let temp = new Number(42)
2.value = temp.toFixed(2)
3.删除value
4.返回value
*/
```



![img](https://i2.hdslb.com/bfs/article/7b9b9d029eaa71c7b4f843484e651f74302417610.jpg@1192w.webp)



![img](https://i2.hdslb.com/bfs/article/fee09b8597366c91d55d2c3d344c891c302417610.jpg@1192w.webp)

# **4.常⽤类型**

**4.1. 字⾯量**

```typescript
let a: &#39;你好&#39; //a的值只能为字符串“你好”
let b: 100 //b的值只能为数字100
a = &#39;欢迎&#39;//警告：不能将类型“&quot;欢迎&quot;”分配给类型“&quot;你好&quot;”
b = 200 //警告：不能将类型“200”分配给类型“100”
let gender: &#39;男&#39;|&#39;⼥&#39; //定义⼀个gender变量，值只能为字符串“男”或“⼥”
gender = &#39;男&#39;
gender = &#39;未知&#39; //不能将类型“&quot;未知&quot;”分配给类型“&quot;男&quot; | &quot;⼥&quot;”
```

**4.2. any**

any 的含义是：任意类型，⼀旦将变量类型限制为 any ，那就意味着放弃了对该变量的类型检查。

```typescript
//明确的表示a的类型是any —— 显式的any
let a: any
//以下对a的赋值，均⽆警告
a = 100
a = &#39;你好&#39;
a = false
//没有明确的表示b的类型是any，但TS主动推断了出来 —— 隐式的any
let b
//以下对b的赋值，均⽆警告
b = 100
b = &#39;你好&#39;
b = false
```

注意点： any 类型的变量，可以赋值给任意类型的变量

```typescript
/* 注意点：any类型的变量，可以赋值给任意类型的变量 */
let a
let x: string
x = a // ⽆警告
```

**4.3. unknown**

unknown 的含义是：未知类型

备注1： unknown 可以理解为⼀个类型安全的any

备注2： unknown 适⽤于：开始不知道数据的具体类型，后期才能确定数据的类型

```typescript
// 设置a的类型为unknown
let a: unknown
//以下对a的赋值，均正常
a = 100
a = false
a = &#39;你好&#39;
// 设置x的数据类型为string
let x: string
x = a //警告：不能将类型“unknown”分配给类型“string”
```

若就是想把a 赋值给 x ，可以⽤以下三种写法：

```typescript
// 设置a的类型为unknown
let a: unknown
a = &#39;hello&#39;
//第⼀种⽅式：加类型判断
if(typeof a === &#39;string&#39;){
x = a
}
//第⼆种⽅式：加断⾔
x = a as string
//第三种⽅式：加断⾔
x = &lt;string&gt;a
```

any 后点任何的东⻄都不会报错，⽽ unknown 正好与之相反。

```typescript
let str1: string = &#39;hello&#39;
str1.toUpperCase() //⽆警告
let str2: any = &#39;hello&#39;
str2.toUpperCase() //⽆警告
let str3: unknown = &#39;hello&#39;;
str3.toUpperCase() //警告：“str3”的类型为“未知”
// 使⽤断⾔强制指定str3的类型为string
(str3 as string).toUpperCase() //⽆警告
```

**4.4. never**

never 的含义是：任何值都不是，简⾔之就是不能有值， undefined 、 null 、 &[#39;&#](https://search.bilibili.com/all?keyword=39%3B%26)39; 、 0 都不

⾏！

**1**. ⼏乎不⽤never 去直接限制变量，因为没有意义，例如：

```typescript
/* 指定a的类型为never，那就意味着a以后不能存任何的数据了 */
let a: never
// 以下对a的所有赋值都会有警告
a = 1
a = true
a = undefined
a = null
```

**2**. never ⼀般是 TypeScript 主动推断出来的，例如：

```typescript
// 指定a的类型为string
let a: string
// 给a设置⼀个值
a = &#39;hello&#39;
if(typeof a === &#39;string&#39;){
a.toUpperCase()
}else{
console.log(a) // TypeScript会推断出此处的a是never，因为没有任何⼀个值符合此处的
逻辑
}
```

**3**. never 也可⽤于限制函数的返回值

```typescript
// 限制demo函数不需要有任何返回值，任何值都不⾏，像undeifned、null都不⾏
function demo():never{
throw new Error(&#39;程序异常退出&#39;)
}
```

void 常⽤于限制函数返回值

```typescript
// ⽆警告
function demo1():void{
}
// ⽆警告
function demo2():void{
return
}
// ⽆警告
function demo3():void{
return undefined
}
// 有警告：不能将类型“number”分配给类型“void”
function demo4():void{
return 666
}
```

**4.6. object**

关于Object 与 object ，直接说结论：在类型限制时， Object ⼏乎不⽤，因为范围太⼤了，⽆

意义。

1. object 的含义：任何【⾮原始值类型】，包括：对象、函数、数组等，限制的范围⽐较宽泛，⽤的少。

```typescript
let a:object //a的值可以是任何【⾮原始值类型】，包括：对象、函数、数组等
// 以下代码，是将【⾮原始类型】赋给a，所以均⽆警告
a = {}
a = {name:&#39;张三&#39;}
a = [1,3,5,7,9]
a = function(){}
// 以下代码，是将【原始类型】赋给a，有警告
a = null // 警告：不能将类型“null”分配给类型“object”
a = undefined // 警告：不能将类型“undefined”分配给类型“object”
a = 1 // 警告：不能将类型“number”分配给类型“object”
a = true // 警告：不能将类型“boolean”分配给类型“object”
a = &#39;你好&#39; // 警告：不能将类型“string”分配给类型“object”
```

**2**. Object 的含义： Object 的实例对象，限制的范围太⼤了，⼏乎不⽤。

```typescript
let a:Object //a的值必须是Object的实例对象，
// 以下代码，均⽆警告，因为给a赋的值，都是Object的实例对象
a = {}
a = {name:&#39;张三&#39;}
a = [1,3,5,7,9]
a = function(){}
a = 1 // 1不是Object的实例对象，但其包装对象是Object的实例
a = true // truue不是Object的实例对象，但其包装对象是Object的实例
a = &#39;你好&#39; // “你好”不是Object的实例对象，但其包装对象是Object的实例
// 以下代码均有警告
a = null // 警告：不能将类型“null”分配给类型“Object”
a = undefined // 警告：不能将类型“undefined”分配给类型“Object”
```

**3**. 实际开发中，限制⼀般对象，通常使⽤以下形式

```typescript
// 限制person对象的具体内容，使⽤【,】分隔，问号代表可选属性
let person: { name: string, age?: number}
// 限制car对象的具体内容，使⽤【;】分隔，必须有price和color属性，其他属性不去限制，有
没有都⾏
let car: { price: number; color: string; [k:string]:any}
// 限制student对象的具体内容，使⽤【回⻋】分隔
let student: {
id: string
grade:number
}
// 以下代码均⽆警告
person = {name:&#39;张三&#39;,age:18}
person = {name:&#39;李四&#39;}
car = {price:100,color:&#39;红⾊&#39;}
student = {id:&#39;tetqw76te01&#39;,grade:3}
```

**4**. 限制函数的参数、返回值，使⽤以下形式

```typescript
let demo: (a: number, b: number) =&gt; number
demo = function(x,y) {
return x+y
}
```

**5**. 限制数组，使⽤以下形式

```typescript
let arr1: string[] // 该⾏代码等价于： let arr1: Array&lt;string&gt;
let arr2: number[] // 该⾏代码等价于： let arr2: Array&lt;number&gt;
arr1 = [&#39;a&#39;,&#39;b&#39;,&#39;c&#39;]
arr2 = [1,3,5,7,9]
```

**4.7. tuple**

tuple 就是⼀个⻓度固定的数组。

```typescript
let t: [string,number]
t = [&#39;hello&#39;,123]
// 警告，不能将类型“[string, number, boolean]”分配给类型“[string, number]”
t = [&#39;hello&#39;,123,false]
```

**4.8. enum**

enum 是枚举

```typescript
// 定义⼀个枚举
enum Color {
Red,
Blue,
Black,
Gold
}
// 定义⼀个枚举，并指定其初识数值
enum Color2 {
Red = 6,
Blue,
Black,
Gold
}
console.log(Color)
/*
{
0: &#39;Red&#39;,
1: &#39;Blue&#39;,
2: &#39;Black&#39;,
3: &#39;Gold&#39;,
Red: 0,
Blue: 1,
Black: 2,
Gold: 3
}
*/
console.log(Color2)
/*
{
6: &#39;Red&#39;,
7: &#39;Blue&#39;,
8: &#39;Black&#39;,
9: &#39;Gold&#39;,
Red: 6,
Blue: 7,
Black: 8,
Gold: 9
}
*/
// 定义⼀个phone变量，并设置对⻬进⾏限制
let phone: {name:string,price:number,color:Color}
phone = {name:&#39;华为Mate60&#39;,price:6500,color:Color.Red}
```



```typescript
phone = {name:&#39;iPhone15Pro&#39;,price:7999,color:Color.Blue}
if(phone.color === Color.Red){
console.log(&#39;⼿机是红⾊的&#39;)
}
```

**5.⾃定义类型**

⾃定义类型，可以更灵活的限制类型

```typescript
// 性别的枚举
enum Gender {
Male,
Female
}
// ⾃定义⼀个年级类型（⾼⼀、⾼⼆、⾼三）
type Grade = 1 | 2 | 3
// ⾃定义⼀个学⽣类型
type Student = {
name:string,
age:number,
gender:Gender,
grade:Grade
}
// 定义两个学⽣变量：s1、s2
let s1:Student
let s2:Student
s1 = {name:&#39;张三&#39;,age:18,gender:Gender.Male,grade:1}
s2 = {name:&#39;李四&#39;,age:18,gender:Gender.Female,grade:2}
```

**6.抽象类**

常规类：

```typescript
class Person {
name: string
age: number
constructor(name:string,age:number){
this.name = name
this.age = age
}
}
const p1 = new Person(&#39;张三&#39;,18)
const p2 = new Person(&#39;李四&#39;,19)
console.log(p1)
console.log(p2)
```

继承：

```typescript
// Person类
class Person { }
// Teacher类继承Person
class Teacher extends Person { }
// Student类继承Person
class Student extends Person { }
// Person实例
const p1 = new Person(&#39;周杰伦&#39;,38)
// Student实例
const s1 = new Student(&#39;张同学&#39;,18)
const s2 = new Student(&#39;李同学&#39;,20)
// Teacher实例
const t1 = new Teacher(&#39;刘⽼师&#39;,40)
const t2 = new Teacher(&#39;孙⽼师&#39;,50)
```

抽象类：不能去实例化，但可以被别⼈继承，抽象类⾥有抽象⽅法

```typescript
// Person（抽象类）
abstract class Person { }
// Teacher类继承Person
class Teacher extends Person {
// 构造器
constructor(name: string,age: number){
super(name,age)
}
// ⽅法
speak(){
console.log(&#39;你好！我是⽼师:&#39;,this.name)
}
}
// Student类继承Person
class Student extends Person { }
// Person实例
// const p1 = new Person(&#39;周杰伦&#39;,38) // 由于Person是抽象类，所以此处不可以new Perso
n的实例对象
```

**7.接⼝**

接⼝梳理：

**1**. 接⼝⽤于限制⼀个类中包含哪些属性和⽅法：

```typescript
// Person接⼝
interface Person {
// 属性声明
name: string
age: number
// ⽅法声明
speak():void
}
// Teacher实现Person接⼝
class Teacher implements Person {
name: string
age: number
// 构造器
constructor(name: string,age: number){
this.name = name
this.age = age
}
// ⽅法
speak(){
console.log(&#39;你好！我是⽼师:&#39;,this.name)
}
}
```

**2**. 接⼝是可以重复声明的：

```typescript
// Person接⼝
interface PersonInter {
// 属性声明
name: string
age: number
}
// Person接⼝
interface PersonInter {
// ⽅法声明
speak():void
}
// Person类继承PersonInter
class Person implements PersonInter {
name: string
age: number
// 构造器
constructor(name: string,age: number){
this.name = name
this.age = age
}
// ⽅法
speak(){
console.log(&#39;你好！我是⽼师:&#39;,this.name)
}
}
```

**3**. 【接⼝】与【⾃定义类型】的区别：

![img](https://i2.hdslb.com/bfs/article/1735e92ee39a58ff41090a7ed8285625302417610.jpg@1116w.webp)

```typescript
// Person接⼝
interface Person {
// 应该具有的属性
name: string
age: number
// 应该具有的⽅法
speak():void
}
// Person类型
/*
type Person = {
// 应该具有的属性
name: string
age: number
// 应该具有的⽅法
speak():void
}
*/
// 接⼝当成⾃定义类型去使⽤
let person:Person = {
name:&#39;张三&#39;,
age:18,
speak(){
console.log(&#39;你好！&#39;)
}
}
```

**4**. 【接⼝】与【抽象类】的区别：

![img](https://i2.hdslb.com/bfs/article/dc733b8a0be5f68fa37c976453dec1fa302417610.jpg@1116w_336h.webp)

抽象类举例：

```typescript
// 抽象类 —— Person
abstract class Person {
// 属性
name:string
age:number
// 构造器
constructor(name:string,age:number){
this.name = name
this.age = age
}
// 抽象⽅法
abstract speak():void
// 普通⽅法
walk(){
console.log(&#39;我在⾏⾛中....&#39;)
}
}
// Teacher类继承抽象类Person
class Teacher extends Person {
constructor(name:string,age:number){
super(name,age)
}
speak(){
console.log(`我是⽼师，我的名字是${this.name}`)
  }
}
```

接⼝举例：

```typescript
// 接⼝ —— Person，只能包含抽象⽅法
interface Person {
// 属性，不写具体值
name:string
age:number
// ⽅法，不写具体实现
speak():void
}
// 创建Teacher类实现Person接⼝
class Teacher implements Person {
name:string
age:number
constructor(name:string,age:number){
this.name = name
this.age = age
}
speak(){
console.log(&#39;我在⻜快的⾏⾛中......&#39;)
}
}
```

**8**.属性修饰符

![img](https://i2.hdslb.com/bfs/article/d934f1a9f347e7cb5a7025ae4a86814d302417610.jpg@1192w.webp)

**9**.泛型

定义⼀个函数或类时，有些情况下⽆法确定其中要使⽤的具体类型（返回值、参数、属性的类型不能确

定），此时就需要泛型了

举例： &lt;T&gt; 就是泛型，（不⼀定⾮叫 T ），设置泛型后即可在函数中使⽤ T 来表示该类型：

```typescript
function test&lt;T&gt;(arg: T): T{
return arg;
}
// 不指名类型，TS会⾃动推断出来
test(10)
// 指名具体的类型
test&lt;number&gt;(10)
```

泛型可以写多个：

```typescript
function test&lt;T, K&gt;(a: T, b: K): K{
return b;
}
// 为多个泛型指定具体⾃值
test&lt;number, string&gt;(10, &quot;hello&quot;);
```

类中同样可以使⽤泛型：

```typescript
class MyClass&lt;T&gt;{
prop: T;
constructor(prop: T){
this.prop = prop;
}
}
```

也可以对泛型的范围进⾏约束：

```typescript
interface Demo{
length: number;
}
// 泛型T必须是MyInter的⼦类，即：必须拥有length属性
function test&lt;T extends Demo&gt;(arg: T): number{
return arg.length;
}
test(10) // 类型“number”的参数不能赋给类型“Demo”的参数
test({name:&#39;张三&#39;}) // 类型“{ name: string; }”的参数不能赋给类型“Demo”的参数
test(&#39;123&#39;)
test({name:&#39;张三&#39;,length:10})
```