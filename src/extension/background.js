chrome.runtime.onMessage.addListener((data, sender, sendRes) => {
	const socket = new WebSocket('ws://127.0.0.1:8080')
	socket.onopen = e => {
		socket.send(JSON.stringify(data))
	}
})
