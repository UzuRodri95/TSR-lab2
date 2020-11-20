const zmq = require('zeromq')
let pub = zmq.socket('pub')
let pull= zmq.socket('pull')
let portPub = process.argv[2]? process.argv[2] : process.exit(0)
let portPull = process.argv[3]? process.argv[3] : process.exit(0)
pub.bind ('tcp://*:' + portPub)
pull.bind('tcp://*:' + portPull)

pull.on('message', (id,txt) => {

	switch (txt.toString()) {
	case 'HI': 
		console.log('[server]',id+' connected')
		pub.send(['server',id+' connected'])
		break
	case 'BYE': 
		console.log('[server]',id+' disconnected')
		pub.send(['server',id+' disconnected'])
		break
	default: 
		pub.send([id,txt])
	}
})

