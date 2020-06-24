const http = require('http');

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
		#container {
			width:500px;
			height:300px;
			display:flex;
			background-color:red;
		}
		#myid {
			width:200px;
			height: 100px;
			background-color:green
		}
		#container .c1 {
			flex:1;
			background-color:blue;
		}
		
	</style>
</head>
<body>
	<div id='container'>
		<div id='myid'></div>
		<div class='c1'></div>
	</div>
</body>
</html>`);
});

proxy.listen(8088, '127.0.0.1', () => {

	console.log('success===8088')
});

//style书写位置靠前