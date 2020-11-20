const zmq = require('zeromq')
let petAten = 0, clientes = 0
let workers=[], cont=[]
let sw = zmq.socket('router') // frontend
let sb = zmq.socket('dealer') // backend
let portSW = process.argv[2]? process.argv[2] : process.exit(0)
let portSB = process.argv[3]? process.argv[3] : process.exit(0)
sw.bind('tcp://*:' + portSW)
sb.connect('tcp://localhost:' + portSB)
sb.on('message',(c,sep,m)=> {
	console.log("sb activado \n")
	petAten++
	sw.send([workers.shift(),'',c,'',m])
})
sw.on('message',(w,sep,c,sep2,r)=> {
	console.log("sw activado \n")
    if (c=='') {
	cont[w]=0;
	} else    cont[w]++		//recibido del worker al cliente

    if (clientes>0) {  			    //registro por parte de worker
	sw.send([w,'',
		cli.shift(),'',req.shift()]) //Si hay algun cliente mas en espera segun llega el
    } 				     //worker lo usa para otra petición
    else	workers.push(w)
    sb.send([c,'',r])			     //Se haya usado o no el worker envia el resultado
 })
setInterval(() => {console.log("-------------------------------------------------------------\n")
		   console.log("Nº peticiones Broker: " + petAten + "\n")
		   for(i in cont) {console.log("Nº peticiones Worker " + i 
		   + ": " + cont[i] + "\n")}}, 5000)
