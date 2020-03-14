const platforms = {
	netflix: document.querySelector('#netflix'),
	youtube: document.querySelector('#youtube'),
}
async function setValues() {
	const { netflix: netflixCurrentVal } = await new Promise(
		(resolve, reject) => {
			chrome.storage.sync.get(['netflix'], res => {
				resolve(res)
			})
		}
	)
	const { youtube: youtubeCurrentVal } = await new Promise(
		(resolve, reject) => {
			chrome.storage.sync.get(['youtube'], res => {
				resolve(res)
			})
		}
	)
	if (youtubeCurrentVal) {
		document.querySelector('#youtube').checked = true
	} else {
		document.querySelector('#youtube').checked = false
	}
	if (netflixCurrentVal) {
		document.querySelector('#netflix').checked = true
	} else {
		document.querySelector('#netflix').checked = false
	}
}
setValues()
platforms.youtube.onclick = async () => {
	const { youtube: youtubeCurrentVal } = await new Promise(
		(resolve, reject) => {
			chrome.storage.sync.get(['youtube'], res => {
				resolve(res)
			})
		}
	)
	chrome.storage.sync.set({ youtube: !youtubeCurrentVal })
}
platforms.netflix.onclick = async () => {
	const { netflix: netflixCurrentVal } = await new Promise(
		(resolve, reject) => {
			chrome.storage.sync.get(['netflix'], res => {
				resolve(res)
			})
		}
	)
	chrome.storage.sync.set({ netflix: !netflixCurrentVal })
}
