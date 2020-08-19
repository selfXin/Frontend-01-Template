


export class TimeLine {
	constructor(){
		this.state = 'inited';
		this.animations = [];
	}
	tick(){
		this.tickId = null;
		let t = Date.now() - this.startTime;
		let animations = this.animations.filter(e=>e.finished!=true)
		for(let animation of this.animations){
			let {object,property,template,start,end,delay,starTime,duration,timingFunction,valueFromProgression} = animation;

			let progress = timingFunction((t-delay-starTime)/duration);


			if(t>duration+delay+starTime){
				progress = 1;
				animation.finished = true;
			}

			let value = valueFromProgression(progress);
			object[property] = template(value)
		}
		if(true || animations.length)
			this.tickId = requestAnimationFrame(()=>this.tick());
	}

	start(){
		if(this.state != 'inited')
			return;
		this.state = 'playing';
		this.startTime = Date.now();
		this.tick();
	}

	pause(){
		if(this.state != 'playing')
			return;
		this.state = 'paused';
		this.pauseTime = Date.now();
		if(this.tickId)
			cancelAnimationFrame(this.tickId)
	}

	play(){
		if(this.state != 'paused')
			return;
		this.state = 'playing';
		this.startTime += Date.now()-this.pauseTime;
		this.tick();
	}

	restart(){
		if(this.state == 'playing')
			this.pause();

		this.animations = [];
		this.tickId = null;
		this.state = 'inited';
		this.startTime = Date.now();
		this.pauseTime = null;
		this.tick();
	}

	reset(){
		if(this.state == 'playing')
			this.pause();

		
	}

	add(animation,starTime){
		this.animations.push(animation);
		animation.finished = false;
		if(this.state === 'playing'){
			animation.starTime = starTime !== void 0 ?starTime : Date.now() - this.startTime;
		}else{
			animation.starTime = starTime !== void 0 ?starTime : 0;
		}
	}
}

export class Animation {
	constructor(object,property,template,start,end,duration,delay,timingFunction){
		this.object = object;
		this.property = property;
		this.template = template;

		this.start = start;
		this.end = end;

		this.duration = duration;
		this.delay = delay || 0;

		this.timingFunction = timingFunction;
		this.valueFromProgression = this.valueFromProgression.bind(this);
	}

	valueFromProgression(progress){
		return this.start + progress*(this.end-this.start);
	}
}

export class ColorAnimation {
	constructor(object,property,template,start,end,duration,delay,timingFunction){
		this.object = object;
		this.property = property;
		this.template = template || ((v)=>`rgba(${v.r},${v.g},${v.b},${v.a})`);

		this.start = start;
		this.end = end;

		this.duration = duration;
		this.delay = delay || 0;

		this.timingFunction = timingFunction;
		this.valueFromProgression = this.valueFromProgression.bind(this);
	}

	valueFromProgression(progress){

		return {
			r:this.start.r + progress*(this.end.r-this.start.r),
			g:this.start.g + progress*(this.end.g-this.start.g),
			b:this.start.b + progress*(this.end.b-this.start.b),
			a:this.start.a + progress*(this.end.a-this.start.a),
		}
	}
}


/**
 *

	let animation = new Animation(object,property,start,end,duration,delay,timingFunction)
	
	animation.start();

	animation.pause();
	animation.play();
	animation.resume();


	animation.stop();
 * 
 */