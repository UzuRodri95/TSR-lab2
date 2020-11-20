const zmq = require('zeromq')
let petAtenWork = 0
let req = zmq.socket('req')
let nick = process.argv[3]? process.argv[3] : process.exit(0)
req.identity=nick + " | " + process.pid
let url = process.argv[2]? process.argv[2] : process.exit(0)
req.connect(url) //'tcp://localhost:9999'
let text = process.argv[4]? process.argv[4] : process.exit(0)
req.on('message', (c,sep,msg)=> {
	setTimeout(()=> {
		petAtenWork++
		req.send([c,'',text])
	}, 1000)
})
req.send(['','',''])
setInterval(() => {console.log("Nº peticiones: " + petAtenWork)}, 5000)
