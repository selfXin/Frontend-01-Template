let funArr = [];
let countAdd = 0;
function match(pattern,string){
	createFunction(pattern);
	let state = funArr[0];
	countAdd++;
	for(let c of string){
		state = state(c,funArr[countAdd],funArr[0]);
	}
	return state === funArr[funArr.length-1];
}

function createFunction(pattern){
	let count = 0;
	let length = pattern.length;
	for(let key of pattern){
		count++;
		void (function (co){
			if(count === length){
				function end(c){
					console.log(c)
					return end;
				}
			}
			function fun(c,next,start){
				if(c === key){
					countAdd++;
					if(co == length){
						return funArr[co];
					}
					return next;
				}else {
					countAdd=1;
					return start;
				}
			}
			funArr.push(fun);
			if(count === length){
				funArr.push(end);
			}
		})(count);
		
	}
}

let pattern = 'abca';
let string = 'who is abcabx shx!';
let result = match(pattern,string);//abx
console.log(`${pattern} 在  ${string}  中 ${result?'存在':'不存在'}`);