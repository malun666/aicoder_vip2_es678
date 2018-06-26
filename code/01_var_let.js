// 典型的变量被提升，执行时机的基础问题
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// 解决以上问题
for (var i = 0; i < 10; i++) {
  ((index) => {
    setTimeout(() => {
      console.log(index);
    }, 4);
  })(i);
}

// let方式解决以上问题
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
//暂时性死区
console.log(a); // ReferenceError: a is not defined
let a = 0;

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
