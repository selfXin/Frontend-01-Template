
export function enableGesture(Element) {
	let contexts = Object.create(null);

	let MOUSE_SYMBOL = Symbol('mouse');
	if(document.ontouchstart !== null){
		Element.addEventListener('mousedown', (event) => {
			contexts[MOUSE_SYMBOL] = Object.create(null);
			start(event, contexts[MOUSE_SYMBOL]);
			let mousemove = (event) => {
				move(event, contexts[MOUSE_SYMBOL]);
			}

			let mouseup = (event) => {
				end(event, contexts[MOUSE_SYMBOL]);
				document.removeEventListener('mousemove', mousemove)
				document.removeEventListener('mouseup', mouseup)
			}

			document.addEventListener('mousemove', mousemove);
			document.addEventListener('mouseup', mouseup);
		})
	}

	Element.addEventListener('touchstart', event => {
		for (let touch of event.changedTouches) {
			contexts[touch.identifier] = Object.create(null);
			start(touch,contexts[touch.identifier]);
		}
	})
	Element.addEventListener('touchmove', event => {
		for (let touch of event.changedTouches) {
			move(touch,contexts[touch.identifier]);
		}
	})
	Element.addEventListener('touchend', event => {
		for (let touch of event.changedTouches) {
			end(touch,contexts[touch.identifier]);
			delete contexts[touch.identifier];
		}
	})
	Element.addEventListener('touchcancle', event => {
		for (let touch of event.changedTouches) {
			cancle(touch,contexts[touch.identifier]);
			delete contexts[touch.identifier];
		}
	})

	let start = (point, context) => {
		context.startX = point.clientX, context.startY = point.clientY;

		let e = new CustomEvent('start', {});
		Object.assign(e,{
			startX:point.startX,
			startY:point.startY,
			clientX:point.clientX,
			clientY:point.clientY,
		})

		Element.dispatchEvent(e);
		context.isTap = true;
		context.isPan = false;
		context.isPress = false;
		context.moves = [];

		context.timeoutHandler = setTimeout(() => {
			if (context.isPan)
				return;
			context.isTap = false;
			context.isPan = false;
			context.isPress = true;

			Element.dispatchEvent(new CustomEvent('pressstart', {}));
		}, 500);
	}
	let move = (point, context) => {
		let dx = point.clientX - context.startX,
			dy = point.clientY - context.startY;
		if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
			if(context.isPress)
				Element.dispatchEvent(new CustomEvent('presscancle', {}));

			context.isTap = false;
			context.isPan = true;
			context.isPress = false;

			let e = new CustomEvent('panstart', {});
			Object.assign(e,{
				startX:context.startX,
				startY:context.startY,
				clientX:point.clientX,
				clientY:point.clientY,
			})

			Element.dispatchEvent(e);
		}

		if (context.isPan) {
			context.moves.push({
				dx,
				dy,
				t: Date.now()
			});
			context.moves = context.moves.filter(record => Date.now() - record.t < 300)
			let e = new CustomEvent('pan', {});

			Object.assign(e,{
				startX:context.startX,
				startY:context.startY,
				clientX:point.clientX,
				clientY:point.clientY,
			})
			Element.dispatchEvent(e);
		}
	}

	let end = (point, context) => {
		if (context.isPan) {
			let dx = point.clientX - context.startX,
				dy = point.clientY - context.startY;

			let record = context.moves[0];
			let speed = Math.sqrt((record.dx-dx)**2+(record.dy-dy)**2/(Date.now()-record.t))
			
			let isFlick = speed>2.5;
			if(speed>2.5){

				let e = new CustomEvent('flick', {});
				Object.assign(e,{
					startX:context.startX,
					startY:context.startY,
					clientX:point.clientX,
					clientY:point.clientY,
					speed:speed
				})

				Element.dispatchEvent(e);
			}

			let e = new CustomEvent('panend', {});
			Object.assign(e,{
				startX:context.startX,
				startY:context.startY,
				clientX:point.clientX,
				clientY:point.clientY,
				speed:speed,
				isFlick:isFlick
			})
			Element.dispatchEvent(e);
		}


		if (context.isTap) {
			Element.dispatchEvent(new CustomEvent('taped', {}));
		} 

		if (context.isPress) {
			Element.dispatchEvent(new CustomEvent('pressend', {}));
		}
		// 


		if(context.isTap){
			Element.dispatchEvent(new CustomEvent('tap', {}));
		}


		clearTimeout(context.timeoutHandler);
	}

	let cancle = () => {

		Element.dispatchEvent(new CustomEvent('cancled', {}));
		clearTimeout(context.timeoutHandler);
	}
}