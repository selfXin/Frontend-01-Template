const http = require('http');
const proxy = http.createServer((req, res) => {
	console.log('connected');

	res.setHeader('Content-Type', 'text/html');
	res.setHeader('X-Foo', 'bar');
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end('ok');
});


proxy.listen(8088, '127.0.0.1', () => {

	console.log('success===8088')
})