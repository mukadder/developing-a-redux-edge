function greetingService(name) {
	return {
		sayHi() {
			console.log('Hello ' + name + '!');
		}, 
		sayBye() {
			console.log('Goodbye ' + name + '!');
		}
	}
}

console.log(greetingService('jon'));