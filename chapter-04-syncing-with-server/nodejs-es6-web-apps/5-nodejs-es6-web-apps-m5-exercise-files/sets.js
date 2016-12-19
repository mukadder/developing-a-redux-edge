var items = new Set();

var x = {foo:'4'};
var y = {bar:'3'};
items.add(x);
items.add(y);

if(true){
	let x = {baz:123};
	items.add(x);
	console.log(items.has(x));
}


for(let item of items){
	console.log(item);
}