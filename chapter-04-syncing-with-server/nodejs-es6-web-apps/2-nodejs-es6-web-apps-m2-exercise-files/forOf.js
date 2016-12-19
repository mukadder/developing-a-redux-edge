function sum (first,...args) {
	var sum = first;
	for(num of args){
		sum = sum+num;
	}
	return sum;
}

console.log( sum(1,2,3,4,5));