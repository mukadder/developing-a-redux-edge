

function greetingService(name){
	var sayHi = function(){
		console.log('Hello '+ name + '!');
	}
	var sayBye = function(){
		console.log('Goodbye '+ name + '!');
	}
	return {
		sayHi,
		sayBye
	}
}

var gs = greetingService('Jon');

gs.sayHi();
gs.sayBye();