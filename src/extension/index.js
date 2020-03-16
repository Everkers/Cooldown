const platform = window.location.host
const values = new Promise((resolve, reject) => {
	chrome.storage.sync.get(['netflix', 'youtube'], res => {
		resolve(res)
	})
}).then(res => {
	chrome.runtime.onMessage.addListener((data, sender, sendRes) => {
		if (
			data.action == 'watching' &&
			data.platform == 'youtube' &&
			res.youtube
		) {
			const data = document.querySelector(
				'h1.ytd-video-primary-info-renderer yt-formatted-string'
			)
			const channelName = document.querySelector(
				'div#upload-info ytd-channel-name#channel-name div#text-container yt-formatted-string#text a'
			).textContent
			console.log(channelName)
			const currentTime = document.querySelector(
				'div.ytp-time-display span.ytp-time-current'
			).textContent
			const duration = document.querySelector(
				'div.ytp-time-display span.ytp-time-duration'
			).textContent

			chrome.runtime.sendMessage({
				//send data to background
				action: 'watching',
				platform: 'Youtube',
				videoTitle: data.textContent,
				duration,
				currentTime,
				channel: channelName,
			})
		}
	})
	if (platform.includes('netflix.com') && res.netflix) {
		const timer = setInterval(() => {
			const data = document.querySelector('.ellipsize-text')
			if (data) {
				//check if the users is watching
				if (data.getElementsByTagName('h4')[0] != undefined) {
					//the users is watching a show
					const showTitle = data.getElementsByTagName('h4')[0].textContent
					const [epAndSeason, epTitle] = data.getElementsByTagName('span')
					chrome.runtime.sendMessage({
						//send data to background
						platform: 'Netflix',
						type: 'Serie',
						title: showTitle,
						point: epAndSeason.textContent,
						epTitle: epTitle.textContent,
					})
				} else {
					// user is watching a movie
					const movieTitle = data.textContent
					chrome.runtime.sendMessage({
						//send data to background
						platform: 'Netflix',
						type: 'Movie',
						title: movieTitle,
					})
				}
			}
		}, 6000)
	}
})
