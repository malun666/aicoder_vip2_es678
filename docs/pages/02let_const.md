# let 与 const 增强变量声明

ES6 新增了`let`命令，用来声明局部变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效，而且有暂时性死区的约束。

先看个`var`的常见变量提升的面试题目：

```js
题目1：
var a = 99;            // 全局变量a
f();                   // f是函数，虽然定义在调用的后面，但是函数声明会提升到作用域的顶部。
console.log(a);        // a=>99,  此时是全局变量的a
function f() {
  console.log(a);      // 当前的a变量是下面变量a声明提升后，默认值undefined
  var a = 10;
  console.log(a);      // a => 10
}

// 输出结果：
undefined
10
99
```

如果以上题目有理解困难的童鞋，请系统的看一下老马的[**免费 JS 高级视频教程**](http://qtxh.ke.qq.com/)。

## ES6 可以用 let 定义块级作用域变量

在 ES6 之前，我们都是用 var 来声明变量，而且 JS 只有函数作用域和全局作用域，没有块级作用域，所以`{}`限定不了 var 声明变量的访问范围。
例如：

```js
{
  var i = 9;
}
console.log(i); // 9
```

ES6 新增的`let`，可以声明块级作用域的变量。

```js
{
  let i = 9; // i变量只在 花括号内有效！！！
}
console.log(i); // Uncaught ReferenceError: i is not defined
```

## let 配合 for 循环的独特应用

`let`非常适合用于 `for`循环内部的块级作用域。JS 中的 for 循环体比较特殊，每次执行都是一个全新的独立的块作用域，用 let 声明的变量传入到 for 循环体的作用域后，不会发生改变，不受外界的影响。看一个常见的面试题目：

```js
for (var i = 0; i <10; i++) {  
  setTimeout(function() {  // 同步注册回调函数到 异步的 宏任务队列。
    console.log(i);        // 执行此代码时，同步代码for循环已经执行完成
  }, 0);
}
// 输出结果
10   共10个
// 这里面的知识点： JS的事件循环机制，setTimeout的机制等

// 解决以上问题
for (var i = 0; i < 10; i++) {
  ((index) => {
    setTimeout(() => {
      console.log(index);
    }, 4);
  })(i);
}
// 输出结果：
0  1  2  3  4  5  6  7  8 9
```

如果把 `var`改成 `let`声明：

```js
// i虽然在全局作用域声明，但是在for循环体局部作用域中使用的时候，变量会被固定，不受外界干扰。
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);    //  i 是循环体内局部作用域，不受外界影响。
  }, 0);
}
// 输出结果：
0  1  2  3  4  5  6  7  8 9
```

## let 没有变量提升与暂时性死区

用`let`声明的变量，不存在变量提升。而且要求必须 等`let`声明语句执行完之后，变量才能使用，不然会报`Uncaught ReferenceError`错误。
例如：

```js
console.log(aicoder); // 错误：Uncaught ReferenceError ...
let aicoder = 'aicoder.com';
// 这里就可以安全使用aicoder
```

> ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
> 总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

## let 变量不能重复声明

let 不允许在相同作用域内，重复声明同一个变量。否则报错：`Uncaught SyntaxError: Identifier 'XXX' has already been declared`

例如：

```js
let a = 0;
let a = 'sss';
// Uncaught SyntaxError: Identifier 'a' has already been declared
```

## 块接作用域嵌套

```js
// 块接作用域嵌套
{
  let k = 9;
  {
    console.log(k); // => 9
    let m = 10;
    console.log(m); // => 10
  }
  console.log(m); //ReferenceError: m is not defined
}
```

这样原先我们的立即执行函数就可以被块级作用域取代了。

## let 小结

ES6 的 let 让 js 真正拥有了块级作用域，也是向这更安全更规范的路走，虽然加了很多约束，但是都是为了让我们更安全的使用和写代码。

##
