function GreetingService(name) {
	this.name = name;
	this.sayHi = function() {
			console.log(`Hello ${this.name}!`);
		}; 
	this.sayHiAsync = function() {setTimeout(function(){
			console.log(`Hello ${this.name}!`);
		},2000}; 
	this.sayBye = function() {
			console.log(`Goodbye ${this.name}!`);
		}
	}


var {sayHi:hi}= new GreetingService('jon');
hi();