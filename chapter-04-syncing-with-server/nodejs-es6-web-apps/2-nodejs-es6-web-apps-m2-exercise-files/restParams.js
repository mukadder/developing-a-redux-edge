function log (level, ..args) {
	console.log(arguments);
	if(level === 'debug'){
		console.log(level);
	}
}
var a = {a:'foo'};
log('debug', 'Object A: ',a);




