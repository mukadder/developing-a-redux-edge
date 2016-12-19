function greetingService(name) {
	return {
		sayHi() {
			console.log(`Hello ${name}!`);
		}, 
		sayBye() {
			console.log(`Goodbye ${name}!`);
		}
	}
}

var {sayHi:hi}= greetingService('jon');
hi();
bye();