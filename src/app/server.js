const client = require('discord-rich-presence')('687753371100512310')
const ws = require('ws')
client.on('connected', () => {
	console.log('connected')
})
const webSocketServer = new ws.Server({ port: 8080 })
webSocketServer.on('connection', w => {
	w.on('message', data => {
		const d = JSON.parse(data)
		console.log(d)
		if (d.platform == 'Netflix') {
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
		} else if (d.platform == 'Youtube') {
			if (!d.action) {
				client.updatePresence({
					details: `Idle`,
					state: `Idle`,
					largeImageKey: 'ytt',
					instance: true,
				})
			} else if (d.action == 'browse') {
				client.updatePresence({
					details: `Browsing`,
					state: d.data,
					largeImageKey: 'ytt',
					instance: true,
				})
			} else if (d.action == 'watching') {
				client.updatePresence({
					details: d.videoTitle,
					state: d.channel,
					largeImageKey: 'ytt',
					instance: true,
				})
			}
		}
	})
})
