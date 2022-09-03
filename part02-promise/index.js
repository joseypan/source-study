// 深入了解promise源码

const { reject } = require("promise");

// 1、Promise是一个构造函数，按照之前我们的理解来说它在实例化的时候接收一个函数
function noop() {}
var LAST_ERROR = null;
var IS_ERROR = {};
function MyPromise(fn) {
  //既然是一个构造函数，我们在函数内部一定会使用到this对象。所以需要对this对象进行校验,校验必须通过new的方式来创建实例对象
  // 这里有个疑问，如果不通过new创建实例化对象，应该this指向window对象,应该也是满足的，只有一种情况是外部使用了bind或者call等方式等等。不过这个可能也仅仅是做一层简单校验
  if (typeof this !== "object") {
    throw new Error("Promise只能通过new 构造实例化对象");
  }
  if (typeof fn !== "function") {
    // 我们在使用实际的Promise中也知道其接收一个函数，所以这里要对传入的参数进行类型校验，若不是函数也要给予抛错
    throw new Error("Promise 的参数不是一个函数");
  }
  // 这里声明的_1 _2 _3 _4确实不太明白是什么？
  // 所有“_”前缀属性将被简化为“_{随机数}” 这是之前的注释说明内容，我们暂且就认为这是四个私有属性吧
  // 前面有说到0代表的是pending状态，所以也就是说当我们调用new Promise的时候，实例化对象中的状态变更为pending状态
  this._1 = 0;
  this._2 = 0;
  this._3 = null;
  this._4 = null;
  // 这里进行了一个判断，如果传入的函数和noop相等，则直接返回。按照猜想来说，应该是校验如果传入了同一个函数则不收集
  // 所以这里我们来看一下noop是什么？
  // noop初始是一个传入和返回均为空的函数-->会在then方法中传入一个新的Promise方法中，所以这个noop可能是用来判断是通过new Promise创建，还是通过then函数内部创建的
  // 但是具体目的还不够清晰,先往下继续了解
  if (fn === noop) return;
  // 走到这应该说明我们即将要去处理传入的方法了
  doResolve(fn, this);
}
const mypromise = new MyPromise(() => {});
console.log(mypromise._1);
/**
 * 描述：获取一个可能行为错误的解析器函数，并确保onfulfillment和onRejected只被调用一次。不保证异步。
 * @param {  }
 * @return
 */
function doResolve(fn, promise) {
  // 定义一个状态，一开始初始状态为false，这个状态用来记录有没有被执行过，若已经执行过就不再执行了
  let done = false;
  // 重点要放在这个tryCallTwo方法做了什么，它控制着我们传入fn的调用成功和失败,这里其实只是对我们的fn进行了传入参数的处理，其实无非就是我们在new Promise时获取到了一个函数，然后在某个时机调用这个传入的函数
  const res = tryCallTwo(
    fn,
    (value) => {
      if (done) return;
      done = true;
      resolve(promise, value);
    },
    (error) => {
      if (done) return;
      done = true;
      reject(promise, error);
    }
  );
  // 这里是用来处理调用fn出现错误的边缘情况，如果说调用报错也算作失
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}
/**
 * 描述：处理fn调用的逻辑
 * @param {  }
 * @return
 */
function tryCallTwo(fn, a, b) {
  // 这里的a和b是由外部用户调用的时候决定何时调用，当外部调用a或者b的时候代表了一个状态的扭转
  try {
    fn(a, b);
  } catch (err) {
    LAST_ERROR = err;
    return IS_ERROR;
  }
}
// resolve具体做了什么呢
function resolve(self, newValue) {
  // 判断传入resolve的值是否是实例化对象，若将实例化对象传入则不被允许，这次行为变更为失败状态
  if (newValue === self) {
    return reject(self, new Error("promise不能解析它自身"));
  }
  if (
    newValue &&
    (typeof newValue === "object" || typeof newValue === "function")
  ) {
    // xxxx
  }
  // 这里不是很理解为什么属性和之前为0的属性不一致
  self._2 = 1;
  self._3 = newValue;
  finale(self);
}

// 了解finale方法是做什么的
function finale(self) {
  if (self._1 === 1) {
    // handle(self,self._4);
  }
  if (self._1 === 2) {
  }
}

// 了解.then方法，改方法位于Promise的原型上
Promise.prototype.then = function (onFulfilled, onRejected) {
  // 首先出于安全性考虑，还是要判断一下this的问题，这里是根据this.constructor是不是Promise来判断是不是一个Promise类型的构造函数
  if (this.constructor !== Promise) {
    // 这里没有理解safeThen在做什么?
    return safeThen(this, onFulfilled, onRejected);
  }
  const res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

// 了解Handler;
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
  this.onRejected = typeof onRejected === "function" ? onRejected : null;
  this.promise = promise;
}
// 了解handle;
function handle(self, deferred) {
  // 3代表采用了另一个promise_value的状态
  while (self._2 === 3) {}
  handleResolved(self, deferred);
}

// 了解handleResolved
function handleResolved(self, deferred) {
  asap(function () {
    //判断上一次promise执行的结果是fulfiiled还是rejected，分别调用deferred的不同方法
    const cb = self._2 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
    }
    const ret = tryCallOne(cb, self._3);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}

function tryCallOne(fn, a) {
  try {
    fn(a);
  } catch (err) {
    LAST_ERROR = err;
    return IS_ERROR;
  }
}

// 了解safeThen是做什么的
function safeThen(self, onFulfilled, onRejected) {}

function Person(fn) {
  console.log(555);
}
let person = new Person(() => {
  console.log("handled");
});

console.log(person.constructor === person.__proto__.constructor);
console.log(this.constructor);
