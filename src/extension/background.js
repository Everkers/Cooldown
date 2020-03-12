chrome.tabs.onUpdated.addListener((int, obj, Tab) => {
	if (Tab.title == 'Netflix') {
		const action = Tab.url.split('/')[3]
		if (action == 'browse') {
			sendData({ type: 'browsing', title: 'browsing' })
		}
	}
})
chrome.runtime.onMessage.addListener((data, sender, sendRes) => {
	sendData(data)
})
function sendData(data) {
	const socket = new WebSocket('ws://127.0.0.1:8080')
	socket.onopen = e => {
		socket.send(JSON.stringify(data))
	}
}
