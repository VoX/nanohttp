var net = require('net');

var ok_content = new Buffer("<html><body><h1>HELLO WORLD</h1></body></html>");
var ok_header = new Buffer("HTTP/1.1 200 OK \r\nContent-Type: text/html; charset=UTF-8\r\nContent-Length: " + ok_content.length + "\r\n\r\n");
var not_found_header = new Buffer("HTTP/1.1 404 NOTFOUND \r\nContent-Type: text/html; charset=UTF-8\r\nContent-Length: 0\r\n\r\n");

var server = net.createServer(function(c) { //'connection' listener
	console.log('client connected');
	c.on('end', function() {
		console.log('client disconnected');
	});
	c.on('data', function(data) {

		var strData = data.toString();
		console.log(strData);

		var ishello = false;

		var tokenized = strData.split(" ");
		for(var i = 0; i < tokenized.length; i++){
			if(tokenized[i] === "GET"){
				if(tokenized[i+1] === "/hello"){
					ishello = true;
					break;
				}
			}
		}

		if(ishello){
			c.write(ok_header);
			c.end(ok_content);
		}
		else{
			c.end(not_found_header);
		}
	});
});
server.listen(8080, function() { //'listening' listener
	console.log('server bound');
});