class Task {
	constructor(name) {
		this.name = name;
	}

	toString() {
		var not = '';
		if (!this.complete) {
			not = 'not'
		}
		return `${this.name} is ${not} complete`;
	}
}

class Urgent extends Task{
	constructor(name){
		super('!' + name + '!');
	}
	toString(){
		return 'urgent task ' + super.toString()
	}
}
var task1 = new Task('module 1');
var task2 = new Urgent('module 2');
task1.complete = true;
console.log(task1.toString());
console.log(task2.toString());