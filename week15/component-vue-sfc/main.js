

import {create,Text,Wrapper} from './reactCreateElement.js';
import {Carousel} from "./carousel.view";
console.log(Carousel)

let carousel = <Carousel></Carousel>


carousel.mountTo(document.body);
// // carosel.mountTo(document.body);

// import {
// 	create,
// 	Text,
// 	Wrapper
// } from './reactCreateElement.js';
// class Carousel {
// 	render() {
// 		return create("template", {
// 			"type": {
// 				"name": "type",
// 				"value": "startTag"
// 			},
// 			"tagName": {
// 				"name": "tagName",
// 				"value": "template"
// 			}
// 		}, "\n    ", create("div", {
// 			"type": {
// 				"name": "type",
// 				"value": "startTag"
// 			},
// 			"tagName": {
// 				"name": "tagName",
// 				"value": "div"
// 			}
// 		}, "\n        ", create("img", {
// 			"type": {
// 				"name": "type",
// 				"value": "startTag"
// 			},
// 			"tagName": {
// 				"name": "tagName",
// 				"value": "img"
// 			},
// 			"isSelfClosing": {
// 				"name": "isSelfClosing",
// 				"value": true
// 			}
// 		}, ), "\n    "), "\n")
// 	}
// }