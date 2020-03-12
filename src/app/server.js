const ws = require('ws')
const webSocketServer = new ws.Server({ port: 8080 })
webSocketServer.on('connection', w => {
	w.on('message', data => {})
})
