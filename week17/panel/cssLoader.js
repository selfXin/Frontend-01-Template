let css = require('css');


module.exports = function(source,map){

	let styleSheet = css.parse(source);

	let st = styleSheet.stylesheet.rules;

	for(let rule of st){
		rule.selectors = rule.selectors.map(selector=>'.carousel '+selector)
	}

	console.log(css.stringify(styleSheet))
	return '';
}