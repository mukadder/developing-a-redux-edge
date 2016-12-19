
function GreetingService(name) {
	this.name = name;
	this.sayHi = () => {
		console.log(this);
		console.log(`Hello ${this.name}!`);
	};
	this.sayHiAsync = function () {
		setTimeout(function(){
			console.log(this);
			console.log(`Hello ${this.name}!`);
		}, 2000)
	};
	this.sayBye = function () {
		console.log(`Goodbye ${this.name}!`);
	}
}


var gs = new GreetingService('jon');
gs.sayHiAsync();