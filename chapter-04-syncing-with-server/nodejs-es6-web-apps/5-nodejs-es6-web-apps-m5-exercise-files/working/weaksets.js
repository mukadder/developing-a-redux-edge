var items = new WeakSet();

var x = {foo:'4'};
var y = {bar:'3'};
items.add(x);
items.add(y);

if(true){
	let x = {baz:123};
	items.add(x);
	console.log(items.has(x));
}

console.log(items.has(y));