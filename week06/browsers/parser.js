
const CssTool = require('./addCssRules.js');
const EOF = Symbol('EOF');
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let cssTool = new CssTool.CssTool();


let stack = [{type:'document',children:[]}]

function emit(token){
	let top = stack[stack.length-1];
	if(token.type == 'startTag'){
		let element = {
			type:"element",
			children:[],
			attributes:[]
		}

		element.tagName = token.tagName;
	for(let key in token){
		if(key!='type' && key!='tagName'){
			element.attributes.push({
				name:key,
				value:token[key]
			});
		}
	}




	top.children.push(element);
	element.parent = top;


	if(!token.isSelfClosing)
		stack.push(element);

	
	cssTool.computeCss(element,stack);
	currentTextNode = null;

	}else if(token.type == 'endTag'){
		if(top.tagName !=token.tagName){
			throw new Error("Tag start end doesn't match");
		}else{
			if(top.tagName === 'style'){
				cssTool.addCssRules(top.children[0].content);
			}
			stack.pop();
		}
		currentTextNode = null;
	}else if(token.type == 'text'){
		if(currentTextNode == null){
			currentTextNode = {
				type:'text',
				content:''
			}
			top.children.push(currentTextNode);
		}
		currentTextNode.content+=token.content;
	}
}
function data(c){
	if(c === '<'){
		return tagOpen;
	}else if(c === EOF){
		emit({
			type:"EOF"
		});
		return;
	}else {
		emit({
			type:"text",
			content:c
		})
		return data;
	}
}


function tagOpen(c){
	if(c==='/'){
		return endTagOpen;
	}/*else if(c==='!'){
		return markupDeclarationOpenState;
	}*/else if(c.match(/^[a-zA-Z]$/)){
		currentToken = {
			type:"startTag",
			tagName:''
		}
		return tagName(c);
	}else {
		return ;
	}
}

function markupDeclarationOpenState(){}

function endTagOpen(c){
	if(c.match(/^[a-zA-Z]$/)){
			currentToken = {
			type:'endTag',
			tagName:''
		}
		return tagName(c);
	}else if(c === '>'){
		// return data;
	}else{

	}
}

function tagName(c){
	if(c.match(/^[\t\n\f ]$/) ){
		return beforeAttributeName;
	}else if(c === '/'){
		return selfCloseingStartTag;
	}else if(c.match(/^[a-zA-Z]$/)){
		currentToken.tagName+=c;
		return tagName;
	}else if(c==='>'){
		emit(currentToken);
		return data;
	}else{
		return tagName;
	}
}



function beforeAttributeName(c){
	if(c.match(/^[\t\n\f ]$/) ){
		return beforeAttributeName;
	}else if(c === '/' || c ==='>' || c === EOF){
		return beforeAttributeName(c);
	}else if(c === '='){
		// return data;
	}else{
		currentAttribute = {
			name:'',
			value:''
		}
		return attributeName(c);
	}
}

function attributeName(c){
	if(c.match(/^[\t\n\f ]$/) || c==='/' || c==='>'||c===EOF ){
		return afterAttributeName(c);
	}else if(c === '='){
		return beforeAttributeValue;
	}else if(c === '\u0000'){
		return data;
	}else if(c==='\'' || c==="'" || c==='<'){

	}else{
		currentAttribute.name+=c;
		return attributeName;
	}
}

function beforeAttributeValue(c){
	if(c.match(/^[\t\n\f ]$/) ){
		return afterAttributeName(c);
	}else if(c === '"'){
		return AttributeValueDoubleQuoted;
	}else if(c === "'"){
		return AttributeValueSingleQuoted;
	}else if(c==='>'){
		// emit({

		// });
		// return data;
	}else{
		return AttributeValueUnquoted(c);
	}
}

function afterAttributeName(c){
	if(c.match(/^[\t\n\f ]$/) ){
		// return afterAttributeName(c);
	}else if(c==='/'){
		return selfCloseingStartTag(c);
	}else if(c==='='){
		return beforeAttributeValue;
	}else if(c==='>'){
		return data;
	}else if(c===EOF){
		return 
	}else{
		return attributeName(c);
	}
}


function AttributeValueUnquoted(c){
	if(c.match(/^[\t\n\f ]$/) ){
		currentToken[currentAttribute.name] = currentAttribute.value;
		return beforeAttributeName;
	}else if(c==='/'){
		currentToken[currentAttribute.name] = currentAttribute.value;
		return selfCloseingStartTag;
	}else if(c === '&'){
		return AttributeValueUnquoted;
	}else if(c === ">"){
		emit(currentToken)
		currentToken[currentAttribute.name] = currentAttribute.value;
		return data;
	}else if(c==='\U0000'){
		// emit({

		// });
		// return data;
	}else if(c==='"' || c==="'" || c==='<' || c==='=' || c==='`'){

	}else if(c===EOF){
		return;
	}else{
		currentAttribute.value+=c;
		return AttributeValueUnquoted;
	}
}



function AttributeValueDoubleQuoted(c){
	if(c==='"'){
		return AfterAttributeValueQuoted;
	}else if(c==='&'){
		return AttributeValueDoubleQuoted;
	}else if(c===null){
		// return attri
	}else if(c===EOF){
		return ;
	}else{
		currentAttribute.value+=c;
		return AttributeValueDoubleQuoted;
	}
}

function AttributeValueSingleQuoted(c){
	if(c==="'"){
		return AfterAttributeValueQuoted;
	}else if(c==='&'){
		return AttributeValueSingleQuoted;
	}else if(c===null){

	}else if(c===EOF){
		return ;
	}else{
		currentAttribute.value+=c;
		return AttributeValueSingleQuoted;
	}
}

function AfterAttributeValueQuoted(c){
	if(c.match(/^[\t\n\f ]$/) ){
		return beforeAttributeName;
	}else if(c==='/'){
		return selfCloseingStartTag;
	}else if(c==='>'){
		currentToken[currentAttribute.name] = currentAttribute.value;
		emit(currentToken);
		return data;
	}else if(c===EOF){
		emit({
			type:"EOF"
		});
	}else{
		currentAttribute.value+=c;
		return AttributeValueDoubleQuoted;
	}
}




function selfCloseingStartTag(c){
	if(c==='>'){
		currentToken.isSelfClosing = true;
		currentToken[currentAttribute.name] = currentAttribute.value;
		emit(currentToken);
		return data;
	}else if(c===EOF){

	}else{
		return beforeAttributeName(c);
	}
}

module.exports.parseHTML = function (html){
	let state = data;
	for(let c of html){
		state = state(c);
	}
	state = state(EOF);
	return stack[0];
}