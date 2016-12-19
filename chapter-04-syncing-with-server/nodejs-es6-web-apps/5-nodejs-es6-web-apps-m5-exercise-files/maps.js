var person = new Map();

person.set('name','jon')
person.set('age','old');
person.set('single',false);

console.log(person.size);

console.log(person.get('age'));
if(person.has('single')){
	console.log('easier to check for this...');
}

{
	'name':'jon',
	'age':'old',
	'single': false
}