function log (level, ...args) {
	if(level === 'debug'){
		console.log(args);
	}
}
var foo = {bar:'baz'}
var obj = [{a:'a'},{ b:'b'}]
obj = [foo, ...obj];

log('debug', ...obj);