import {Animation,TimeLine,ColorAnimation} from './animation.js'

let box = document.getElementById('box');
let box2= document.getElementById('box2');
let buttonPause= document.getElementById('buttonPause');
let buttonPlay= document.getElementById('buttonPlay');
let buttonRe= document.getElementById('buttonRe');
let buttonAdd= document.getElementById('buttonAdd');


let timeLine = new TimeLine();
let linear = t => t;
	timeLine.add(new ColorAnimation(box2.style,'backgroundColor',null,{r:0,g:0,b:0,a:1},{r:255,g:0,b:0,a:1},2000,0,linear),0)


buttonPause.addEventListener('click',()=>{
	timeLine.pause();
})
buttonPlay.addEventListener('click',()=>{
	timeLine.play();
})
buttonRe.addEventListener('click',()=>{
	timeLine.restart();
})
buttonAdd.addEventListener('click',()=>{
	timeLine.add(new Animation(box2.style,'transform',v=>`translateX(${v}px)`,0,400,2000,0,linear))
})
setTimeout(()=>{
	timeLine.start()
},3000)