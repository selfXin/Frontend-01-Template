const http = require('http');
const css = require('css');
var cssText = `.container {
			color:red;
		}
		span {
			display: inline-block;
		}
		#btn {
			background-color: red;
		}`
let result = css.parse(cssText);
let list = [];
list.push(...result.stylesheet.rules);
// console.log(JSON.stringify(list));
function computeCss(element){

}




const proxy = http.createServer((req, res) => {
	console.log('connected');

	res.setHeader('Content-Type', 'text/html');
	res.setHeader('X-Foo', 'bar');
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end(`<html lang="en">
<head>
	<meta charset="UTF-8"/>
	<title>Document</title>
	<style>
		.container {

		}
		span {
			display: inline-block;
		}
		#btn {
			background-color: red;
		}
	</style>
</head>
<body>
	<div class="container">
		<button id="btn">btn</button>
		<img src="abc"/>
		<span></span>	
	</div>
</body>
</html>`);
});

proxy.listen(8088, '127.0.0.1', () => {

	console.log('success===8088')
});

//style书写位置靠前