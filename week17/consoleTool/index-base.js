
var tty = require('tty');
var ttys = require('ttys');
const { resolve } = require('path');
const { rejects } = require('assert');
var readline = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;


const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
async function ask(question){
    return new Promise((resolve,reject)=>{
        rl.question(question,(answer)=>{
            resolve(answer)
        });
    })
}

void async function(){
	await ask('is ok?',(answer)=>{
		console.log(answer,'answer')
	});
}();