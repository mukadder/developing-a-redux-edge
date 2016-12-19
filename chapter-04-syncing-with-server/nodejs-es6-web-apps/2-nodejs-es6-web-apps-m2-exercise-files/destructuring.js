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

var {sayHi:hi} = greetingService('Jon');

hi();