var items = new Set(['5',6,7,8]);

items.add('4');
.add(4);
items.add(4);

items.clear();
console.log(items.size);

console.log(items.has('4'));

for(let item of items){
	console.log(item);
}