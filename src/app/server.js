const rpc = require('discord-rpc')
const ws = require('ws')
const client = new rpc.Client({ transport: 'ipc' })
const clientId = '687753371100512310'
client.on('ready', () => {
	console.log('ready')
})

const webSocketServer = new ws.Server({ port: 8080 })
webSocketServer.on('connection', w => {
	w.on('message', data => {
		const d = JSON.parse(data)
		console.log(d)
		if (d.platform == 'Netflix') {
			if (d.type == 'Serie') {
				client.setActivity({
					details: d.title,
					state: d.epTitle,
					largeImageKey: 'netflix',
					largeImageText: d.point,
					instance: true,
				})
			} else {
				client.setActivity({
					details: d.title,
					largeImageKey: 'netflix',
				})
			}
		} else if (d.platform == 'Youtube') {
			if (!d.action) {
				client.clearActivity()
			} else if (d.action == 'browse') {
				client.setActivity({
					details: `Browsing`,
					state: d.data,
					largeImageKey: 'ytt',
					instance: true,
				})
			} else if (d.action == 'watching') {
				client.setActivity({
					details: d.videoTitle,
					state: d.channel,
					largeImageKey: 'ytt',
					startTimestamp: Date.now(),
					instance: true,
				})
			}
		}
	})
})
client.login({ clientId })
