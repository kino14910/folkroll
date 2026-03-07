---
title: 'JavaScript'
description: 'JavaScript实用技巧笔记'
pubDate: 'Jan 19 2024'
---

#### 判断对象是否为空

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// 示例
console.log(isEmpty({}));           // true
console.log(isEmpty({ a: 1 }));     // false
console.log(isEmpty(new Date()));   // true（Date 没有可枚举自有属性）



#### 常用事件

鼠标事件：click, mouseenter, mouseleave

表单事件：focus, blur

键盘事件：Keydown, Keyup

文本事件：input



#### String常用方法

- slice(start,end) 方法提取字符串的一部分并返回一个新的字符串。它接受两个参数，第一个参数表示开始位置，第二个参数表示结束位置（不包括）。当 slice() 方法的参数为负数时，它表示从字符串的末尾开始计算位置。
- substring(start,end) 方法与 slice() 类似。不同之处在于，substring() 不接受负数作为参数。
- substr(start,number) 方法也是提取字符串的一部分并返回一个新的字符串。它接受两个参数，第一个参数表示开始位置，第二个参数表示要提取的字符数。
- split(String) 方法将一个字符串分割成多个子字符串，并将结果存储在数组中。它接受两个参数，第一个参数是分隔符，第二个参数是返回数组的最大长度。

#### Array中常用方法

splice() 方法通过移除或者替换已存在的元素和/或添加新元素就地改变一个数组的内容。

要创建一个删除和/或替换部分内容而不改变原数组的新数组，请使用 toSpliced()。要访问数组的一部分而不修改它，参见 slice()。

Array 实例的 toSpliced() 方法是 splice() 方法的复制版本。它返回一个新数组，并在给定的索引处删除和/或替换了一些元素。

slice() 方法返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的浅拷贝（包括 start，不包括 end），其中 start 和 end 代表了数组元素的索引。原始数组不会被改变。



#### Array.prototype.reduce()

用法：
```javascrip
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// Expected output: 10
```

第一次调用回调时初始化 `accumulator` 的值。如果指定了 `initialValue`，则 `callbackFn` 从数组中的第一个值作为 `currentValue` 开始执行。如果没有指定 `initialValue`，则 `accumulator` 初始化为数组中的第一个值，并且 `callbackFn` 从数组中的第二个值作为 `currentValue` 开始执行。在这种情况下，如果数组为空（没有第一个值可以作为 `accumulator` 返回），则会抛出错误。



#### 浅拷贝和深拷贝

浅拷贝和深拷贝是针对引用数据类型的。浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象 。

赋值和浅拷贝的区别在于，当我们把一个对象赋值给一个新的变量时，赋的其实是该对象的在栈中的地址，而不是堆中的数据。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。浅拷贝是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象 。



#### 访问对象属性的两种方式

`objectName.propertyName`
`objectName['propertyName']`



#### 操作属性的方法

`Object.keys()`  遍历输出对象中所有的属性
`delete person.age`  删除age属性



#### 改变函数内部this值的三种方法

- `call`方法接受一个或多个参数，第一个参数是要绑定到`this`的值，其余参数是要传递给函数的实参。它会立即调用函数并返回结果。
- `apply`方法接受两个参数，第一个参数是要绑定到`this`的值，第二个参数是一个数组，其中包含要传递给函数的实参。它也会立即调用函数并返回结果。
- `bind`方法接受一个或多个参数，第一个参数是要绑定到`this`的值，其余参数是要传递给函数的实参。它不会立即调用函数，而是返回一个新的函数，当这个新函数被调用时，它会使用指定的`this`值和实参来调用原始函数。

下面是一个例子：

```javascript
const person = {
    firstName: "John",
    lastName: "Doe",
};

function greet(greeting){
    console.log(`${greeting},${this.firstName} ${this.lastName}`)
}

greet.call(person, "Hello"); // 输出 "Hello,John Doe"
greet.apply(person, ["Hello"]); // 输出 "Hello,John Doe"

const boundGreet = greet.bind(person);
boundGreet("Hello"); // 输出 "Hello,John Doe"
```



#### 虚拟 DOM

虚拟 DOM （Virtual DOM）是一个普通的 JavaScript 对象，整个VNode的集合就是一个虚拟DOM树。

VNode的全称是Virtual Node，也就是虚拟节点。它是指一个抽象的节点对象，用于描述真实DOM中的元素。在前端框架中，通过操作VNode来实现虚拟DOM，从而提高性能。

VNode是一个JavaScript对象，它描述了真实DOM中的节点信息和属性。它可以描述不同类型的节点，比如普通元素节点、组件节点等。手动创建VNode需要使用Vue3提供的h函数，它接受三个参数：tag（标签名）、props（属性对象）、children（子元素）。例如，创建一个div元素的VNode可以写成：`const vnode = h('div', { class: 'my-class' }, 'Hello World');`。

虚拟DOM可以在内存中进行操作，然后通过算法比较新旧虚拟DOM的差异，最终只对发生变化的部分进行DOM操作，从而提高了性能。

虚拟DOM有很多优势。它可以保证性能下限，因为它比起粗暴的DOM操作性能要好很多。 它也无需手动操作DOM，只需要写好View-Model的代码逻辑，框架会根据虚拟DOM和数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率。 虚拟DOM本质上是JavaScript对象，而DOM与平台强相关，相比之下虚拟DOM可以进行更方便地跨平台操作，例如服务器渲染、weex开发等等。

虚拟DOM的缺点包括无法进行极致优化。虽然虚拟DOM加上合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化。此外，首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。

Svelte是一个无虚拟DOM的框架，它通过编译时静态分析来实现对DOM更新的优化。这种方式能够在编译时确定哪些部分需要更新，从而减少运行时的计算开销。



#### 生成器

生成器函数使用 `function*` 语法编写。最初调用时，生成器函数不执行任何代码，而是返回一种称为 Generator 的迭代器。通过调用生成器的下一个方法消耗值时，Generator 函数将执行，直到遇到 `yield` 关键字。可以根据需要多次调用该函数，并且每次都返回一个新的 Generator，但每个 Generator 只能迭代一次。

生成器是一种特殊的函数，它可以在执行过程中暂停并在稍后恢复执行。生成器函数由一个星号（*）和关键字 `function` 来定义，或者使用 `function*` 表示。生成器函数在执行时会返回一个 `Generator` 对象，该对象符合可迭代协议和迭代器协议。

下面是一个简单的例子，它定义了一个生成器函数 `generator()`，并使用 `yield` 关键字来暂停函数的执行。

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = generator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```



#### Promise

Promise是一个表示异步操作结果的对象，它有三种状态：pending（等待）、fulfilled（成功）和rejected（失败）。Promise中的resolve和reject是两个函数，它们可以改变Promise的状态和传递结果值。

- resolve函数可以将Promise的状态从pending变为fulfilled，并将一个值作为Promise的成功结果。例如，`resolve('成功')`会返回一个以'成功'为结果的Promise对象。
- reject函数可以将Promise的状态从pending变为rejected，并将一个值作为Promise的失败原因。例如，`reject('失败')`会返回一个以'失败'为原因的Promise对象。

Promise中的resolve和reject函数通常作为Promise构造函数的参数传递给一个执行器函数，该函数在创建Promise对象时立即执行，并根据异步操作的结果调用resolve或reject函数。例如，下面的代码创建了一个Promise对象，它在1秒后调用resolve或reject函数：

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 50%的概率成功，50%的概率失败
    if (Math.random() < 0.5) {
      resolve('成功');
    } else {
      reject('失败');
    }
  }, 1000);
});
```




Promise对象可以通过then方法注册成功和失败的回调函数，这些函数会在Promise状态改变时被调用，并接收到resolve或reject传递的值。例如，下面的代码注册了两个回调函数，分别打印出成功或失败的信息：

```js
promise.then(
  (value) => {
    console.log('成功：' + value);
  },
  (reason) => {
    console.log('失败：' + reason);
  }
);
```



```javascript
const p1 = new Promise((resolve, reject) => {
  resolve("成功！");
});

p1.then((value) => {
  console.log(value); // "成功！"
  throw new Error("噢，不！");
})
  .catch((e) => {
    console.error(e.message); // "噢，不！"
  })
  .then(
    () => console.log("在 catch 后，调用链恢复了"),
    () => console.log("因为有了 catch 而不会被触发"),
  );

// 下面的行为与上面相同
p1.then((value) => {
  console.log(value); // "成功！"
  return Promise.reject("噢，不！");
})
  .catch((e) => {
    console.error(e); // "噢，不！"
  })
  .then(
    () => console.log("在 catch 后，调用链恢复了"),
    () => console.log("因为有了 catch 而不会被触发"),
  );

```

##### async/await语法糖

下面两者是等价的

```javascript
myPromise.then(result => {
  console.log(result);
});
```

```javascript
async function getResult() {
  let result = await myPromise;
  console.log(result);
}
getResult();
```

两者都可以用来处理 Promise 的结果。不过，async/await 通常更易于阅读和理解，尤其是在处理多个异步操作时。



#### fetch()

`fetch()` 是一个全局方法，用于发起获取资源的请求。它返回一个 `Promise`，这个 `Promise` 会在请求响应后被 `resolve`，并传回 `Response` 对象。最简单的用法是只提供一个参数用来指明想 `fetch()` 到的资源路径，然后返回一个包含响应结果的 `Promise`（一个 `Response` 对象）。

`fetch()` 还可以接受第二个可选参数，一个可以控制不同配置的 `init` 对象。可选的参数有：`method`, `headers`, `body`, `mode`, `credentials`, `cache`, `redirect`, `referrer`, `referrerPolicy`, 和 `integrity`。

例如，你可以这样使用它：

```javascript
fetch('https://example.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John',
    age: 30
  })
});
```



#### 事件监听

`ele.onclick=null`
`ele.addEventListener('click',function foo(e){})`
`removeEventListener('click',foo)`



#### 鼠标事件

有事件冒泡（一般不使用）：mouseover mouseout
无事件冒泡：mouseenter mouseleave



#### 事件委托

事件委托是利用事件冒泡的特点解决一些开发需求的知识技巧
优点：减少注册次数，可以提高程序性能
原理：给父元素注册事件，当我们触发子元素的时候，会冒泡到父元素身上，从而触发父元素的事件
实现：事件对象.target.tagName 可以获得真正触发事件的元素
ul.addEventListener('click'，function(){})执行父级点击事件



#### this

在全局执行环境中（在任何函数体外部），无论是否在严格模式下，`this` 都指向全局对象window。

在函数内部，`this`的值取决于函数被调用的方式。没有明确调用者时`this`值为window，严格模式下没有调用者时 `this` 的值为 undefined

在需要使用this时，不能使用箭头函数，否则会调用上一层的对象



#### Document: DOMContentLoaded 事件

`DOMContentLoaded`和`load`都是页面加载的时候触发的事件。区别在于触发的时机不一样。纯 HTML 被完全加载以及解析时，即当浏览器把DOM构建完成后就开始触发了`DOMContentLoaded`事件，不必等待样式表，图片或者子框架完成加载。而`load`事件则要等包括图片这些加载完毕才会触发。我们监听事件的时候把优先级高的可以先监听`DOMContentLoaded`。

`beforeunload`事件在窗口、文档和其资源将要卸载时触发。此时，您可以询问用户是否真的要离开页面，并执行一些清理操作。
`unload`事件在文档或子资源被卸载时触发。此时，您可以执行一些不涉及延迟的操作，例如关闭相关的弹出窗口。

这些事件都可以用来在页面加载和卸载过程中执行特定的操作。



#### javaScript中几种获取DOM内容的方法的区别

> [!Caution]
>
> innerText和outerText只在chrome浏览器中有效

让我们通过具体示例代码展示如何使用`innerHTML`、`innerText`、`outerHTML`、`outerText`和`textContent`来获取和修改HTML元素的内容。假设我们有如下HTML结构：

```html
<div id="example">
  <p>这是一个<strong>段落</strong></p>
</div>
```

我们将通过JavaScript来获取和修改这个结构中的内容。

##### innerHTML

获取

```javascript
var divElement = document.getElementById('example');
var innerHTML = divElement.innerHTML;
console.log(innerHTML);
// 输出: <p>这是一个<strong>段落</strong></p>
```

修改

```javascript
divElement.innerHTML = '<p>这是一个<span>新的段落</span></p>';
console.log(divElement.innerHTML);
// 输出: <p>这是一个<span>新的段落</span></p>
```

##### innerText

获取

```javascript
var innerText = divElement.innerText;
console.log(innerText);
// 输出: 这是一个段落
```

 修改
```javascript
divElement.innerText = '这是新的文本内容';
console.log(divElement.innerText);
// 输出: 这是新的文本内容
```

#####  outerHTML

 获取
```javascript
var outerHTML = divElement.outerHTML;
console.log(outerHTML);
// 输出: <div id="example"><p>这是一个<strong>段落</strong></p></div>
```

 修改
```javascript
divElement.outerHTML = '<section><p>这是一个新的元素</p></section>';
// divElement现在指向的旧的DOM节点已经被替换
// 如果我们需要继续操作新的元素，需要重新获取引用
var newElement = document.querySelector('section');
console.log(newElement.outerHTML);
// 输出: <section><p>这是一个新的元素</p></section>
```

##### outerText

 获取
```javascript
var outerText = divElement.outerText;
console.log(outerText);
// 输出: 这是一个段落
```

 修改
```javascript
divElement.outerText = '这是新的外部文本内容';
// divElement现在指向的旧的DOM节点已经被替换
// 如果我们需要继续操作，需要重新获取引用
console.log(document.body.innerHTML);
// 输出: 这是新的外部文本内容
```

##### textContent

 获取
```javascript
var textContent = divElement.textContent;
console.log(textContent);
// 输出: 这是一个段落
```

 修改
```javascript
divElement.textContent = '这是新的文本内容';
console.log(divElement.textContent);
// 输出: 这是新的文本内容
```

通过这些示例，可以清晰地看到每种属性在处理HTML内容时的行为差异。选择合适的属性取决于你是否需要处理HTML标签，以及是否需要替换整个元素。




#### 对象原型 `Prototype`

```javascript
function Person(name) {
  this.name = name;
  // 这是一个不带`Prototype`的方法，只能被Person实例调用
  this.sayName = function() {
    console.log(this.name);
  };
}

// 这是一个带`Prototype`的方法，可以被所有Person实例共享
Person.`Prototype`.sayHello = function() {
  console.log("Hello, I'm " + this.name);
};

var alice = new Person("Alice");
var bob = new Person("Bob");

alice.sayName(); // Alice
bob.sayName(); // Bob

alice.sayHello(); // Hello, I'm Alice
bob.sayHello(); // Hello, I'm Bob
```



#### JS中的三种方法

1.  实例方法 ：
   - 适用于需要访问或修改对象特定状态的场景。
   - 每个实例都有自己的方法副本。
   - 示例：在构造函数中定义的方法，只有实例可以调用，例如 this.move 和 this.eat。

2.  静态方法 ：
   - 适用于不需要对象实例参与的场景。
   - 直接通过类本身调用，而不是通过实例。
   - 示例：通过构造函数直接定义的方法，只能被构造函数本身调用，实例无法调用，例如 Cat.eat。

3.  原型方法 ：
   - 适用于所有实例共享的功能，有助于节省内存。
   - 定义在构造函数的原型对象上，实例和构造函数都可以访问。
   - 示例：通过 Cat.prototype.eat 定义的方法，实例和构造函数都可以调用 。

总结，实例方法只有实例可以调用，静态方法只有构造函数可以调用，而原型方法是实例和构造函数都可以共享的方法。 



#### 创建对象

- 使用 **Object 构造函数**，它可以根据给定的参数创建一个对象包装器。例如：

```js
var person = new Object(); // 创建一个空对象
person.name = "张三"; // 添加一个 name 属性
person.age = 25; // 添加一个 age 属性
person.sayHello = function() { // 添加一个 sayHello 方法
  console.log("你好，我叫" + this.name);
};
```

- 使用 **对象字面量**，它是一种简洁的语法，可以直接在大括号中定义对象的属性和方法。例如：

```js
var person = { // 创建一个对象
  name: "李四", // 定义一个 name 属性
  age: 30, // 定义一个 age 属性
  sayHello: function() { // 定义一个 sayHello 方法
    console.log("你好，我叫" + this.name);
  }
};
```

- 使用 **Object.create() 方法**，它可以以一个现有对象作为原型，创建一个新对象。这样，新对象可以继承原型对象的属性和方法。例如：

```js
var animal = { // 创建一个 animal 对象
  type: "狗", // 定义一个 type 属性
  eat: function() { // 定义一个 eat 方法
    console.log("我喜欢吃骨头");
  }
};

var dog = Object.create(animal); // 以 animal 为原型创建一个 dog 对象
dog.name = "旺财"; // 添加一个 name 属性
dog.bark = function() { // 添加一个 bark 方法
  console.log("汪汪汪");
};
```

- 使用 **函数来定义对象**，然后使用 **new 操作符**来创建新的对象实例。这样，可以实现类似于类的概念，让不同的对象具有相同的属性和方法。例如：

```js
function Person(name, age) { // 定义一个 Person 函数
  this.name = name; // 给 this 添加一个 name 属性
  this.age = age; // 给 this 添加一个 age 属性
  this.sayHello = function() { // 给 this 添加一个 sayHello 方法
    console.log("你好，我叫" + this.name);
  };
}

var zhangsan = new Person("张三", 25); // 使用 new 操作符创建一个 zhangsan 对象
var lisi = new Person("李四", 30); // 使用 new 操作符创建一个 lisi 对象
```



##### ES6之后创建对象和继承对象

- 创建对象：使用**类（class）**语法，可以更简洁地定义对象的构造函数和原型方法。例如：

```js
// ES5 的写法
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() {
  console.log('Hello, I am ' + this.name);
};

// ES6 的写法
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, I am ${this.name}`);
  }
}
```

- 继承对象：使用**extends**和**super**关键字，可以更方便地实现对象之间的继承。例如：

```js
// ES5 的写法
function Student(name, age, grade) {
  Person.call(this, name, age); // 调用父类的构造函数
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype); // 设置原型链
Student.prototype.constructor = Student; // 修正构造函数指向

Student.prototype.sayGrade = function() {
  console.log('I am in grade ' + this.grade);
};

// ES6 的写法
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // 调用父类的构造函数
    this.grade = grade;
  }

  sayGrade() {
    console.log(`I am in grade ${this.grade}`);
  }
}
```



#### catch

- catch是catch前面所有then的错误吗？ 是的，catch方法可以用来处理前面所有then方法中发生的错误。它相当于调用Promise.`Prototype`.then(undefined, onRejected)，也就是说，它只处理被拒绝的情况。如果前面的then方法都成功执行了，那么catch方法不会被调用。
  catch之后后面所有的then都不执行吗？ 不一定，catch方法返回一个新的Promise对象，这个Promise对象的状态取决于catch方法中的回调函数的返回值。如果回调函数抛出了一个错误或者返回了一个被拒绝的Promise对象，那么catch方法返回的Promise对象也会被拒绝，后面的then方法不会执行。但是如果回调函数没有抛出错误或者返回了一个成功的Promise对象，那么catch方法返回的Promise对象也会成功，后面的then方法会继续执行。

- 

- 如果用async await，是像下面这样使用catch吗 

```javascript
async function getResult() {
    let result = await myPromise;
    console.log(result);
    result.catch((e) => {
        console.error(e);  //“噢，不！” 
    }) 
} 
getResult(); 
```



不完全正确，async await是一种语法糖，它可以让我们用同步的方式写异步的代码。当我们使用await关键字等待一个Promise对象时，如果这个Promise对象被拒绝了，那么await表达式会抛出一个错误，我们可以用try catch语句来捕获这个错误。例如：

```javascript
async function getResult() {
    try {
        let result = await myPromise;
        console.log(result);
    } catch (e) {
        console.error(e); // “噢，不！” 
    }
}
getResult();
```



在您的代码中，您没有使用try catch语句来捕获await表达式抛出的错误，而是在result上调用了catch方法。这样做有两个问题：

- 如果myPromise被拒绝了，那么result变量根本就没有被赋值，它是undefined。在undefined上调用catch方法会报错。
- 如果myPromise成功了，那么result变量就是myPromise的成功值，它可能不是一个Promise对象。在非Promise对象上调用catch方法也会报错。

所以，正确的做法是使用try catch语句来处理await表达式可能抛出的错误。



#### `Prototype`和`__proto__`

`Prototype`和`__proto__`是JavaScript中的两个重要概念，它们的区别和关系如下：

- `Prototype`是函数才有的属性，它指向函数的原型对象，也就是以该函数作为构造函数创建的对象的原型。原型对象可以包含实例共享的属性和方法，也有一个constructor属性指向原构造函数。
- `__proto__`是每个对象都有的属性，它指向当前对象的原型对象（隐式原型），也就是构造该对象的构造函数的`Prototype`属性。`__proto__`属性可以用来实现基于原型的继承和属性的共享。
- `Prototype`和`__proto__`之间的关系是：一个对象的`__proto__`属性指向它的构造函数的`Prototype`属性，这样就形成了一个原型链，可以沿着这条链查找对象的属性和方法。

指向对象原型的属性并**不**是 `prototype`。它的名字不是标准的，但实际上所有浏览器都使用 [`__proto__`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)。访问对象原型的标准方法是 [`Object.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)。

#### js中append和appendChild的区别

> [!TIP]
>
> 不使用**`Node.appendChild()`**，**有更加新的 API 可供使用！** > [ParentNode.append()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/append) 方法支持多个参数，接受字符串作为参数，会将字符串转换为文本节点再附加。

- append方法是一个新的API，它可以接受多个参数，包括字符串、节点或文档片段，它会将这些参数转换为文本节点或保持原样，然后追加到父元素的末尾，append没有返回值。
- appendChild方法是一个旧的API，它只能接受一个参数，且参数类型必须是一个节点，如果要插入字符串，需要先用document.createTextNode方法创建一个文本节点它会将这个节点追加到父元素的末尾。如果这个节点已经存在于文档中，它会被移动到新的位置，而不是复制，appendChild返回插入的节点对象。

这些区别可以用下面的代码示例来说明：

```js
// 创建一个父节点和两个子节点
const parent = document.createElement('div');
const child1 = document.createElement('p');
const child2 = document.createElement('p');

// 使用append方法
parent.append(child1, child2, 'Hello world'); // 一次插入两个节点和一个字符串
console.log(parent.append(child1)); // 没有返回值，输出undefined

// 使用appendChild方法
parent.appendChild(child1); // 插入一个节点
console.log(parent.appendChild(child1)); // 返回插入的节点，输出<p></p>
parent.appendChild('Hello world'); // 抛出错误，不能插入字符串
```



#### Symbol

Symbol是一种基本数据类型，它可以用来创建对象的唯一标识符。Symbol有静态属性和静态方法，它们可以访问一些内置的Symbol值，例如Symbol.iterator，Symbol.match等。Symbol也有原型属性和原型方法，它们可以对Symbol对象进行操作，例如Symbol.prototype.toString，Symbol.prototype.valueOf等。



##### 创建Symbol值

要创建一个Symbol值，你可以使用Symbol()函数，并传入一个可选的字符串作为描述。例如：

```js
var sym1 = Symbol(); // 创建一个无描述的Symbol值
var sym2 = Symbol("foo"); // 创建一个描述为"foo"的Symbol值
```

注意，每次调用Symbol()函数都会返回一个新的Symbol值，即使传入相同的描述也不会相等。例如：

```js
Symbol("foo") === Symbol("foo"); // false
```



##### Symbol.for()

如果你想创建一个全局共享的Symbol值，你可以使用Symbol.for()方法，并传入一个字符串作为键。这个方法会在全局的Symbol注册表中查找是否已经存在一个与该键对应的Symbol值，如果存在则返回该值，否则创建一个新的值并注册到表中。例如：

```js
var sym1 = Symbol.for("foo"); // 创建或获取一个键为"foo"的Symbol值
var sym2 = Symbol.for("foo"); // 获取同一个Symbol值
sym1 === sym2; // true
```



##### Symbol.keyFor()

要从全局的Symbol注册表中获取一个键，你可以使用Symbol.keyFor()方法，并传入一个Symbol值。这个方法会返回该值在注册表中对应的键，如果不存在则返回undefined。例如：

```js
var sym = Symbol.for("foo"); // 创建或获取一个键为"foo"的Symbol值
var key = Symbol.keyFor(sym); // 获取该值对应的键
console.log(key); // "foo"
```



##### Symbol作为属性名

要在对象中使用Symbol作为属性名，你可以用方括号语法来定义或访问该属性。例如：

```js
var sym = Symbol("name"); // 创建一个描述为"name"的Symbol值
var obj = {}; // 创建一个空对象
obj[sym] = "Alice"; // 使用Symbol作为属性名来定义一个属性
console.log(obj[sym]); // "Alice"
```

注意，使用Symbol作为属性名的属性不会出现在for…in, for…of循环中，也不会被Object.keys(), Object.getOwnPropertyNames(), JSON.stringify()等方法返回。但是，你可以使用Object.getOwnPropertySymbols()方法来获取一个对象的所有Symbol属性名，它会返回一个包含这些属性名的数组。例如：

```js
var sym1 = Symbol("name");
var sym2 = Symbol("age");
var obj = {};
obj[sym1] = "Alice";
obj[sym2] = "18";
obj.gender = "female";
console.log(Object.keys(obj)); // ["gender"]
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(name), Symbol(age)]
```



##### 为对象的属性方法添加Symbol

```js
let game = {
            name: '俄罗斯方块', // 定义一个name属性，值为'俄罗斯方块'
            up: function () { // 定义一个up方法，打印'up'
                console.log('up')
            },
            down: function () { // 定义一个down方法，打印'down'
                console.log('down')
            }
        }
        let method = {
            up: Symbol(), // 定义一个up属性，值为一个Symbol值
            down: Symbol(), // 定义一个down属性，值为一个Symbol值
        }

        game[method.up] = function () { // 使用method.up作为键，给game对象添加一个新的方法up2，打印'up2'
            console.log('up2')
        }

        game[method.down] = function () { // 使用method.down作为键，给game对象添加一个新的方法down2，打印'down2'
            console.log('down2')
        }

        console.log(game) // 打印出game对象的内容
```



##### Symbol属性

Symbol.hasInstance 让调用instanceof时使用自定义的函数

```javascript
class Person {
  static [Symbol.hasInstance](param) {
    console.log(param)
    console.log("我被用来检测类型了")
    return false
  }
}

let o = {}

console.log(o instanceof Person)
```

结果

`{}`
`我被用来检测类型了`



Symbol.isConcatSpreadable 让调用concat时数组不拆分，用数组的形式进行合并

    const arr = [1, 2, 3]
    
    const arr2 = [4, 5, 6]
    
    arr2[Symbol.isConcatSpreadable] = false
    
    console.log(arr.concat(arr2)) // [1, 2, 3, [4, 5, 6]]

结果 





对于类数组 (array-like) 对象，默认不展开。期望展开其元素用于连接，需要设置 `Symbol.isConcatSpreadable` 为 true：

```
var x = [1, 2, 3];

var fakeArray = {
  [Symbol.isConcatSpreadable]: true,
  length: 2,
  0: "hello",
  1: "world",
};

x.concat(fakeArray); // [1, 2, 3, "hello", "world"]
```



innerHTML：可获取或设置指定元素标签内的 html 内容，从该元素的起始标签到结束标签之间全部内容(包含html标签)。

innerText：可获取或设置指定元素标签内的文本值，从该元素的起始标签到结束标签之间的全部文本内容(不包含html标签)。

outerHTML：除了包含 innerHTML 的全部内容外, 还包含元素标签本身。

例如：


```html
<div>
    <span>文本1</span>文本2
</div>

div 元素的 innerHTML 值是：<span>文本1</span>文本2
div 元素的 innerText 值是：文本1 文本2
div 元素的 outerHTML 值是：<div><span>文本1</span>文本2</div>
```

```js
//在JS中，所有函数都能作为构造函数，构造出一个对象
//创建函数
function GoodFriend(){
    this.name = "三三";
}
//现在设置GoodFriend()这个函数的prototype属性，prototype属性指向一个对象
//先定义一个Girl对象，再把Girl赋值给GoodFriend()的prototype
var Girl = {
    who : "张三三"
};
//使GoodFriend()的prototype属性指向Gril对象
GoodFriend.prototype = Girl;
//此时用 GoodFriend() 作为构造函数，构造出Object对象
var myFriend = new GoodFriend();
console.log(myFriend.__proto__ === GoodFriend.prototype) //true
```

- ?. 是可选链运算符，它允许您安全地访问对象属性，即使该属性不存在或者是null或undefined。例如，如果您有一个对象user，它可能有一个属性name，也可能没有，您可以使用user?.name来获取name的值，而不会抛出错误。如果user是null或undefined，那么表达式的结果也是null或undefined。
- ?? 是空值合并运算符，它用于在左侧操作数为null或undefined时，返回右侧操作数的值。例如，如果您有一个变量x，它可能有一个有效的值，也可能是null或undefined，您可以使用x ?? "default"来获取x的值，或者在x无效时使用"default"作为默认值。
- || 是逻辑或运算符，它用于在左侧操作数为假值时，返回右侧操作数的值。假值包括false，0，“”，null，undefined和NaN。例如，如果您有一个变量y，它可能是一个布尔值，也可能是其他类型，您可以使用y || true来获取y的值，或者在y为假值时使用true作为默认值。

?? 与 || 的区别 相同点 用法相同，都是前后是值，中间用符号连接。根据前面的值来判断最终返回前面的值还是后面的值。 值1 ?? 值2 值1 || 值2

不同点 判断方式不同： 使用 ?? 时，只有当值1为null或undefined时才返回值2； 使用 || 时，值1会转换为布尔值判断，为true返回值1，false 返回值2

```js
 // ??
 undefined ?? 2  // 2
 null ?? 2       // 2
 0 ?? 2          // 0
 "" ?? 2         // ""
 true ?? 2       // true
 false ?? 2      // false
 
 // ||
 undefined || 2  // 2
 null || 2       // 2
 0 || 2          // 2
 "" || 2         // 2
 true || 2       // true
 false || 2      // 2
```



#### Unqualified identifier assignment

- 在非严格模式下，如果给一个没有在作用域链中声明的标识符赋值，那么会默认在全局对象上创建一个同名的属性。例如，foo = "f"会在globalThis上创建一个foo属性。
- 在严格模式下，如果给一个没有在作用域链中声明的标识符赋值，那么会抛出一个ReferenceError，以避免在全局对象上意外创建属性。例如，foo = "f"会报错。
- 这个特性的目的是为了让全局对象上的属性可以在任何作用域中方便地访问，而不需要使用globalThis.或window.或global.等前缀。例如，String(“s”)可以直接使用，而不需要globalThis.String(“s”)。



#### 新增运算符

- ?. 是可选链运算符，它允许您安全地访问对象属性，即使该属性不存在或者是null或undefined。例如，如果您有一个对象user，它可能有一个属性name，也可能没有，您可以使用user?.name来获取name的值，而不会抛出错误。如果user是null或undefined，那么表达式的结果也是null或undefined。
- ?? 是空值合并运算符，它用于在左侧操作数为null或undefined时，返回右侧操作数的值。例如，如果您有一个变量x，它可能有一个有效的值，也可能是null或undefined，您可以使用x ?? "default"来获取x的值，或者在x无效时使用"default"作为默认值。
- || 是逻辑或运算符，它用于在左侧操作数为假值时，返回右侧操作数的值。假值包括false，0，“”，null，undefined和NaN。例如，如果您有一个变量y，它可能是一个布尔值，也可能是其他类型，您可以使用y || true来获取y的值，或者在y为假值时使用true作为默认值。
- 逻辑空赋值运算符（`x ??= y`）仅在 `x` 是空值（`null` 或 `undefined`）时对其赋值。



#### HTML DOM 中事件传播方式：冒泡和捕获。

事件传播允许定义事件发生时的元素顺序。如果 <div> 元素内有一个 <p> 元素，并且用户点击了 <p> 元素，那么应该首先处理哪个元素的“点击”事件？

在**冒泡过程中，**最内层元素的事件首先被处理，然后外层元素的事件被处理。首先处理 <p> 元素的点击事件，然后处理 <div> 元素的点击事件。

在**捕获时，**最外层元素的事件会首先处理，然后是内层元素的事件。首先处理 <div> 元素的点击事件，然后处理 <p> 元素的点击事件。



#### 嵌套解构赋值

```js
const { register, handleSubmit, formState: { errors } } = useForm();
```

使用了 **重命名 + 嵌套解构** 的语法。其中：

- `formState: { errors }` 的含义是：
  - 在源对象中找到 `formState` 这个属性；
  - 然后从 `formState` 的值（它是一个对象）中解构出 `errors`；
  - **但不会创建一个名为 `formState` 的变量**。

所以，在这段代码之后，可以直接用 `errors`，但**不能用 `formState`**，除非显式把它解构出来。

---

对比几种写法：

只解构 `errors`：

```js
const { register, handleSubmit, formState: { errors } } = useForm();

console.log(errors);        // ✅ 可以用
console.log(formState);     // ❌ ReferenceError: formState is not defined
```

同时解构 `formState` 和其内部属性：

如果你既想用 `formState` 整体，又想方便地用 `errors`，可以这样写：
```js
const {
  register,
  handleSubmit,
  formState,
  formState: { errors }
} = useForm();

console.log(formState);     // ✅ 可以用
console.log(errors);        // ✅ 也可以用
```

> 注意：这里 `formState` 被解构了一次作为整体，又通过嵌套解构取了 `errors`，这是合法的。

或者只解构 `formState`，再手动取 `errors`：

```js
const { register, handleSubmit, formState } = useForm();
const { errors } = formState;
```
