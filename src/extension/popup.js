const platforms = {
	netflix: document.querySelector('#netflix'),
	youtube: document.querySelector('#youtube'),
}
async function getPlatformCurrentVal(platform) {
	if (Array.isArray(platform)) {
		const data = await new Promise((resolve, reject) => {
			chrome.storage.sync.get(platform, res => {
				res ? resolve(res) : reject(false)
			})
		})
		return data
	} else {
		const data = await new Promise((resolve, reject) => {
			chrome.storage.sync.get([platform], res => {
				res ? resolve(res[platform]) : reject(false)
			})
		})
		return data
	}
}
async function setValues() {
	const data = await getPlatformCurrentVal(['netflix', 'youtube'])
	for (let property in data) {
		if (data[property]) {
			platforms[property].checked = true
		} else {
			platforms[property].checked = false
		}
	}
}
setValues()
platforms.youtube.onclick = async () => {
	const value = await getPlatformCurrentVal('youtube')
	chrome.storage.sync.set({ youtube: !value })
}
platforms.netflix.onclick = async () => {
	const value = await getPlatformCurrentVal('netflix')
	chrome.storage.sync.set({ netflix: !value })
}
