const zmq = require('zeromq')
let petAten = 0, workers = 0
let cli=[], req=[], cont=[]
let sc = zmq.socket('router') // frontend
let sb = zmq.socket('dealer') // backend
let portSC = process.argv[2]? process.argv[2] : process.exit(0)
let portSB = process.argv[3]? process.argv[3] : process.exit(0)
sc.bind('tcp://*:' + portSC)
sb.bind('tcp://*:' + portSB)
sc.on('message',(c,sep,m)=> {
	console.log("sc activado \n")
	if (workers==0) { 
		cli.push(c); req.push(m)
	} else {
		sb.send([c,'',m])
		workers--
	}
	petAten++
	cont[c]++
})
sb.on('message',(c,sep2,r)=> {
	console.log("sb activado \n")
    if (cli.length>0) {
	sw.send([
		cli.shift(),'',req.shift()])
    } else workers++
    if (c!='') sc.send([c,'',r])
})
setInterval(() => {console.log("-------------------------------------------------------------\n")
		   console.log("Nº peticiones Broker: " + petAten + "\n")
		   for(i in cont) {console.log("Nº peticiones Client " + i 
		   + ": " + cont[i] + "\n")}}, 5000)
