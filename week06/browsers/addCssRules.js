const css = require('css');

let rules = [];
class CssTool {
	constructor() {

	}
	addCssRules(text) {
		let result = css.parse(text);
		rules.push(...result.stylesheet.rules);
	}
	match(element,selector){
		// console.log(elements,selectorPart)
		if(!selector || !element.attributes)
			return false;

		if(selector.charAt(0)==='#'){
			var attr = element.attributes.filter(attr=>attr.name == 'id')[0];
			if(attr && attr.value === selector.replace('#',''))
				return true;
		}else if(selector.charAt(0)==='.'){
			var attr = element.attributes.filter(attr=>attr.name == 'class')[0];
			if(attr && attr.value === selector.replace('.',''))
				return true;
		}else{
			if(element.tagName === selector){
				return true;
			}
		}
		return false;
	}
	specificity(selector){
		var p = [0,0,0,0];
		var selectorParts = selector.split(' ');
		for(var part of selectorParts){
			if(part.charAt(0) === '#'){
				p[1]+=1;
			}else if(part.charAt(0) === '.'){
				p[2]+=1;
			}else{
				p[3]+=1;
			}
		}
		return p;
	}
	compare(sp1,sp2){
		if(sp1[0]-sp2[0]){
			return sp1[0]-sp2[0];
		}
		if(sp1[1]-sp2[1]){
			return sp1[1]-sp2[1];
		}
		if(sp1[2]-sp2[2]){
			return sp1[2]-sp2[2];
		}

		return sp1[3]-sp2[3]
	}

	computeCss(element, stack) {
		let matched = false;
		var elements = stack.slice().reverse();
		if (!element.computedStyle)
			element.computedStyle = {};

		for (let rule of rules) {
			var selectorParts = rule.selectors[0].split(' ').reverse();

			if(!this.match(element,selectorParts[0]))
				continue;

			var j = 0;
			for(var i=0; i<elements.length;i++){
				if(this.match(elements[i],selectorParts[j])){
					j++;
				}
			}

			if(j>=selectorParts.length)
				matched = true;

			if(matched){
				var sp = this.specificity(rule.selectors[0]);
				var computedStyle = element.computedStyle;
				for(let declaration of rule.declarations){
					if(!computedStyle[declaration.property])
						computedStyle[declaration.property] = {};

					if(!computedStyle[declaration.property].specificity){
						computedStyle[declaration.property].value = declaration.value;
						computedStyle[declaration.property].specificity = sp;
					}else if(this.compare(computedStyle[declaration.property].specificity,sp)<0){
						computedStyle[declaration.property].value = declaration.value;
						computedStyle[declaration.property].specificity = sp;
					}
				}
			}
		}
	}
}

module.exports.CssTool = CssTool;