const zmq = require('zeromq')
let req = zmq.socket('req');
let url = process.argv[2]? process.argv[2] : process.exit(0)
req.connect(url) //'tcp://localhost:9998'
let nick = process.argv[3]? process.argv[3] : process.exit(0)
req.identity=nick+process.pid
let text = process.argv[4]? process.argv[4] : process.exit(0)
req.on('message', (msg)=> {
	console.log('resp: '+msg)
	//process.exit(0);
})
setInterval(() => {req.send(text)}, 3000)
