// const images = require('images');

const path = require('path');
function render(viewport,element){
	if(element.type){
		if(element.style){
			if(element.style.width && element.style.height){
				let left = element.style.left || 0;
				let top = 0;
				let width = element.style.width + left;
				let height = element.style.height + top;
				if(element.style['background-color']){
					viewport.fill(element.style['background-color'])
					    .drawRectangle(left,top,width,height)
				}
			}
		}
	}
	if(element.children){
		for(var child of element.children){
			render(viewport,child);
		}
	}
}

module.exports = render;
