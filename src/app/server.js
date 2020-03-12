const client = require('discord-rich-presence')('687753371100512310')
const ws = require('ws')
client.on('connected', () => {
	console.log('connected')
})
const webSocketServer = new ws.Server({ port: 8080 })
webSocketServer.on('connection', w => {
	w.on('message', data => {
		const d = JSON.parse(data)
		if (d.type == 'Serie') {
			client.updatePresence({
				details: d.title,
				state: d.epTitle,
				largeImageKey: 'netflix',
				largeImageText: d.point,
				instance: true,
			})
		} else {
			client.updatePresence({
				details: d.title,
				largeImageKey: 'netflix',
			})
		}
	})
})
