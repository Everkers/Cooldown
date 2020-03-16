const platforms = {
	netflix: document.querySelector('#netflix'),
	youtube: document.querySelector('#youtube'),
}
chrome.runtime.onMessage.addListener((data, sender, sendRes) => {
	alert('new message')
})
async function getPlatformCurrentVal(platform) {
	//get platform current value
	if (Array.isArray(platform)) {
		//check if prop is an array
		const data = await new Promise((resolve, reject) => {
			chrome.storage.sync.get(platform, res => {
				// get data from chrome storage
				res ? resolve(res) : reject(false)
			})
		})
		return data
	} else {
		const data = await new Promise((resolve, reject) => {
			// get single platform prop
			chrome.storage.sync.get([platform], res => {
				res ? resolve(res[platform]) : reject(false)
			})
		})
		return data
	}
}
async function setValues() {
	//set current status to the check boxes
	const data = await getPlatformCurrentVal(['netflix', 'youtube']) //get current values
	for (let property in data) {
		if (data[property]) {
			platforms[property].checked = true
		} else {
			platforms[property].checked = false
		}
	}
}
setValues() //call function to set data
for (let property in platforms) {
	// get current platforms a
	platforms[property].onclick = async () => {
		//add click listener for each platform
		const val = await getPlatformCurrentVal(property) // get platform current value
		chrome.storage.sync.set({ [property]: !val }) // set the new value
	}
}
