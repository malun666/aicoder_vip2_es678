// 1. 典型的变量被提升，执行时机的基础问题
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// 1.1 解决以上问题
for (var i = 0; i < 10; i++) {
  ((index) => {
    setTimeout(() => {
      console.log(index);
    }, 4);
  })(i);
}

// 1.2 let方式解决以上问题
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// 2. 暂时性死区
console.log(a); // ReferenceError: a is not defined
let a = 0;

// 3. 块接作用域嵌套
{
  let k = 9;
  {
    console.log(k); // => 9
    let m = 10;
    console.log(m); // => 10
  }
  console.log(m); //ReferenceError: m is not defined
}

// 4. 常量

const PI; // SyntaxError: Missing initializer in const declaration

PI = 3.1415926;

// 5. const的块接作用域演示
{
  const S_URL = 'http://aicoder.com';
}

console.log(S_URL); // ReferenceError: S_URL is not defined

// 6. const的暂时性死区
console.log(M_URL); // ReferenceError: M_URL is not defined
{
  const M_URL = 'http://aicoder.com';
}
