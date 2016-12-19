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

var gs= greetingService('jon');
gs.sayHi();