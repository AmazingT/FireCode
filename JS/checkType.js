var toString = Object.prototype.toString;

// 方式一
var isString = function(obj) {
    return toString.call(obj) == '[object String]';
}

var isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
}

// 方式二(偏函数：指定部分参数来产生一个新的定制函数的形式)
var isType = function(type) {
    return function(obj) {
        return toString.call(obj) == '[object ' + type + ']';
    }
}

var isString = isType('String');
var isFunction = isType('Function');