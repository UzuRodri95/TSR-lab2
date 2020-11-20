const zmq = require('zeromq')
let petAten = 0
let cli=[], req=[], workers=[], cont=[]
let sc = zmq.socket('router') // frontend
let sw = zmq.socket('router') // backend
let portSC = process.argv[2]? process.argv[2] : process.exit(0)
let portSW = process.argv[3]? process.argv[3] : process.exit(0)
sc.bind('tcp://*:' + portSC)
sw.bind('tcp://*:' + portSW)
sc.on('message',(c,sep,m)=> {
	if (workers.length==0) { 
		cli.push(c); req.push(m)
	} else {
		sw.send([workers.shift(),'',c,'',m])
	}
	petAten++
})
sw.on('message',(w,sep,c,sep2,r)=> {
    	let esRegistro = false
    	if (c=='') {esRegistro = true; cont[w]=0} //workers.push(w);
	if (cli.length>0) { 
		sw.send([w,'',
			cli.shift(),'',req.shift()])
	} else {
		workers.push(w)
	}
	if(!esRegistro) {sc.send([c,'',r])}	
	cont[w]++
})
setInterval(() => {console.log("-------------------------------------------------------------\n")
		   console.log("Nº peticiones Broker: " + petAten + "\n")
		   for(i in cont) {console.log("Nº peticiones Worker " + i 
		   + ": " + cont[i] + "\n")}}, 5000)
