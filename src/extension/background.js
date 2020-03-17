chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == 'install') {
		chrome.storage.sync.set({ netflix: true })
		chrome.storage.sync.set({ youtube: true })
	}
})
const values = new Promise((resolve, reject) => {
	chrome.storage.sync.get(['netflix', 'youtube'], res => {
		resolve(res)
	})
}).then(res => {
	function sendData(data) {
		const socket = new WebSocket('ws://127.0.0.1:8080')
		socket.onopen = () => {
			socket.send(JSON.stringify(data))
		}
	}
	chrome.runtime.onMessage.addListener((data, sender, sendRes) => {
		sendData(data)
	})
	chrome.tabs.onUpdated.addListener((int, obj, Tab) => {
		if (Tab.title == 'Netflix' && res.netflix) {
			const action = Tab.url.split('/')[3]
			if (action == 'browse') {
				sendData({ platform: 'Netflix', type: 'Browsing', title: 'Browsing' })
			}
		} else if (Tab.title.includes('YouTube') && res.youtube) {
			const action = Tab.url.split('/')[4]
			if (Tab.url.split('/')[3].includes('watch?')) {
				chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
					chrome.tabs.sendMessage(tabs[0].id, {
						action: 'watching',
						platform: 'youtube',
					})
				})
			}
			if (
				action == 'subscriptions' ||
				action == 'trending' ||
				action == 'library' ||
				action == 'history'
			) {
				sendData({ platform: 'Youtube', action: 'browse', data: action })
			} else {
				sendData({ platform: 'Youtube', action: null, data: null })
			}
		}
	})
	chrome.runtime.onMessage.addListener((data, sender, sendRes) => {
		sendData(data)
	})
})
