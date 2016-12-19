var person = new Map([['town', 'kc'], ['kids',3]]);

person.set('name','jon')
person.set('age','old');
person.set('single',false);

console.log(person);
console.log(person.get('age'));

person.forEach(function(value, key, map) {
    console.log(key, value);
})