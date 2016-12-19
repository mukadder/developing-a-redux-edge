function* list(num) {

	var list = [{
		title: 'War and Peace'
		}, {
		title: 'Wind in the Willows'
		}, {
		title: 'That Potter Book'
		}, {
		title: 'The other one too... '
		}, {
		title: 'A Book about Rings'
		}, {
		title: 'A Second Book About Rings'
		}, {
		title: 'The Last Rings Book....'
	}]
	var out = [];
	for (item of list) {
		out.push(item);
		if (out.length >= num) {
			num = yield out;
			out = [];
		}
	}
	yield(out);
}

var it = list(0)

console.log(it.next());
console.log(it.next(4));
console.log(it.next(2));
console.log(it.next(2));
console.log(it.next(2));