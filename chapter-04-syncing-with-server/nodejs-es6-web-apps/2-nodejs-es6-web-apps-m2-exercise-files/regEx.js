var str = 'Welcome to Jon';
var regexY = /Jon/y;
var regexG = /Jon/g;

regexY.lastIndex = 0;
regexG.lastIndex = 0;
console.log(regexY.exec(str)); // false

console.log(regexG.exec(str)); // true

regexY.lastIndex = 11;
console.log(regexY.exec(str)); // true
