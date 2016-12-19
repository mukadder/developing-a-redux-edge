function log (level, ...args) {
	if(level === 'debug'){
		for(i of args){
			console.log(i);
		}
	}
}
var a = {a:'foo'};
log('debug', 'Object A: ',a);
