const zmq = require('zeromq')
const nick = process.argv[2]? process.argv[2] : process.exit(0)
let sub = zmq.socket('sub') 
let psh = zmq.socket('push')
let portSub = process.argv[3]? process.argv[3] : process.exit(0)
let portPsh = process.argv[4]? process.argv[4] : process.exit(0)
sub.connect('tcp://127.0.0.1:' + portSub)
psh.connect('tcp://127.0.0.1:' + portPsh)
sub.subscribe('')
sub.on('message', (nick,m) => {
	console.log('['+nick+']'+m)
})
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data'  ,(str)=> {
	psh.send([nick, str.slice(0,-1)])
})
process.stdin.on('end',()=> {
	psh.send([nick, 'BYE'])
	sub.close(); psh.close()
})
process.on('SIGINT',()=> {
	process.stdin.end()
})
psh.send([nick,'HI'])

